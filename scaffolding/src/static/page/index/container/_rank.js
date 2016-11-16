import containerCreator from '../container_creator/_rank'
import Rank from '../component/_rank'

function RankContainer(props) {
  return (
    <Rank
      {...props}
    />
  )
}

export default containerCreator(RankContainer)
