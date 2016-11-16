import klas from 'classnames'

class SelectItem extends React.Component {
  constructor(props) {
    super(props)

    this.changeSelectedItem = (item) => {
      if (item.isSelected) {
        this.props.deleteItem(item.id)
      } else {
        ga('send', 'event', '添加', 'click', Gon.page, 1)
        this.props.selectItem(item.id)
      }
    }
  }

  render() {
    const {
      item,
    } = this.props

    const actionClass = klas('action iconfont', {
      'icon-plus': !item.isSelected,
      'icon-tick': item.isSelected,
    })

    return (
      <div
        className="c-select-item"
        onClick={() => this.changeSelectedItem(item)}
      >
        <div className="hd">
          <img src={item.poster} alt="" />
        </div>
        <div className="bd">
          <h3>{item.name}</h3>
          <p>{item.cast}</p>
        </div>
        <div className="ft">
          <i className={actionClass}></i>
        </div>
      </div>
    )
  }
}

SelectItem.propTypes = {
  item: React.PropTypes.object.isRequired,
  selectItem: React.PropTypes.func.isRequired,
  deleteItem: React.PropTypes.func.isRequired,
}

export default SelectItem
