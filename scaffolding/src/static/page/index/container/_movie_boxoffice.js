import containerCreator from '../container_creator/_movie_boxoffice'
import MovieBoxoffice from '../component/_movie_boxoffice'

function MovieBoxofficeContainer(props) {
  return (
    <MovieBoxoffice { ...props } />
  )
}

export default containerCreator(MovieBoxofficeContainer)
