In root folder
```sh
# 啟動測試鏈
truffle develop

# 編譯
compile

# 本地測試鏈部署
migrate --reset
```

測試語法(In truffle develop console)
```js
// 取版本號
ProductResume.deployed().then(function(instance){return instance.getVersion();});

// 新增產品
ProductResume.deployed().then(function(instance){return instance.addProduct("456", "Name456", "Info456");});

// 更新產品
ProductResume.deployed().then(function(instance){return instance.updateProduct("456", "Name456-2", "Info456-2");});

// 用id取產品
ProductResume.deployed().then(function(instance){return instance.getProduct("456");});

// 取產品總數
ProductResume.deployed().then(function(instance){return instance.getProductCount();});

// 用產品流水號取產品
ProductResume.deployed().then(function(instance){return instance.getProductBySeq(0);});
```

啟動網站
```sh
cd client

npm start
```

網站頁面
- /query: 查詢