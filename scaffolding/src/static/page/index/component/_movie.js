import { formatUnit } from 'js/util/_number'

class Movie extends React.Component {
  renderDaysAndBoxoffice(item, ITEM) {
    const Lang = window.lang
    const num = formatUnit(item[ITEM.gross[Lang]])
    const showdays = item.showDays
    const CN = Lang === 'cn'
    let showDays
    const boxoffice = CN ? <span>{num.value}{num.unit}</span> :
      <span>{item[ITEM.gross[Lang]]}</span>

    if (showdays === 0) {
      showDays = <span className="light">{CN ? '零点场，' : 'Midnight,'}</span>
    } else if (showdays === 1) {
      showDays = <span className="light">{CN ? '首日，' : 'Opening,'}</span>
    } else if (showdays < 0) {
      showDays = <span className="light">{CN ? '点映，' : 'Limited Release,'}</span>
    } else {
      showDays = <span>{CN ? `上映${showdays}天，` : `${showdays} days,`}</span>
    }

    return (
      <p>
        {showDays}
        {boxoffice}
      </p>
    )
  }

  render() {
    const {
      date,
      movies,
      ITEM,
    } = this.props

    const createItem = (item, idx) => (
      <tr key={idx} className="movie-item">
        <td>
          <a href={`/movie?id=${item.movieId}&date=${date}&from=/`}>
            <div className="hd">
              <h3>
                <span className="name">{item[ITEM.name[window.lang]]}</span>
              </h3>
              {this.renderDaysAndBoxoffice(item, ITEM)}
            </div>
          </a>
        </td>
      </tr>
    )

    return (
      <tbody className="movie-items">
        {movies.map(createItem)}
      </tbody>
    )
  }
}

Movie.propTypes = {
  date: React.PropTypes.string.isRequired,
  movies: React.PropTypes.array.isRequired,
  ITEM: React.PropTypes.object.isRequired,
}

export default Movie
