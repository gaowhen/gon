import FilterPeriod from './_period'
import DatePicker from './_date_picker'
import FilterCityTheater from './city_theater/_city_theater'

export default function FilterGroupA(props) {
  const {
    date,
    period,
    source,
    type,
    title,
    scrollHeight,
    limit,
    validFrom, // 从哪一天开始可以点击
    onChangeCity,
    onChangeTheater,
    onChangePeriod,
    onChangeDate,
  } = props

  return (
    <div className="g-c-filter-group-a">
      <FilterCityTheater
        type={type}
        title={title}
        height={scrollHeight}
        source={source}
        onChangeCity={onChangeCity}
        onChangeTheater={onChangeTheater}
      />
      <DatePicker
        date={date}
        isShowSwitch={false}
        source={source}
        limit={limit}
        validFrom={validFrom}
        onChangeDate={onChangeDate}
      />
      <FilterPeriod
        period={period}
        source={source}
        onChangePeriod={onChangePeriod}
      />
    </div>
  )
}

FilterGroupA.propTypes = {
  date: React.PropTypes.string.isRequired,
  period: React.PropTypes.number.isRequired,
  source: React.PropTypes.string.isRequired,
  type: React.PropTypes.string,
  title: React.PropTypes.string,
  limit: React.PropTypes.number,
  validFrom: React.PropTypes.string,
  scrollHeight: React.PropTypes.number,
  isShowOtherCity: React.PropTypes.bool,
  isShowNationTheater: React.PropTypes.bool,
  onChangePeriod: React.PropTypes.func.isRequired,
  onChangeCity: React.PropTypes.func.isRequired,
  onChangeTheater: React.PropTypes.func.isRequired,
  onChangeDate: React.PropTypes.func.isRequired,
}
