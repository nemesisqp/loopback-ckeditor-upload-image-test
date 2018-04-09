module.exports = function(Container) {
    Container.getToken = function(cb) {
        cb(null, 'dummy-token');
    };
    Container.remoteMethod(
        'getToken', {
            http: {
                path: '/get-token',
                verb: 'get'
            },
            returns: { type: 'file', root: true }
        }
    );

    Container.afterRemote('upload', function(context, remoteMethodOutput, next) {
        context.result = {
            default: `/uploaded/${remoteMethodOutput.result.files.file[0].name}`
        };
        next();
    });
};
