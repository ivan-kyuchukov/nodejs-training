function getBaseUrl() {
  return `http://${process.env.URL}:${process.env.PORT}/api/`; 
}

module.exports = getBaseUrl;