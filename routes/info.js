const Router = require('express').Router;
const checkShortUrl = require('../middleware/checkShortUrl');

const infoRouter = Router();

infoRouter.get('/:shortUrl', checkShortUrl, (req, res) => {
  const { urlObj } = req;

  res.status(200).json({ ...urlObj });
});

module.exports = infoRouter;
