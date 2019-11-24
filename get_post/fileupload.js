var http = require('http');
var formidable = require('formidable');


function isFormData(req) {
    var type  = req.headers['content-type'] ||  '';
    return 0 === type.indexOf('multipart/form-data');

}

function upload(req, res) {
    if(!isFormData(req)){
        res.statusCode = 400;
        res.end("BAD REQUEST FILE");
        return;
    }

    var form = new formidable.IncomingForm();
    form.on('field', function (field, value) {
        console.log(field);
        console.log(value);
    });

    form.on('file', function (name, file) {
        console.log(name);
        console.log(file);
    });

    form.on('end', function () {
        res.end('upload complete');

    });
    // formidable 이 파싱을 위해 req.on('data') 에 접근하게 해줌
    form.parse(req);

}

var server = http.createServer(function(req,res) {
    switch (req.method) {
        case 'GET':
            show(req,res);
            break;
        case 'POST':
            upload(req,res);
            break;
    }
});

function show(req,res) {
    var html = ' '
        + '<form method="post" action="/" enctype="multipart/form-data">'
        + '<p><input type="text" name="name"/></p>'
        + '<p><input type="file" name="file"/></p>'
        + '<p><input type="submit" value="upload"/></p>'
        + '</form>';
    res.setHeader('Content-Type','text/html');
    //res.setHeader('Content-Length',Buffer.byteLength(html));
    res.end(html);
}



server.listen(3000);
