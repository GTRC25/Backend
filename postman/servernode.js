const http = require('http')
const hostname = '127.0.0.1'  ///local host so that i can run web server on my own machine
const port = 3000

const server = http.createServer((req, res) => {
if(req.url === '/'){
res.statusCode = 200
res.setHeader('Content-Type', 'text/plain')
res.end('hello rajan coder')
} else if (req.url === '/ferrariserver') {
res.statusCode = 200
res.setHeader('Content-Type', 'text/plain')
res.end('hello ferrari coder')    
} else{
res.statusCode = 404
res.setHeader('Content-Type', 'text/plain')
res.end('404 not found noob')
}
})

server.listen(port, hostname, () => {
    console.log(`server is listening to http://${hostname}: ${port}`);
})