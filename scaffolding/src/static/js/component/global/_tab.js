import klas from 'classnames'

class Tab extends React.Component {
  constructor(props) {
    super(props)

    const {
      active,
    } = props

    this.state = {
      active,
    }

    this.onClickTab = (idx) => {
      this.setState({
        active: idx,
      })

      this.props.onClickTab(idx)
    }
  }

  renderTabs() {
    const {
      items,
    } = this.props

    return items.map((text, idx) => (
      <li
        key={idx}
        className={this.state.active === idx ? 'on' : ''}
        onClick={() => this.onClickTab(idx)}
      >
        {text}
      </li>
    ))
  }

  render() {
    const {
      className,
      children,
    } = this.props

    const wrapClass = klas('g-c-tab', className)

    return (
      <div className={wrapClass}>
        <ul className="tab">
          {this.renderTabs()}
        </ul>
        {
          children && children.map((child, idx) => (
            <div className={`tab-panel${child.props.isShow ? ' on' : ''}`} key={idx}>
              {child}
            </div>
          ))
        }
      </div>
    )
  }
}

Tab.defaultProps = {
  active: 0,
}

Tab.propTypes = {
  items: React.PropTypes.array.isRequired,
  active: React.PropTypes.number,
  className: React.PropTypes.string,
  children: React.PropTypes.array,
  onClickTab: React.PropTypes.func.isRequired,
}

export default Tab
