const LANG = {
  cn: {
    release: '日期',
    count: '想看',
  },
  en: {
    release: 'Release Date',
    count: 'Wanna See',
  },
}

const Lang = LANG[window.lang]

const Filter = (props) => (
  <ul className="filter">
    <li
      className={props.filter === 'BY_DATE' ? 'on' : ''}
      onClick={() => props.onClick('BY_DATE', 'asce')}
    >
      {Lang.release}
    </li>
    <li
      className={props.filter === 'BY_WISH' ? 'on' : ''}
      onClick={() => props.onClick('BY_WISH', 'desc')}
    >
      {Lang.count}
    </li>
  </ul>
)

Filter.propTypes = {
  filter: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func.isRequired,
}

export default Filter
