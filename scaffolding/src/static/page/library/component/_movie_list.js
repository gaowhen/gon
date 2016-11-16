const LANG = {
  cn: {
    movieName: 'name',
    productBasicInfo: 'productBasicInfo',
    productReleaseDate: 'productReleaseDate',
    productWantCount: 'productWantCount',
  },
  en: {
    movieName: 'movieNameEnglish',
    productBasicInfo: 'productBasicInfoEnglish',
    productReleaseDate: 'productReleaseDateEnglish',
    productWantCount: 'productWantCountEnglish',
  },
}

const Lang = LANG[window.lang]

function renderItem(movie, idx) {
  const id = movie.movieId
  const poster = movie.pictureUrl
  const name = movie[Lang.movieName]
  const info = movie[Lang.productBasicInfo]
  const release = movie[Lang.productReleaseDate]
  const count = movie[Lang.productWantCount]

  const item =
    (<li
      key={`item-${idx}`}
      className="item"
    >
      <a href={`/movie?id=${id}&from=/library`}>
        <div className="hd">
          <img className="poster" src={poster} />
        </div>
        <div className="bd">
          <div className="bd-wrap">
            <h3>{name}</h3>
            <p>{info}</p>
            <p>{release}</p>
          </div>
        </div>
        <div className="ft">
          <p>{count}</p>
        </div>
      </a>
    </li>)

  return item
}

const MovieList = (props) =>
  (
    <ul className="list">
      {props.data.map(renderItem)}
    </ul>
  )

MovieList.propTypes = {
  data: React.PropTypes.array.isRequired,
}

export default MovieList
