import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  const imageId = req.query.imageId;

  if (typeof imageId !== 'string' || !/^[a-zA-Z0-9-]+$/.test(imageId)) {
    return res.status(400).json({
      error: 'Invalid or missing imageId parameter'
    });
  }

  const imageUrl =
    `https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg`;

  const response = await fetch(imageUrl, {
    headers: {
      Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
      'User-Agent': 'Mozilla/5.0'
    }
  });

  if (!response.ok) {
    return res.status(response.status).json({
      error: 'Unable to retrieve image',
      upstreamStatus: response.status
    });
  }

  res.setHeader('Content-Type', response.headers.get('content-type') ?? 'image/jpeg');
  res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400');
  return res.status(200).send(Buffer.from(await response.arrayBuffer()));
}
