var shortId = require('shortid');

module.exports = function(app){
    // thay doi ten file upload, TODO append ext cua uploaded file (image ext only)
    app.dataSources.storage.connector.getFilename = function (file, req, res) {
        return shortId.generate() + '.jpg';
    }
};
