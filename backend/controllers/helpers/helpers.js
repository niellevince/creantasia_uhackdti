const Handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

global.viewPath = function (p) {
    p = p.replaceAll('.', '/')
    return path.join(__dirname, `../../views/${p}.html`);
}

global.randomString = function (length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

global.templateAsString = function (path) {
    return fs.readFileSync(viewPath(path)).toString();
}

global.view = function (path, data) {
    var source = templateAsString(path);
    var template = Handlebars.compile(source);
    return template(data);
}