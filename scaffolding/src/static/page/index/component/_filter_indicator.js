import klas from 'classnames'

import LANG from '../_lang'

const MIN_INDICATOR_COUNT = 4

class FilterIndicator extends React.Component {
  constructor(props) {
    super(props)

    const {
      indicators,
    } = props

    const filters = { ...indicators }

    this.state = {
      isSelectionValid: true,
      filters,
    }

    const validCount = (filters) => {
      let count = 0

      Object.keys(filters).forEach((k) => {
        if (filters[k]) {
          count++
        }
      })

      return count
    }

    this.selectColumn = (column) => {
      const f = { ...this.state.filters }
      f[column] = !f[column]

      this.setState({
        isSelectionValid: validCount(f) >= MIN_INDICATOR_COUNT,
        filters: f,
      })
    }

    this.selectFinish = (finish) => {
      const {
        changeFilterToUpdate,
        toggleTableGuide,
        toggleIndicatorFilter,
      } = this.props

      const filters = this.state.filters

      if (!finish) {
        toggleIndicatorFilter(false)
      }

      if (finish && this.state.isSelectionValid) {
        let firstValidFilter
        for (const filter in filters) {
          if (filters[filter]) {
            firstValidFilter = filter
            break
          }
        }

        changeFilterToUpdate({
          indicators: filters,
          sortBy: firstValidFilter,
        })

        toggleIndicatorFilter(false)

        if (validCount(filters) > MIN_INDICATOR_COUNT &&
            !localStorage.getItem('indexMovieDataGuide')) {
          toggleTableGuide(true)
        }

        sessionStorage.setItem(window.IndexCachekeyFilterSortBy, firstValidFilter)
        sessionStorage.setItem(window.IndexCachekeyFilterIndicator, JSON.stringify(filters))
      }
    }
  }

  renderColumns() {
    const createColumn = (key) => {
      const thead = LANG.Indicators
      const columnClass = klas('column', {
        on: this.state.filters[key],
      })

      return (
        <li
          key={key}
          className={columnClass}
          onClick={() => this.selectColumn(key)}
        >
          {thead[key]}
        </li>
      )
    }

    return (
      <ul>
        {Object.keys(this.state.filters).map(createColumn)}
      </ul>
    )
  }

  render() {
    const {
      showIndicatorFilter,
      toggleIndicatorFilter,
    } = this.props

    const lang = LANG.FilterIndicator

    const movieFilterClass = klas('c-filter-indicator', {
      on: showIndicatorFilter,
    })
    const filterChangeClass = klas('filterChange', {
      disabled: !this.state.isSelectionValid,
    })

    return (
      <div className={movieFilterClass}>
        <div className="filter-bg" onClick={() => toggleIndicatorFilter(false)}></div>
        <div className="selectors">
          <div className="title">
            {lang.more}
            <a
              className="close"
              onClick={() => this.selectFinish(false)}
            >
              {lang.close}
            </a>
          </div>
          {this.renderColumns()}
          <p>
            <i className="icon-point">!</i>
            {lang.desc}
          </p>
          <a className={filterChangeClass} onClick={() => this.selectFinish(true)}>
            {lang.confirm}
          </a>
        </div>
      </div>
    )
  }
}

FilterIndicator.propTypes = {
  showIndicatorFilter: React.PropTypes.bool.isRequired,
  indicators: React.PropTypes.object.isRequired,
  changeFilterToUpdate: React.PropTypes.func.isRequired,
  toggleIndicatorFilter: React.PropTypes.func.isRequired,
  toggleTableGuide: React.PropTypes.func.isRequired,
}

export default FilterIndicator
