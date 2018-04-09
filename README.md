



## Tích hợp Ckeditor5 với looback API
> hình ảnh được upload từ Ckeditor sẽ được xử lý bởi loopback API Container

### cấu hình CKeditor

1. hình ảnh được upload trong CKeditor5
    - cấu hình `cloudServices`
```
.create(document.querySelector('#ckeditor5-tabs-content-classic'),{
            cloudServices: {
                tokenUrl: '/api/containers/get-token',
                uploadUrl: '/api/containers/folder1/upload'
            }
        })
```

### Cấu hình loopback
1. cấu hình `tokenUrl`

```
//models/container.js
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
```
1. truy cập link `/uploaded/{file_name}`
```
//models/container.js
    Container.afterRemote('upload', function(context, remoteMethodOutput, next) {
        context.result = {
            default: `/uploaded/${remoteMethodOutput.result.files.file[0].name}`
        };
        next();
    });
```

1. cấu hình loopback static
```
"loopback#static": [
      {
        "name": "uploaded",
        "paths": ["/uploaded"],
        "params": "server/storage/folder1"
      },
      {
        "name": "root",
        "paths": ["/"],
        "params": "$!../web"
      }
    ]
```

1. lưu trữ tại thư  mục `storage/folder1`
```
//datasource.json
"root": "./server/storage"
```




