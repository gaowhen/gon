import SelectItem from '../components/_select_item'

function renderItems({
  items,
  selectItem,
  deleteItem,
}) {
  const createItem = (item, idx) => (
    <SelectItem
      key={idx}
      item={item}
      selectItem={selectItem}
      deleteItem={deleteItem}
    />
  )

  return items.map(createItem)
}

function SelectList(props) {
  const {
    items,
    lang,
    maxNumber,
    selectItem,
    deleteItem,
  } = props

  // TODO 44 抽象全局变量
  const height = window.innerHeight - 44 - 175

  return (
    <div
      className="c-select-list"
      style={{ height }}
    >
      <div className="hd">
        <h3>{lang.subtitle}</h3>
      </div>
      <div className="bd">
        {renderItems({ items, maxNumber, selectItem, deleteItem })}
      </div>
    </div>
  )
}

SelectList.defaultProps = {
  maxNumber: 4,
}

SelectList.propTypes = {
  items: React.PropTypes.array.isRequired,
  lang: React.PropTypes.object.isRequired,
  maxNumber: React.PropTypes.number.isRequired,
  selectItem: React.PropTypes.func.isRequired,
  deleteItem: React.PropTypes.func.isRequired,
}

export default SelectList
