import parseURL from 'js/util/_uri'
import share from 'js/util/_share'

import HeadLite from 'js/component/global/_head_lite'

import SelectList from '../components/_select_list'
import SelectConfirm from '../components/_select_confirm'

import createContainer from '../containers/_create_select_container'

const url = parseURL(window.location)
const params = url.params
const id = Number(params.movie_id)

class Select extends React.Component {
  constructor(props) {
    super(props)

    const shareTtile = '热门影院排行—微票儿票房分析，透过数据看电影'
    share({ title: shareTtile })

    props.getServerData(id)
  }

  render() {
    const {
      LANG_SELECT,
      mainItem,
      items,
      date,
      endDate,
      selectedItems,
      selectItem,
      deleteItem,
    } = this.props

    const LANG = LANG_SELECT

    return (
      <div className="comparison-select-wrap">
        <HeadLite
          title={LANG.HeadLite.title}
        />
        <div className="main">
          <SelectList
            items={items}
            lang={LANG.SelectList}
            selectItem={selectItem}
            deleteItem={deleteItem}
          />
          <SelectConfirm
            id={id}
            date={date}
            endDate={endDate}
            mainItem={mainItem}
            selectedItems={selectedItems}
            lang={LANG.SelectConfirm}
            deleteItem={deleteItem}
          />
        </div>
      </div>
    )
  }
}

Select.propTypes = {
  LANG_SELECT: React.PropTypes.object.isRequired,
  mainItem: React.PropTypes.object.isRequired,
  items: React.PropTypes.array.isRequired,
  date: React.PropTypes.string.isRequired,
  endDate: React.PropTypes.string.isRequired,
  selectedItems: React.PropTypes.array.isRequired,
  selectItem: React.PropTypes.func.isRequired,
  deleteItem: React.PropTypes.func.isRequired,
  getServerData: React.PropTypes.func.isRequired,
}

export default createContainer(Select)
