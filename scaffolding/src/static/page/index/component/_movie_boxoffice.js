import { getWithUnit } from 'js/util/_number.js'

export function MovieBoxoffice(props) {
  const {
    order,
    movies,
  } = props

  const item = movies[order]

  // boxOfficeRef[0]是当前票房的初始值 boxOfficeRef[1]是现在票房美秒增加的值
  const num = getWithUnit(item.boxOfficeRef[0])

  return <p><strong>{num.value}</strong><small>{num.unit}</small></p>
}

MovieBoxoffice.propTypes = {
  order: React.PropTypes.number.isRequired,
  movies: React.PropTypes.array.isRequired,
}

export default MovieBoxoffice
