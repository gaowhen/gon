## WebSocket

### Index Page

#### 主要原理
在 iOS 版 App 内，由客户端完成 WebSocket 请求，WebSocket 每隔 1s 推送数据，通过 `WebViewJavascriptBridge` 通信，客户端和 `Webview` 互相传递数据。

#### 详细交互过程
备注：只有今日和往后日期的数据，需要 WebSocket 实时返回
- 客户端探测是否存在 `WebViewJavascriptBridge`，如果存在，就通过 iOS WebSocket 获取数据，否则还是利用 JS 轮询方案定时请求后端数据
- 加载页面后，JavaScript `callHandler` 方法第一次触发 `socketData` 事件，向客户端传递请求 WebSocket 时所需要的参数，数据格式如下：
  ```javascript
  {
    date: '2014-'
  }
  ```
 - JavaScript `registerHandler` 方法监听客户端 `socketData` 事件，获取 WebSocket 返回的数据「数据格式和 WebSocket 返回数据格式一样」
 - JavaScript `registerHandler` 方法监听客户端 `socketFail` 事件，如果监听到，则改为 JS 轮询方案，当重新监听到 `socketData` 事件，则继续使用 `WebSocket` 方案
 - 当用户改变数据过滤条件时，会再一次调用 JavaScript `callHanlder` 方法以触发 `socketData` 事件，客户端接收数据，从而改变 WebSocket 请求参数。
   
#### 客户端触发 `socketFail` 事件条件
- 网络中断或异常
