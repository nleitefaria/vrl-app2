import { list, put } from '@vercel/blob';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  const imageId = req.query.imageId;

  if (typeof imageId !== 'string' || !/^[a-zA-Z0-9-]+$/.test(imageId)) {
    return res.status(400).json({ error: 'Invalid or missing imageId parameter' });
  }

  try {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return res.status(503).json({
        error: 'Image cache is not configured'
      });
    }

    const pathname = `artworks/${imageId}.jpg`;
    const cached = await list({ prefix: pathname, limit: 1 });

    if (cached.blobs[0]?.url) {
      return res.redirect(307, cached.blobs[0].url);
    }

    const imageUrl =
      `https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg`;
    const response = await fetch(imageUrl, {
      headers: {
        Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        Origin: 'https://www.artic.edu',
        Referer: 'https://www.artic.edu/',
        'Sec-Fetch-Dest': 'image',
        'Sec-Fetch-Mode': 'no-cors',
        'Sec-Fetch-Site': 'same-origin',
        'User-Agent':
          'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36'
      }
    });

    if (!response.ok) {
      return res.status(response.status).json({
        error: 'Unable to retrieve image',
        upstreamStatus: response.status
      });
    }

    const blob = await put(pathname, response.body, {
      access: 'public',
      addRandomSuffix: false,
      cacheControlMaxAge: 31536000,
      contentType: response.headers.get('content-type') ?? 'image/jpeg'
    });

    return res.redirect(307, blob.url);
  } catch (error) {
    console.error('Error fetching Art Institute image:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
