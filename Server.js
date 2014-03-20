//module
var net = require('net');
var fs = require('fs');
var path = require('path');
var urlmodule = require('url');
var querystring = require('querystring');
//Globe variables
var host = '127.0.0.1';
var port = 8888;

//Content type judge
types = {

    "3gp": "video/3gpp",
    "a": "application/octet-stream",
    "ai": "application/postscript",
    "aif": "audio/x-aiff",
    "aiff": "audio/x-aiff",
    "asc": "application/pgp-signature",
    "asf": "video/x-ms-asf",
    "asm": "text/x-asm",
    "asx": "video/x-ms-asf",
    "atom": "application/atom+xml",
    "au": "audio/basic",
    "avi": "video/x-msvideo",
    "bat": "application/x-msdownload",
    "bin": "application/octet-stream",
    "bmp": "image/bmp",
    "bz2": "application/x-bzip2",
    "c": "text/x-c",
    "cab": "application/vnd.ms-cab-compressed",
    "cc": "text/x-c",
    "chm": "application/vnd.ms-htmlhelp",
    "class": "application/octet-stream",
    "com": "application/x-msdownload",
    "conf": "text/plain",
    "cpp": "text/x-c",
    "crt": "application/x-x509-ca-cert",
    "css": "text/css",
    "csv": "text/csv",
    "cxx": "text/x-c",
    "deb": "application/x-debian-package",
    "der": "application/x-x509-ca-cert",
    "diff": "text/x-diff",
    "djv": "image/vnd.djvu",
    "djvu": "image/vnd.djvu",
    "dll": "application/x-msdownload",
    "dmg": "application/octet-stream",
    "doc": "application/msword",
    "dot": "application/msword",
    "dtd": "application/xml-dtd",
    "dvi": "application/x-dvi",
    "ear": "application/java-archive",
    "eml": "message/rfc822",
    "eps": "application/postscript",
    "exe": "application/x-msdownload",
    "f": "text/x-fortran",
    "f77": "text/x-fortran",
    "f90": "text/x-fortran",
    "flv": "video/x-flv",
    "for": "text/x-fortran",
    "gem": "application/octet-stream",
    "gemspec": "text/x-script.ruby",
    "gif": "image/gif",
    "gz": "application/x-gzip",
    "h": "text/x-c",
    "hh": "text/x-c",
    "htm": "text/html",
    "html": "text/html",
    "ico": "image/vnd.microsoft.icon",
    "ics": "text/calendar",
    "ifb": "text/calendar",
    "iso": "application/octet-stream",
    "jar": "application/java-archive",
    "java": "text/x-java-source",
    "jnlp": "application/x-java-jnlp-file",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "js": "application/javascript",
    "json": "application/json",
    "log": "text/plain",
    "m3u": "audio/x-mpegurl",
    "m4v": "video/mp4",
    "man": "text/troff",
    "mathml": "application/mathml+xml",
    "mbox": "application/mbox",
    "mdoc": "text/troff",
    "me": "text/troff",
    "mid": "audio/midi",
    "midi": "audio/midi",
    "mime": "message/rfc822",
    "mml": "application/mathml+xml",
    "mng": "video/x-mng",
    "mov": "video/quicktime",
    "mp3": "audio/mpeg",
    "mp4": "video/mp4",
    "mp4v": "video/mp4",
    "mpeg": "video/mpeg",
    "mpg": "video/mpeg",
    "ms": "text/troff",
    "msi": "application/x-msdownload",
    "odp": "application/vnd.oasis.opendocument.presentation",
    "ods": "application/vnd.oasis.opendocument.spreadsheet",
    "odt": "application/vnd.oasis.opendocument.text",
    "ogg": "application/ogg",
    "p": "text/x-pascal",
    "pas": "text/x-pascal",
    "pbm": "image/x-portable-bitmap",
    "pdf": "application/pdf",
    "pem": "application/x-x509-ca-cert",
    "pgm": "image/x-portable-graymap",
    "pgp": "application/pgp-encrypted",
    "pkg": "application/octet-stream",
    "pl": "text/x-script.perl",
    "pm": "text/x-script.perl-module",
    "png": "image/png",
    "pnm": "image/x-portable-anymap",
    "ppm": "image/x-portable-pixmap",
    "pps": "application/vnd.ms-powerpoint",
    "ppt": "application/vnd.ms-powerpoint",
    "ps": "application/postscript",
    "psd": "image/vnd.adobe.photoshop",
    "py": "text/x-script.python",
    "qt": "video/quicktime",
    "ra": "audio/x-pn-realaudio",
    "rake": "text/x-script.ruby",
    "ram": "audio/x-pn-realaudio",
    "rar": "application/x-rar-compressed",
    "rb": "text/x-script.ruby",
    "rdf": "application/rdf+xml",
    "roff": "text/troff",
    "rpm": "application/x-redhat-package-manager",
    "rss": "application/rss+xml",
    "rtf": "application/rtf",
    "ru": "text/x-script.ruby",
    "s": "text/x-asm",
    "sgm": "text/sgml",
    "sgml": "text/sgml",
    "sh": "application/x-sh",
    "sig": "application/pgp-signature",
    "snd": "audio/basic",
    "so": "application/octet-stream",
    "svg": "image/svg+xml",
    "svgz": "image/svg+xml",
    "swf": "application/x-shockwave-flash",
    "t": "text/troff",
    "tar": "application/x-tar",
    "tbz": "application/x-bzip-compressed-tar",
    "tcl": "application/x-tcl",
    "tex": "application/x-tex",
    "texi": "application/x-texinfo",
    "texinfo": "application/x-texinfo",
    "text": "text/plain",
    "tif": "image/tiff",
    "tiff": "image/tiff",
    "torrent": "application/x-bittorrent",
    "tr": "text/troff",
    "txt": "text/plain",
    "vcf": "text/x-vcard",
    "vcs": "text/x-vcalendar",
    "vrml": "model/vrml",
    "war": "application/java-archive",
    "wav": "audio/x-wav",
    "wma": "audio/x-ms-wma",
    "wmv": "video/x-ms-wmv",
    "wmx": "video/x-ms-wmx",
    "wrl": "model/vrml",
    "wsdl": "application/wsdl+xml",
    "xbm": "image/x-xbitmap",
    "xhtml": "application/xhtml+xml",
    "xls": "application/vnd.ms-excel",
    "xml": "application/xml",
    "xpm": "image/x-xpixmap",
    "xsl": "application/xml",
    "xslt": "application/xslt+xml",
    "yaml": "text/yaml",
    "yml": "text/yaml",
    "zip": "application/zip"
};

var fileReadSteam = function fileReadSteam(socket, url) {
    var filebodyerror = fs.createReadStream(url);
    return filebodyerror.pipe(socket);
};
var outPutConstant = function outPutConstant(socket) {
    socket.write('Connection: close', 'UTF-8');
    socket.write('\r\n');
    socket.write('Date: ' + (new Date().toGMTString()), 'UTF-8');
    socket.write('\r\n');
    socket.write('Server: node.js/v0.10.0', 'UTF-8');
    socket.write('\r\n');
};

var filePart = function filePart(Datafile, keyword, keyword2, keyword3) {
    return Datafile.slice(Datafile.indexOf(keyword) + keyword2, Datafile.indexOf(keyword3, Datafile.indexOf(keyword) + keyword2));
};

var log = function log(data) {
    console.log(data);
};

var fileExists = function fileExists(url, Datafile, socket) {
    var contentType = path.extname(url.slice(1));
    contentType = contentType ? contentType.slice(1) : 'unknown';
    contentType = types[contentType] || "text/plain";
    var connection = filePart(Datafile, "Connection", 12, "\n");
    return fs.exists(url, function(exists) {
        log('exists= ' + exists);
        if (exists) {
            //request file exists
            var ContentLength = fs.statSync(url).size;
            fs.stat(url, function(err, stat) {
                if (err) throw err;
                var lastModified = stat.mtime.toGMTString();
                var lastModifiedsince = filePart(Datafile, "If-Modified-Since", 19, 'GMT');
                log(lastModifiedsince);
                lastModifiedsince = lastModifiedsince + 'GMT';
                //file ok or Not Modified
                if (lastModifiedsince === lastModified) {
                    socket.write('HTTP/1.1 304 Not Modified', 'UTF-8');
                    socket.write('\r\n');
                    outPutConstant(socket);
                    socket.write('Last-Modified: ' + lastModified, 'UTF-8');
                    socket.write('\r\n');
                    socket.write('\r\n');
                } else {
                    socket.write('HTTP/1.1 200 OK', 'UTF-8');
                    socket.write('\r\n');
                    outPutConstant(socket);
                    socket.write('Last-Modified: ' + lastModified, 'UTF-8');
                    socket.write('\r\n');
                    socket.write('Content-Length: ' + ContentLength, 'UTF-8');
                    socket.write('\r\n');
                    socket.write('Content-Encoding: UTF-8', 'UTF-8');
                    socket.write('\r\n');
                    socket.write('Content-Type: ' + contentType, 'UTF-8');
                    socket.write('\r\n');
                    socket.write('\r\n');
                    return fileReadSteam(socket, url);
                }
            });
        } else {
            //file not found
            var HTTP = 'HTTP/1.1 404 Not Found';
            log(HTTP);
            socket.write(HTTP, 'UTF-8');
            socket.write('\r\n');
            outPutConstant(socket);
            socket.write('\r\n');
            return fileReadSteam(socket, '/test/error.html');
        }
    });
};

function postData(Datafile) {
    var postDataString = Datafile.slice(Datafile.indexOf("\r\n\r\n") + 4);
    postDataString = querystring.stringify(querystring.parse(postDataString));
    log('postDataString=' + postDataString);
    return postDataString = querystring.unescape(postDataString);
}

var server = net.createServer(function(socket) {
    socket.on('connect', function() {
        log("connect");
    });
    return socket.on('data', function(data) {
        try {
            var Datafile = data.toString();
            log(Datafile);
            //Message judge
            //GET part
            if (Datafile.indexOf("GET") != -1) {
                //Url path get and modify
                var url = '/test' + filePart(Datafile, "GET", 4, " ");
                log('url=' + url);
                var realurl = urlmodule.parse(url).path;
                log('realurl=' + realurl);
                url = path.normalize(querystring.unescape(realurl));

                return fileExists(url, Datafile, socket);
            } else {
                if (Datafile.indexOf("POST") != -1) {
                    //POST part
                    var postDataString = postData(Datafile);
                    var userName = filePart(postDataString, "name", 5, "&");
                    var passWord = postDataString.slice(postDataString.indexOf("psd") + 4);
                    log('userName=' + userName);
                    log('passWord=' + passWord);
                    if (userName === 'feng' && passWord === '123') {
                        var login = '/test/login.html';
                        socket.write('HTTP/1.1 200 OK', 'UTF-8');
                        socket.write('\r\n');
                        outPutConstant(socket);
                        socket.write('Content-Encoding: UTF-8', 'UTF-8');
                        socket.write('\r\n');
                        socket.write('\r\n');
                        return fileReadSteam(socket, login);
                    }
                }
            }
        }
        //Server error
        catch (err) {
            socket.write('HTTP/1.1 500 Internal Server Error');
            var HTTP = 'HTTP/1.1 500 Internal Server Error';
            log(HTTP);
            socket.write(HTTP, 'UTF-8');
            socket.write('\r\n');
            outPutConstant(socket);
            socket.write('\r\n');
            return fileReadSteam(socket, '/test/bug.html');
        }
    });
});

server.listen(port, host, function() {
    address = server.address();
    console.log("opened server on %j", address);
});