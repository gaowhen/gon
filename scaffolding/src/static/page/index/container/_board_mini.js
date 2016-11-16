import containerCreator from '../container_creator/_board'
import BoardMini from '../component/_board_mini'

function BoardMiniContainer(props) {
  return (
    <BoardMini
      {...props}
    />
  )
}

export default containerCreator(BoardMiniContainer)
