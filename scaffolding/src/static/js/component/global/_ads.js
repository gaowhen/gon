// import Slider from 'react-slick'

import { getAds } from 'js/util/_api'

class Ads extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      ads: [],
    }

    getAds(`adlist?advertisingId=${this.props.id}`)
      .then((res) => {
        const ads = res.advertising.advertisements || []
        this.setState({ ads })
      })
  }

  render() {
    const settings = {
      dots: false,
      arrows: false,
      infinite: this.state.ads.length > 1,
      speed: 800,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
      useCSS: true,
      swipe: true,
    }

    const createItem = (item, idx) => {
      const href = `${decodeURIComponent(item.url)}?source=${this.props.source}`

      return (
        <div
          className="ad-item"
          key={idx}
        >
          <a
            href={href}
            style={{
              background: `url(${item.img}) 50% 50% / cover no-repeat`,
              transform: 'translateZ(0px) translateX(0px)',
            }}
          >
          </a>
        </div>
      )
    }

    const slider = (
      <Slider {...settings}>
        {this.state.ads.map(createItem)}
      </Slider>
    )

    return (
      <div className="ads-wrap">
        {this.state.ads.length ? slider : null}
      </div>
    )
  }
}

Ads.defaultProps = {
  id: 55,
  source: 'http://piaofang.wepiao.com',
}

Ads.propTypes = {
  id: React.PropTypes.number,
  source: React.PropTypes.string,
}

export default Ads
