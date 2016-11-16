import klas from 'classnames'

import LANG from '../_lang'

import Movie from './_movie'
import MovieData from './_movie_data'

const THEAD = {
  boxoffice: {
    cn: '实时票房',
    en: 'Gross',
  },
  boxofficeRate: {
    cn: '票房比',
    en: '<span>Gross</span><span>Share</span>',
  },
  scheduleRate: {
    cn: '排片比',
    en: 'Booking',
  },
  seatRate: {
    cn: '上座率',
    en: '<span>Attn</span><span>Rate</span>',
  },
  showTimes: {
    cn: '场次',
    en: '<span>Show</span><span>Times</span>',
  },
  ticketSeatRate: {
    cn: '排座占比',
    en: '<span>Seat</span><span>Share</span>',
  },
  avgPrice: {
    cn: '均价',
    en: 'Price',
  },
  avgPerson: {
    cn: '均次',
    en: '<span>Attn</span><span>/show</span>',
  },
  tickets: {
    cn: '人次',
    en: 'Admission',
  },
}

const ITEM = {
  name: {
    cn: 'movieName',
    en: 'movieNameEnglish',
  },
  boxoffice: {
    cn: 'productBoxOffice',
    en: 'productBoxOfficeEnglish',
  },
  showdays: {
    cn: 'showDays',
    en: 'showDays',
  },
  gross: {
    cn: 'productTotalBoxOffice',
    en: 'productTotalBoxOfficeEnglish',
  },
  boxofficeRate: {
    cn: 'productBoxOfficeRate',
    en: 'productBoxOfficeRate',
  },
  scheduleRate: {
    cn: 'productScheduleRate',
    en: 'productScheduleRate',
  },
  seatRate: {
    cn: 'productTicketSeatRate',
    en: 'productTicketSeatRate',
  },
  showTimes: {
    cn: 'productShowTimes',
    en: 'productShowTimes',
  },
  ticketSeatRate: {
    cn: 'productSeatsRate',
    en: 'productSeatsRate',
  },
  avgPrice: {
    cn: 'productAvgPrice',
    en: 'productAvgPrice',
  },
  avgPerson: {
    cn: 'productAvgPerson',
    en: 'productAvgPerson',
  },
  tickets: {
    cn: 'productTickets',
    en: 'productTickets',
  },
}

const lang = LANG.Rank

class Rank extends React.Component {
  constructor(props) {
    super(props)

    this.handleReorder = (sortBy) => {
      ga('send', 'event', THEAD[sortBy].cn, 'click', '首页票房', 1)

      this.props.handleReorder(sortBy)

      sessionStorage.setItem(window.IndexCachekeyFilterSortBy, sortBy)
    }
  }

  renderThead({
    indicators,
    sortBy,
  }) {
    const createThead = (item) => {
      const thClass = klas('thead-item', {
        on: item === sortBy,
        hide: !indicators[item],
      })

      return (
        <th
          key={item}
          className={thClass}
          onClick={() => this.handleReorder(item)}
        >
          <span
            className="text"
            dangerouslySetInnerHTML={{ __html: THEAD[item][window.lang] }}
          >
          </span>
          <i className="icon-down"></i>
        </th>
      )
    }

    return (
      <thead>
        <tr>
          {Object.keys(THEAD).map(createThead)}
        </tr>
      </thead>
    )
  }

  render() {
    const {
      date,
      movies,
      sortBy,
      fix,
      indicators,
      onClickMore,
    } = this.props

    let indicatorCount = 0
    for (const indicator in indicators) {
      if (indicators[indicator]) {
        indicatorCount++
      }
    }

    const tableWidth = { width: `${indicatorCount * 100 / 4}%` }
    const wrapClass = klas('c-rank', { fix })

    return (
      <div className={wrapClass}>
        <div className="movie-title">
          <table>
            <thead>
              <tr>
                <th>
                  {lang.rank}
                  <a
                    className="more"
                    onClick={() => onClickMore(true)}
                  >
                    +{lang.more}
                  </a>
                </th>
              </tr>
            </thead>
            <Movie
              date={date}
              movies={movies}
              ITEM={ITEM}
            />
          </table>
        </div>
        <div className="movie-data">
          <table style={tableWidth}>
            {this.renderThead({ sortBy, indicators })}
            <MovieData
              date={date}
              THEAD={THEAD}
              movies={movies}
              indicators={indicators}
            />
          </table>
        </div>
      </div>
    )
  }
}

Rank.propTypes = {
  date: React.PropTypes.string.isRequired,
  movies: React.PropTypes.array.isRequired,
  sortBy: React.PropTypes.string.isRequired,
  fix: React.PropTypes.bool.isRequired,
  indicators: React.PropTypes.object.isRequired,
  handleReorder: React.PropTypes.func.isRequired,
  onClickMore: React.PropTypes.func.isRequired,
}

export default Rank
