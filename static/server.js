const http = require('http')
const https = require('https')
const { promises } = require('fs')
const path = require('path')
const url = require('url');

const PORT = 9000 || process.env.PORT

const contentTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.ico': 'image/x-icon'
};

/**
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 */
function staticFileHandler(req, res) {
  const fileName = req.url === '/' ? path.join(__dirname, './index.html') : path.join(__dirname, req.url)

  const fileExtension = path.extname(fileName);

  if (fileExtension) {
    promises.readFile(fileName)
      .then(fileContent => {
        res.writeHead(200, { 'Content-Type': contentTypes[fileExtension] });
        res.end(fileContent)
      })
      .catch(e => {
        console.log(e)
        if (e.code === 'ENOENT') {
          res.writeHead(404);
        } else {
          res.writeHead(500);
        }
        res.write(JSON.stringify(e));
        res.end()
      })
  }
}

/**
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 */
function youtubeSearchRouteHandler(req, res) {
  if (req.url.includes('youtube-search')) {
    const { query: { search } = {} } = url.parse(req.url,true);

    const { searchTerm, videoDuration  } = JSON.parse(search)
    const youtubeAPIUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&&type=video&videoDuration=${videoDuration}&q=${searchTerm}&key=${process.env.YOUTUBE_API_KEY}`

    https.get(youtubeAPIUrl, resApi => {
      let body = '';
      resApi.on('data', function (chunk) {
        body += chunk;
      });
      resApi.on('end', function () {
        console.log(body)
        res.end(body)
      });
    })
  }
}

(function (requests) {

  http.createServer((req, res) => {

    requests.forEach(handler => {
      handler(req, res)
    })

  }).listen(PORT, () => console.log(`App running at port http://localhost:${PORT}`))
})([
  staticFileHandler,
  youtubeSearchRouteHandler
])

