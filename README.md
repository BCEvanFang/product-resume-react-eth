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
// save
ProductResume.deployed().then(function(instance){return instance.save("apple001", "Apple Fuji", "Super good apple!");});

// get
ProductResume.deployed().then(function(instance){return instance.get();});
```

啟動網站
```sh
cd client

npm start
```

網站頁面
- /query: 查詢