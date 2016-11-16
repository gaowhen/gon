import klas from 'classnames'

function getMovieDataRate(movie) {
  return {
    boxoffice: movie.productBoxOffice,
    boxofficeRate: movie.productBoxOfficeRate,
    scheduleRate: movie.productScheduleRate,
    seatRate: movie.productTicketSeatRate,
    showTimes: movie.productShowTimes,
    ticketSeatRate: movie.productSeatsRate,
    avgPrice: movie.productAvgPrice,
    avgPerson: movie.productAvgPerson,
    tickets: movie.productTickets,
  }
}

function renderMovieData({
  THEAD,
  indicators,
  item,
}) {
  const createRow = (key) => {
    const tdClass = klas('chart-item', {
      hide: !indicators[key],
      boxoffice: key === 'boxoffice',
    })

    const movieDataRate = getMovieDataRate(item)
    let rate
    if (window.lang === 'en' && key === 'boxoffice') {
      rate = item.productBoxOfficeEnglish
    } else {
      rate = movieDataRate[key]
    }

    const unit = window.lang === 'cn' && key === 'boxoffice' ? '万' : null

    return (
      <td key={key} className={tdClass}>
        <p className="rate">
          {rate}{key.match(/Rate/g) ? '%' : ''}{unit}
        </p>
      </td>
    )
  }

  return Object.keys(THEAD).map(createRow)
}

function MovieData(props) {
  const {
    date,
    movies,
    indicators,
    THEAD,
  } = props

  const createData = (item, idx) => {
    const href = `movie?id=${item.movieId}&date=${date}&from=/`

    return (
      <tr key={idx} onClick={() => {window.location = href}}>
        {renderMovieData({ indicators, THEAD, item })}
      </tr>
    )
  }

  return (
    <tbody className="movie-items">
      {movies.map(createData)}
    </tbody>
  )
}

MovieData.propTypes = {
  date: React.PropTypes.string.isRequired,
  movies: React.PropTypes.array.isRequired,
  indicators: React.PropTypes.object.isRequired,
  THEAD: React.PropTypes.object.isRequired,
}

export default MovieData
