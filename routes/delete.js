const Router = require('express').Router;
const checkShortUrl = require('../middleware/checkShortUrl');
const { urlsMap } = require('../utils/containers');

const deleteRouter = Router();

deleteRouter.delete('/:shortUrl', checkShortUrl, (req, res) => {
  const { shortUrl } = req.params;

  urlsMap.delete(shortUrl);

  res.status(200).json({ message: 'URL deleted' });
});

module.exports = deleteRouter;
