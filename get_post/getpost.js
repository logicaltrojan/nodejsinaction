
var http = require('http');
var items = [];
var request = require('request');
var qs = require('querystring');


function notFound(res) {

    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end("NOT FOUND RESOURCE");
}

function badRequest(res) {

    res.statusCode = 400;
    res.setHeader('Content-Type', 'text/plain');
    res.end("BAD REQUEST");

}

function add(req, res) {

    var body = '';
    req.setEncoding('utf8') ;
    req.on('data', function (chunk) {
        body += chunk;

    });
    req.on('end', function () {
        var obj = qs.parse(body);
        if(obj.item && obj.item !== ""){
            items.push(obj.item);
        }
        if(obj.id && obj.id !== ""){
           items.splice(obj.id, 1);
        }
        show(res);

    })
}

var server = http.createServer(function (req, res) {
    if(req.url === '/'){
        if(req.method === 'GET'){
            show(res);
        }else if(req.method === 'POST'){
            add(req,res);
        }
        else{
            badRequest(res);
        }
    }else{
        notFound(res);
    }





});

server.listen(3000);


function show(res) {
    var html = '<h1>Todo List</h1>'
        + '<ul>'
        + items.map(function(item) {
            return '<li>' + item + '</li>'
        }).join(' ')
        + '</ul>'
        + '<form method="post" action="/">'
        + '<p><input type="text" name="item"/></p>'
        + '<p><input type="submit" value="Add Item"/></p>'
        + '</form>'
        + '<form method="post" action="/">'
        + '<p><input type="text" name="id"/></p>'
        + '<p><input type="submit" value="Delete Item"/></p>'
        + '</form>';
    res.setHeader('Content-Type','text/html');
    res.setHeader('Content-Length',Buffer.byteLength(html));
    res.end(html);
}
