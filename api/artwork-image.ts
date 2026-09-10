export const config = {
  runtime: 'edge'
};

export default async function handler(request: Request): Promise<Response> {
  const imageId = new URL(request.url).searchParams.get('imageId');

  if (!imageId || !/^[a-zA-Z0-9-]+$/.test(imageId)) {
    return Response.json(
      { error: 'Invalid or missing imageId parameter' },
      { status: 400 }
    );
  }

  const imageUrl = `https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg`;

  try {
    const response = await fetch(imageUrl, {
      headers: {
        Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        Referer: 'https://www.artic.edu/',
        'User-Agent': 'Mozilla/5.0'
      }
    });

    if (!response.ok) {
      return Response.json(
        {
          error: 'Unable to retrieve image',
          upstreamStatus: response.status
        },
        { status: response.status }
      );
    }

    return new Response(response.body, {
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
        'Content-Type': response.headers.get('content-type') ?? 'image/jpeg'
      }
    });
  } catch (error) {
    console.error('Error fetching Art Institute image:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
