/**
 * Mocked container for storing shortened urls.
 * @type {Map}
 */
const urlsMap = new Map();

/**
 * Container for url visits.
 * @type {Map}
 */
const visitsMap = new Map();

module.exports = {
  urlsMap,
  visitsMap,
};
