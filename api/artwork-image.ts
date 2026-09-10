export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);

  const imageId = url.searchParams.get('imageId');

  if (!imageId) {
    return new Response(
      JSON.stringify({
        error: 'Missing imageId parameter'
      }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }

  // Basic validation - image IDs from the Art Institute are UUID-like.
  if (!/^[a-zA-Z0-9-]+$/.test(imageId)) {
    return new Response(
      JSON.stringify({
        error: 'Invalid imageId'
      }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }

  const imageUrl =
    `https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg`;

  try {
    const response = await fetch(imageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
      }
    });

    if (!response.ok) {
      console.error(
        `Art Institute returned ${response.status} for ${imageUrl}`
      );

      return new Response(
        JSON.stringify({
          error: 'Unable to retrieve image',
          upstreamStatus: response.status
        }),
        {
          status: response.status,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }

    const contentType =
      response.headers.get('content-type') ?? 'image/jpeg';

    return new Response(response.body, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400, s-maxage=86400'
      }
    });

  } catch (error) {
    console.error('Error fetching Art Institute image:', error);

    return new Response(
      JSON.stringify({
        error: 'Internal server error'
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
}
