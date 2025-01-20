const Router = require('express').Router;
const checkShortUrl = require('../middleware/checkShortUrl');
const { visitsMap } = require('../utils/containers');

const redirectRouter = Router();

redirectRouter.get('/:shortUrl', checkShortUrl, (req, res) => {
  const { urlObj, shortUrl } = req;

  if (urlObj.expiresAt && urlObj.expiresAt < new Date()) {
    return res.status(410).json({ message: 'URL expired', success: false });
  }

  urlObj.clickCount++;
  if (visitsMap.get(shortUrl)) {
    visitsMap.get(shortUrl).push(req.ip);
  } else {
    visitsMap.set(shortUrl, [req.ip]);
  }

  res.redirect(urlObj.originalUrl);
});

module.exports = redirectRouter;
