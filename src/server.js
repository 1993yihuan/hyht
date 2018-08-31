//加载http模块
const http = require('http');
const opn = require('opn');
//加载文件模块
const fs = require('fs');
//加载url模块
// const urlM = require('url');
exports = module.exports = port => {
    const server = http.createServer(function(req, res) {
        //请求表头
        res.writeHead('200', { 'Content-Type': 'text/html;charset=utf-8' });
        // const pathname = urlM.parse(req.url).pathname;
        //先读取文件
        fs.readFile('./index.html', function(err, data) {
            if (err) {
                res.write('Not found index.html file in the current startup directory');
                res.end();
            } else {
                res.write(data.toString());
                res.end();
            }
        });
    });
    //监听这个端口
    server.listen(port, function() {
        const url = `http://127.0.0.1:${port}`;
        console.log(`Http service already running in: ${url}`);
        opn(url);
    });
};
