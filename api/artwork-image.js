const https = require('https');

function proxyImage(imageUrl, res) {
  https
    .get(
      imageUrl,
      {
        headers: {
          Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'User-Agent': 'Mozilla/5.0'
        }
      },
      (upstream) => {
        if (upstream.statusCode < 200 || upstream.statusCode >= 300) {
          upstream.resume();
          res.status(upstream.statusCode || 502).json({
            error: 'Unable to retrieve image',
            upstreamStatus: upstream.statusCode || 502
          });
          return;
        }

        res.setHeader('Content-Type', upstream.headers['content-type'] || 'image/jpeg');
        res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400');
        upstream.pipe(res);
      }
    )
    .on('error', (error) => {
      console.error('Error fetching Art Institute image:', error);
      if (!res.headersSent) {
        res.status(500).json({ error: 'Internal server error' });
      }
    });
}

module.exports = (req, res) => {
  const imageId = req.query && req.query.imageId;

  if (typeof imageId !== 'string' || !/^[a-zA-Z0-9-]+$/.test(imageId)) {
    return res.status(400).json({
      error: 'Invalid or missing imageId parameter'
    });
  }

  const imageUrl = `https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg`;
  proxyImage(imageUrl, res);
};
