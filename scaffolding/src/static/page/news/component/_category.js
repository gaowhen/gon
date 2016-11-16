import classNames from 'classnames'
import { getCategoryName } from '../_helper'

class Filter extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      category: 0,
      isShowList: false,
    }

    this.toggleShowList = () =>
      this.setState({
        isShowList: !this.state.isShowList,
      })

    this.switchCategory = (category) => {
      this.setState({
        isShowList: false,
      })

      this.props.onChangeCategory(category)
    }

    this.handleDocumentClick = (e) => {
      if (this.state.isShowList) {
        if (!ReactDOM.findDOMNode(this).contains(e.target)) {
          this.setState({
            isShowList: false,
          })
        }
      }
    }
  }

  componentDidMount() {
    document.addEventListener('click', this.handleDocumentClick, false)
    document.addEventListener('touchend', this.handleDocumentClick, false)
  }

  componentWillReceiveProps(props) {
    this.setState({
      category: props.category,
    })
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClick, false)
    document.removeEventListener('touchend', this.handleDocumentClick, false)
  }

  renderCategory(category, idx) {
    const klas = classNames({ on: category === this.state.category })

    return (
      <li
        key={idx}
        className={klas}
        onClick={() => this.switchCategory(category)}
      >
        {getCategoryName(category)}
      </li>
    )
  }

  render() {
    const {
      category,
    } = this.props

    const klas = classNames({ hide: !this.state.isShowList })
    const iconKlas = classNames({
      'icon-arrow-d': !this.state.isShowList,
      'icon-arrow-t': this.state.isShowList,
    })

    return (
      <div className="category">
        <div className="hd">
          <h3
            onClick={this.toggleShowList}
          >
            {getCategoryName(category)}
            <i className={`icon ${iconKlas}`}></i>
          </h3>
        </div>
        <div className="bd">
          <ul className={klas}>
            {
              [0, 5, 3, 1, 2, 4].map((key, idx) =>
                this.renderCategory(key | 0, idx)
              )
            }
          </ul>
        </div>
      </div>
    )
  }
}

Filter.propTypes = {
  category: React.PropTypes.number.isRequired,
  onChangeCategory: React.PropTypes.func.isRequired,
}

export default Filter
