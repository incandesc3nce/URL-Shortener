const { urlsMap } = require('../utils/containers');

const checkShortUrl = (req, res, next) => {
  const { shortUrl } = req.params;
  if (!shortUrl) {
    return res.status(400).json({ message: 'URL is required', success: false });
  }

  const urlObj = urlsMap.get(shortUrl);
  if (!urlObj) {
    return res.status(404).json({ message: 'URL not found', success: false });
  }

  req.urlObj = urlObj;
  req.shortUrl = shortUrl;
  next();
};

module.exports = checkShortUrl;
