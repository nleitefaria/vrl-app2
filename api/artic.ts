import type { VercelRequest, VercelResponse } from '@vercel/node';

const resources = new Set(['artworks', 'products', 'sites', 'tours']);

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { resource, id, page, limit, fields } = req.query;
  if (
    typeof resource !== 'string' ||
    !resources.has(resource) ||
    (id !== undefined && (typeof id !== 'string' || !/^\d+$/.test(id))) ||
    (page !== undefined && (typeof page !== 'string' || !/^[1-9]\d*$/.test(page))) ||
    (limit !== undefined && (typeof limit !== 'string' || !/^[1-9]\d*$/.test(limit))) ||
    (fields !== undefined &&
      (resource !== 'artworks' || fields !== 'image_id,thumbnail'))
  ) {
    return res.status(400).json({ error: 'Invalid Art Institute API request' });
  }

  const endpoint = new URL(
    `https://api.artic.edu/api/v1/${resource}${id ? `/${id}` : ''}`
  );
  if (typeof page === 'string') endpoint.searchParams.set('page', page);
  if (typeof limit === 'string') endpoint.searchParams.set('limit', limit);
  if (typeof fields === 'string') endpoint.searchParams.set('fields', fields);

  try {
    const response = await fetch(endpoint);
    const body = await response.text();
    res.setHeader(
      'Content-Type',
      response.headers.get('content-type') ?? 'application/json'
    );
    return res.status(response.status).send(body);
  } catch (error) {
    console.error('Error fetching Art Institute API:', error);
    return res.status(502).json({ error: 'Unable to reach Art Institute API' });
  }
}
