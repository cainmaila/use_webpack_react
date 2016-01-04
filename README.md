# WebPack + React 學習筆記

## 安裝 Webpack + React
```
npm init
npm install webpack --save
npm install webpack-dev-server --save
npm install path --save
npm install babel-loader --save
npm install babel-core --save
npm install babel-preset-es2015 --save
npm install babel-preset-react --save
npm install react --save
npm install css-loader style-loader --save
// css use less
npm install less
npm install less-loader
```

## 建立 webpack.config.js
```javascript
var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');
var pathToReact = path.resolve(node_modules, 'react/dist/react.min.js');

module.exports = {
    entry: ['webpack/hot/dev-server', path.resolve(__dirname, 'app/main.jsx')],
    resolve: {
        alias: {
            'react': pathToReact
        }
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
    },
    module: {
        loaders: [{
                test: /\.jsx?$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', "react"]
                },
                noParse: [pathToReact, node_modules]
            },{
                test: /\.less$/,
                loader: 'style!css!less'
            }
        ]
    }
};
```

## 建立專案
建立架構用資料夾
```
mkdir app
mkdir build
```
## npm script
在 package.json 加入
```
"scripts": {
    "build": "webpack",
    "dev": "webpack-dev-server --devtool eval --progress --colors --hot --content-base build"
  }
```
**bulid** 編譯專案可以用<br>
```
npm run bulid
```
**de**v<br>
```
npm run dev
```
webpack-dev-server - 在 localhost:8080 建立一个 Web 服务器<br>
--devtool eval - 为你的代码创建源地址。当有任何报错的时候可以让你更加精确地定位到文件和行号<br>
--progress - 显示合并代码进度<br>
--colors - Yay，命令行中显示颜色！<br>
--content-base build - 指向设置的输出目录<br>
--hot 自動配置 port<br>
開發時期本機服務器
```
http://localhost:8080 
```

## 參考網址
[React 和 Webpack 小书](https://hainuo.gitbooks.io/react-webpack-cookbook/content/index.html)
