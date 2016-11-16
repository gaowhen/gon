const body = document.querySelector('body')
const klases = body.className

const hasClass = /develop/.test(klases)

function _ga() {
  if (!hasClass) {
		(function(i, s, o, g, r, a, m) {
			i['GoogleAnalyticsObject'] = r;
			i[r] = i[r] || function() {
			(i[r].q = i[r].q || []).push(arguments)
			}, i[r].l = 1 * new Date();
			a = s.createElement(o), m = s.getElementsByTagName(o)[0];
			a.async = 1;
			a.src = g;
			m.parentNode.insertBefore(a, m)
		})(window, document, 'script', '//wxstatic.wepiao.com/js/lib/ga.js', 'ga');

		window.ga('create', 'UA-58583546-12');
		window.ga('send', 'pageview')
    // // google
    // window.GoogleAnalyticsObject = 'ga'

    // window.ga = window.ga ||
    //   function () {
    //     (window.ga.q = window.ga.q || []).push(arguments)
    //   }

    // window.ga.l = 1 * Gon.getBjTime()

    // var a = document.createElement('script')
    // a.src = '//www.google-analytics.com/analytics.js'
    // var sc = document.getElementsByTagName('script')[0]

    // sc.parentNode.insertBefore(a, sc)

    // window.ga('create', 'UA-58583546-12', 'auto')
    // window.ga('send', 'pageview')
  } else {
    window.ga = window.ga || function () {}
  }
}

export default _ga
