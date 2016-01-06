# WebPack + React 學習筆記

## 環境
```
npm install npm
npm install-g babel-cli
```

## 安裝 Webpack + React
```
npm init
npm install webpack --save
npm install webpack-dev-server --save
npm install path --save
npm install babel-core --save
npm install babel-loader --save
npm install babel-preset-es2015 --save
npm install babel-preset-react --save
npm install react --save
npm install react-dom --save
npm install file-loader --save
npm install css-loader style-loader --save
// css use less
npm install less --save
npm install less-loader --save
// url(轉bace64)
npm install url-loader --save
```

## 建立專案架構
建立架構用資料夾
```
mkdir app
mkdir build
mkdir dist
```

## 建立 webpack.config.js
```javascript
var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');
var pathToReact = path.resolve(node_modules, 'react/dist/react.min.js');
var pathToReactDom = path.resolve(node_modules, 'react-dom/dist/react-dom.min.js');

module.exports = {
    entry: ['webpack/hot/dev-server', path.resolve(__dirname, 'app/main.jsx')],
    resolve: {
        alias: {
            'react': pathToReact,
            'react-dom':pathToReactDom
        }
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
    },
    module: {
        loaders: [{
            test: /\.(js|jsx)$/,
            loader: 'babel',
            exclude: /node_modules/,
            query: {
                presets: ['es2015', "react"]
            },
            noParse: [pathToReact,pathToReactDom, node_modules]
        }, {
            test: /\.less$/,
            loader: 'style!css!less'
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url?limit=25000'
        }]
    }
};
```

或者 ```npm init``` 下面這段
```
"devDependencies": {
    "babel-core": "^6.3.26",
    "babel-loader": "^6.2.1",
    "babel-preset-es2015": "^6.3.13",
    "babel-preset-react": "^6.3.13",
    "css-loader": "^0.23.1",
    "file-loader": "^0.8.5",
    "less": "^2.5.3",
    "less-loader": "^2.2.2",
    "path": "^0.12.7",
    "style-loader": "^0.13.0",
    "url-loader": "^0.5.7",
    "webpack": "^1.12.9",
    "webpack-dev-server": "^1.14.0"
  },
  "dependencies": {
    "react": "^0.14.5",
    "react-dom": "^0.14.5"
  }
```


## npm script
在 package.json 加入
```
"scripts": {
    "build": "webpack",
    "dev": "webpack-dev-server --devtool eval --progress --colors --hot --content-base build",
    "deploy": "SET NODE_ENV=production & webpack -p --config webpack.production.config.js"
  }
```
**bulid** 編譯專案可以用<br>
```
npm run bulid
```
**dev**<br>
```
npm run dev
```
webpack-dev-server - 在 localhost:8080 建立一个 Web 服务器<br>
--devtool eval - 为你的代码创建源地址。当有任何报错的时候可以让你更加精确地定位到文件和行号<br>
--progress - 显示合并代码进度<br>
--colors - Yay，命令行中显示颜色！<br>
--content-base build - 指向设置的输出目录<br>
--hot 自動配置 port<br>
html可以加上
```
<script src="http://localhost:8080/webpack-dev-server.js"></script>
```
開發時期本機服務器
```
http://localhost:8080 
```
**deploy** 專案佈署

建立佈署用檔案 **webpack.production.config.js**
```javascript
var path = require('path');
var webpack = require('webpack');
var node_modules_dir = path.resolve(__dirname, 'node_modules');
// var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
var config = {
    entry: {
        app: path.resolve(__dirname, 'app/main.jsx'),
        // mobile: path.resolve(__dirname, 'app/mobile.js'),
        vendors: ['react','react-dom']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        loaders: [{
            test: /\.(js|jsx)$/,
            loader: 'babel',
            exclude: /node_modules/,
            query: {
                presets: ['es2015', "react"]
            }
        }, {
            test: /\.less$/,
            loader: 'style!css!less'
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url?limit=25000'
        }]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            filename: "vendors.js"
        })
    ]
};

module.exports = config;

```

copy build 資料夾的 **index.html** 到 **dist**資料夾 中， dev 用掛件記得抽掉
```
<script src="http://localhost:8080/webpack-dev-server.js"></script>
```

## 參考網址
[React 和 Webpack 小书](https://hainuo.gitbooks.io/react-webpack-cookbook/content/index.html)
