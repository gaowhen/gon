import { getCategoryName } from '../_helper'

function renderItem(news, idx, onChangeCategory, _category) {
  const {
    id,
    title,
    poster,
    date,
    category,
  } = news

  return (
    <li
      key={`item-${idx}`}
      className="item"
    >
      <a href={`/news_detail?id=${id}&from=/news&category=${_category}`}>
        <div className="hd">
          <img className="poster" src={poster} />
        </div>
        <div className="bd">
          <h3>{title}</h3>
          <p className="meta">
            <span
              className="meta-category"
              onClick={(e) => {
                e.preventDefault()
                onChangeCategory(category)
              }}
            >
              {getCategoryName(category)}
            </span>
            <span className="meta-date">{date}</span>
          </p>
        </div>
      </a>
    </li>
  )
}

const List = (props) => {
  const {
    data,
    category,
    onChangeCategory,
  } = props

  return (
    <ul className="list">
      {data.map((news, idx) => renderItem(news, idx, onChangeCategory, category))}
    </ul>
  )
}

List.propTypes = {
  data: React.PropTypes.array.isRequired,
  category: React.PropTypes.number.isRequired,
  onChangeCategory: React.PropTypes.func.isRequired,
}

export default List
