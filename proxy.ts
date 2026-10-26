const allowedResources = new Set(['artworks', 'products', 'sites', 'tours']);

export default async function proxy(request: Request) {
  if (request.method !== 'GET') {
    return new Response('Method not allowed', {
      status: 405,
      headers: { Allow: 'GET' }
    });
  }

  const pathname = new URL(request.url).pathname;
  const resourcePath = pathname.slice('/api/artic/'.length);
  const [resource, id, extra] = resourcePath.split('/');
  if (
    !allowedResources.has(resource) ||
    (id !== undefined && !/^\d+$/.test(id)) ||
    extra !== undefined
  ) {
    return new Response('Invalid Art Institute API request', { status: 400 });
  }

  const upstream = new URL(
    `https://api.artic.edu/api/v1/${resource}${id ? `/${id}` : ''}`
  );
  upstream.search = new URL(request.url).search;

  try {
    const response = await fetch(upstream, {
      headers: { Accept: 'application/json' }
    });
    return new Response(response.body, {
      status: response.status,
      headers: {
        'Content-Type':
          response.headers.get('content-type') ?? 'application/json'
      }
    });
  } catch (error) {
    console.error('Error fetching Art Institute API:', error);
    return new Response('Unable to reach Art Institute API', { status: 502 });
  }
}
