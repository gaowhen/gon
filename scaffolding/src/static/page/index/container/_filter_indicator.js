import containerCreator from '../container_creator/_filter_indicator'
import FilterIndicator from '../component/_filter_indicator'
import TableGuide from '../component/_table_guide'

function FilterIndicatorContainer(props) {
  return (
    <div>
      <FilterIndicator { ...props } />
      <TableGuide { ...props } />
    </div>
  )
}

export default containerCreator(FilterIndicatorContainer)
