export function connectWebViewBridge(cb) {
  if (window.WebViewJavascriptBridge) {
    cb()
  } else {
    document.addEventListener('WebViewJavascriptBridgeReady', cb)
  }
}
