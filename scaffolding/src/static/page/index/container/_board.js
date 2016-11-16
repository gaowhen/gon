import containerCreator from '../container_creator/_board'
import Board from '../component/_board'

function BoardContainer(props) {
  return (
    <Board
      {...props}
    />
  )
}

export default containerCreator(BoardContainer)
