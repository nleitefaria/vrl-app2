export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const imageId = url.searchParams.get('imageId');

  if (!imageId || !/^[a-zA-Z0-9-]+$/.test(imageId)) {
    return Response.json(
      {
        error: 'Invalid or missing imageId parameter'
      },
      {
        status: 400
      }
    );
  }

  const imageUrl = `https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg`;

  try {
    const response = await fetch(imageUrl, {
      headers: {
        Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'User-Agent': 'Mozilla/5.0'
      }
    });

    if (!response.ok) {
      return Response.json(
        {
          error: 'Unable to retrieve image',
          upstreamStatus: response.status
        },
        {
          status: response.status
        }
      );
    }

    return new Response(response.body, {
      status: 200,
      headers: {
        'Content-Type': response.headers.get('content-type') ?? 'image/jpeg',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400'
      }
    });
  } catch (error) {
    console.error('Error fetching Art Institute image:', error);

    return Response.json(
      {
        error: 'Internal server error'
      },
      {
        status: 500
      }
    );
  }
}
