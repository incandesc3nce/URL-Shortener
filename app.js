const path = require('path');
const { HOST, PORT, LOCAL_URL } = require('./utils/env');

// routers import
const shortenRouter = require('./routes/shorten');
const redirectRouter = require('./routes/redirect');
const deleteRouter = require('./routes/delete');
const infoRouter = require('./routes/info');
const analyticsRouter = require('./routes/analytics');

const express = require('express');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/analytics', analyticsRouter);
app.use('/delete', deleteRouter);
app.use('/info', infoRouter);
app.use('/', redirectRouter);
app.use('/shorten', shortenRouter);

// start server
app.listen(PORT, HOST, () => {
  console.log(`Server is running on ${LOCAL_URL}`);
});

module.exports = app;
