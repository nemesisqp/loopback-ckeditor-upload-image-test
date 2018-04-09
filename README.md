
## Đăng Nhập Static với LoopbackAPI
### Mô tả

#### Trang Chủ : sau khi đăng nhập
> sử dụng authen.js nằm riêng để nhúng vào nhiều trang sau này.

1. Khi vào trang chủ `/`, dựa vào `accessToken` để lấy thông tin user
    - `token` đã được lưu ở client, sau quá trình đăng nhập ở `/login.html`
1. gọi profile api để lấy thông tin của user, 
    - hiển thị thông tin user (username) trên trang chủ

1. trường hợp không truy cập được, chưa có `accessToken` hoặc không lấy profile data thì trỏ về trang `/login.html`

    
#### Trang Login
1. Nếu đã đăng nhập thì trỏ về trang chủ `/`
1. hiển thị form login
1. call api để lấy thông tin đăng nhập 
    - POST `/api/Users/login`:  

1. đăng nhập thành công, lưu `accessToken` và trỏ về trang chủ.



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




