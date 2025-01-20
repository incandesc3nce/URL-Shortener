const Router = require('express').Router;
const checkShortUrl = require('../middleware/checkShortUrl');
const { urlsMap, visitsMap } = require('../utils/containers');

const analyticsRouter = Router();

analyticsRouter.get('/:shortUrl', checkShortUrl, (req, res) => {
  const { shortUrl } = req.params;

  const visits = urlsMap.get(shortUrl).clickCount;
  const visitsIP = visitsMap.get(shortUrl);
  let lastFiveVisitsIP;
  if (!visitsIP) {
    lastFiveVisitsIP = [];
  } else {
    lastFiveVisitsIP = visitsIP.slice(-5);
  }

  res.status(200).json({ visits, lastFiveVisitsIP });
});

module.exports = analyticsRouter;
