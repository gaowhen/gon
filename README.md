### Commit Message

安装 [Commitizen](https://github.com/commitizen/cz-cli)

    npm install -g commitizen

以后，凡是用到 __git commit__ 命令，一律改为使用 __git cz__。这时，就会出现选项，用来生成符合格式的 Commit message

![commit message](http://www.ruanyifeng.com/blogimg/asset/2016/bg2016010605.png)

详情参考 [Commit message 和 Change log 编写指南](http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)

### Code Style

* [eslint-config-aribnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb)

### Command

* npm run serve (start node server)
* npm run watch (start gulp watch)
* npm start (npm run serve & npm run watch)
* npm run release (release a folder with a same name compress file )
* npm run changelog (generate a changelog file that match the pattern of a "Feature", "Fix", "Performance Improvement" or "Breaking Changes")
* check "scripts" in package.json for more commands

### Dev

* 设置 host `127.0.0.1 piaofang.wepiao.com`
* 启动服务：因为需要启动 80 端口做代理转发，需要 `sudo npm start`
* 访问 [http://piaofang.wepiao.com](http://piaofang.wepiao.com)
* 通过 [http://localhost](http://localhost) 来修改 api 和前端的指向
* React 在开发时，默认使用压缩版，提高 JS 运行速度，如果碰到 React 报错，可以在[这里](http://localhost)切换成开发版，选完之后重刷页面即可

__注意：每次服务启动或重启的时候，api 都会重置指向线上，前端默认指向本地__

### FE Server

url: http://piaofang.wepiao.com

http://gitlab.intra.wepiao.com/wepiao/blackarror

Dev: 192.168.101.34 - dev branch

Dev1: 192.168.101.31 dev1 branch

Dev2: 192.168.101.54 dev2 branch

Dev3: 192.168.101.63 dev3 branch

Pre: 119.29.28.15 - pre branch

--------

用作小范围公测功能

url: http://piaofang-test.wepiao.com

repository: http://gitlab.intra.wepiao.com/wepiao/kurapika

Dev: 192.168.101.36 - dev branch

Pre: 182.254.228.173 - pre branch

### BE Server

10.3.10.100 boxoffice.wepiao.com

### Release

After running `npm run release`, cd to the folder named as 'YYYYMMDDHHmm' in shell,
run `python -m SimpleHTTPServer`, then visit the [http://127.0.0.1:8000](http://127.0.0.1:8000).

### Version

版本格式：主版本号.次版本号.修订号，版本号递增规则如下：

* 主版本号：当你做了不兼容的 API 修改，
* 次版本号：当你做了向下兼容的功能性新增，
* 修订号：当你做了向下兼容的问题修正。

### Flow Chart

![workflow chat](https://raw.githubusercontent.com/gaowhen/skyarena/master/workflow.png?token=AAVAj_9ponUhIkXtBQzc85FAtU9MvGBrks5XpDF0wA%3D%3D)

### Reference

* [React on ES6+](https://babeljs.io/blog/2015/06/07/react-on-es6-plus)
* [EditorConfig](http://editorconfig.org/)
* [Semantic Versioning](http://http://semver.org/)

