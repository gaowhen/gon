const showTip = (msg, { type = 'ok', delay = 1500, cb = () => {} } = {}) => {
  const klas = `${type}-toast msg`
  const _toast = document.getElementById('global-toast')
  const _msg = _toast.getElementsByClassName('msg')[0]
  _toast.addEventListener('transitionend', () => {
    if (!_toast.classList.contains('show')) {
      _msg.textContent = ''
      cb()
    }
  }, false)

  if (_toast && _msg) {
    _msg.textContent = msg
    _msg.className = klas
    _toast.className = 'show'

    setTimeout(() => {
      _toast.className = ''
    }, delay)
  }
}

export default showTip
