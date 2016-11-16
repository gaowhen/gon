import klas from 'classnames'

function renderList({
  selectedItems,
  deleteItem,
}) {
  const createItem = (item, idx) => {
    const onClickItems = () => deleteItem(item.id)

    const actionWrap = (
      <div className="action-wrap">
        <div className="action">
          <i className="iconfont icon-delete"></i>
        </div>
      </div>
    )

    return (
      <div
        key={idx}
        className="c-selected-item"
        onClick={onClickItems}
      >
        <div className="hd">
          <img src={item.poster} alt="" />
          {actionWrap}
        </div>
        <div className="bd">
          <h3>{item.name}</h3>
        </div>
      </div>
    )
  }

  return selectedItems.map(createItem)
}

function SelectConfirm(props) {
  const {
    id,
    maxNumber,
    minNumber,
    mainItem,
    selectedItems,
    lang,
    deleteItem,
    date,
    endDate,
  } = props

  const selectedNumber = selectedItems.length + 1
  const btnClass = klas('btn-confirm', {
    disabled: selectedNumber < minNumber,
  })

  const ids = selectedItems.map((item) => item.id)
  ids.unshift(mainItem.id)

  const href = selectedNumber < minNumber ? '#' :
    `/comparison_result?movie_ids=${ids.join('|')}&date=${date}&endDate=${endDate}`

  let tipText
  if (window.lang === 'cn') {
    tipText = (
      <p className="info">
        <span>已选<strong>{selectedNumber}</strong>部</span>
        <span className="select-tip">{`（最多选 ${maxNumber}部）`}</span>
      </p>
    )
  } else {
    tipText = (
      <p className="info">
        <span><strong>{selectedNumber}</strong>selected</span>
        <span className="select-tip">{` (${maxNumber} max)`}</span>
      </p>
    )
  }

  return (
    <div className="c-select-confirm">
      <div className="hd">
        {tipText}
      </div>
      <div className="bd">
        <div
          className="c-selected-item required"
        >
          <div className="hd">
            <img src={mainItem.poster} alt="" />
          </div>
          <div className="bd">
            <h3>{mainItem.name}</h3>
          </div>
        </div>
        {renderList({
          id,
          mainItem,
          selectedItems,
          deleteItem,
        })}
      </div>
      <div className="ft">
        <a
          className={btnClass}
          onClick={() => {ga('send', 'event', '确定', 'click', Gon.page, 1)}}
          href={href}
        >{lang.confirm}</a>
      </div>
    </div>
  )
}

SelectConfirm.defaultProps = {
  minNumber: 2,
  maxNumber: 4,
}

SelectConfirm.propTypes = {
  id: React.PropTypes.number.isRequired,
  mainItem: React.PropTypes.object.isRequired,
  selectedItems: React.PropTypes.array.isRequired,
  lang: React.PropTypes.object.isRequired,
  date: React.PropTypes.string.isRequired,
  endDate: React.PropTypes.string.isRequired,
  minNumber: React.PropTypes.number,
  maxNumber: React.PropTypes.number,
  deleteItem: React.PropTypes.func.isRequired,
}

export default SelectConfirm
