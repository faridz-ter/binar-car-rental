const http = require("http");
const { PORT = 8000 } = process.env;

const fs = require("fs");
const path = require("path");
const url = require('url');
const PUBLIC_DIRECTORY = path.join(__dirname, "../public");

function getContent(pathURL) {
    const htmlFilePath = path.join(PUBLIC_DIRECTORY, pathURL);
    return fs.readFileSync(htmlFilePath);
};

function getJSON(data) {
    const toJSON = JSON.stringify(data);
    return toJSON;
};

function router() {
    const routes = {
        get: () => { },
        post: () => { },
    };
    const get = (path, cb) => {
        routes.get[path] = cb;
    };
    const post = (path, cb) => {
        routes.post[path] = cb;
    };
    return {
        get,
        post,
        routes,
    };
}

const appRouter = router();

appRouter.get('/', (req, res) => {
    const pageContent = getContent('index.html');
    res.setHeader('Content-Type', 'text/html');
    res.writeHead(200);
    res.end(pageContent);
});
appRouter.  get('/cars', (req, res) => {
    const pageContent = getContent('cars.html');
    res.setHeader('Content-Type', 'text/html');
    res.writeHead(200);
    res.end(pageContent);
});


const server = () => {
    return (req, res) => {
        const parsedUrl = url.parse(req.url, true);
        const { pathname } = parsedUrl;
        const pathURL = req.url;
        const isCss = pathURL.includes('/css');
        const isJs = pathURL.includes('/scripts');
        const isImages = pathURL.includes('/images');
        
        if (isCss || isJs || isImages) {
            const contentType = isCss ? 'text/css' : isJs ? 'application/javascript' : 'image';
            res.setHeader('Content-Type', contentType);
            res.writeHead(200);
            res.end(getContent(pathURL));
        } else if (req.method === 'GET' && appRouter.routes.get[pathname]) {
            appRouter.routes.get[pathname](req, res);
        } else if (req.method === 'POST' &&
            appRouter.routes.post[pathname]) {
            appRouter.routes.post[pathname](req, res);
        } else {
            res.writeHead(404);
            res.end(getContent('404.html'));
        }
    };
};


http.createServer(server()).listen(PORT, "localhost", () => {
    console.log("Server sudah berjalan, silahkan buka http://localhost:%d", PORT);
});

