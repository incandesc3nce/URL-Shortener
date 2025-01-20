const Router = require('express').Router;
const generateURL = require('../utils/generateURL');
const { LOCAL_URL } = require('../utils/env');
const { urlsMap } = require('../utils/containers');

const shortenRouter = Router();

shortenRouter.post('/', (req, res) => {
  const { originalUrl, alias, expiresAt } = req.body;
  if (!originalUrl) {
    return res.status(400).json({ message: 'URL is required', success: false });
  }

  // check if alias is valid
  if (alias) {
    if (urlsMap.has(alias)) {
      return res.status(409).json({ message: 'Alias already in use', success: false });
    }

    if (alias.length > 20) {
      return res.status(400).json({ message: 'Alias must not be longer than 20 characters', success: false });
    }

    if (!/^[a-zA-Z0-9]*$/.test(alias)) {
      return res.status(400).json({ message: 'Alias can only contain alphanumeric characters', success: false });
    }
  }

  const hash = alias || generateURL();
  const shoretenedUrl = `${LOCAL_URL}/${hash}`;

  urlsMap.set(hash, {
    originalUrl,
    createdAt: new Date(),
    expiresAt: expiresAt ? new Date(expiresAt) : null,
    clickCount: 0,
  });

  // Further processing with the URL
  res.status(201).json({ shortenedUrl: shoretenedUrl });
});

module.exports = shortenRouter;
