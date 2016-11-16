import request from 'js/util/_request'
import { API } from 'js/util/_api_const'

export const getSearchResult = (name, page = 1, pageSize = 50) => {
  const params = {
    name,
    moviePaging: {
      page,
      pageSize,
    },
    cinemaPaging: {
      page,
      pageSize,
    },
  }

  return request(API.search, params)
}

export const getBoxoffice = (date, {
  sortBy = 'boxofficeRate',
  orderBy = 'desc',
  pageSize = '15',
} = {}) => {
  const indicators = {
    boxofficeRate: 'productBoxOfficeRate',
    scheduleRate: 'productScheduleRate',
    seatRate: 'productTicketSeatRate',
    showTimes: 'productShowTimes',
    ticketSeatRate: 'productSeatsRate',
    avgPrice: 'productAvgPrice',
    avgPerson: 'productAvgPerson',
    tickets: 'productTickets',
  }

  return request(API.boxoffice, {
    movieFilter: {
      scheduleDate: `${date} 00:00:00`,
      sortType: orderBy,
      sortColumn: indicators[sortBy],
    },
    paging: {
      pageSize,
    },
  })
}

export const getAds = (param) => request(API.ads + param, param, false)

export const getBooking = (
  date,
  cityId = ['0'],
  periodType = 0, // 0 - 全时段 1 - 黄金时段 2 - 非黄金时段
  theaterChainId = null,
  sortField = 0,
  page = 1,
  pageSize = 10
) =>
request(API.booking, {
  movieFilter: {
    cityId,
    periodType,
    scheduleDate: `${date} 00:00:00`,
    theaterChainId,
    sortField,
  },
  paging: {
    page,
    pageSize,
  },
})

export const getCinemas = (
  {
    city,
    date,
    period,
    sortBy = 'boxoffice',
    offset = 0,
    orderBy = 'desc',
    count = 200,
  }
) =>
  request(`${API.cinemas}?nocache=${new Date().getTime()}`, {
    city,
    date,
    period,
    sortBy,
    orderBy,
    count,
    offset,
  })

export const getCinemasFav = (
  {
    city,
    date,
    period,
    sortBy = 'boxoffice',
    orderBy = 'desc',
  }
) =>
  request(`${API.cinemasFav}?nocache=${new Date().getTime()}`, {
    city,
    date,
    period,
    sortBy,
    orderBy,
  })

export const cinemasUnFav = (
  ids
) => request(API.cinemasUnFav, {
  ids,
})

export const cinemaFav = (
  id,
  fav,
) => request(API.cinemaFav, {
  id,
  fav,
})

export const getTheater = (
  {
    id,
    date,
  }
) =>
  request(API.theater, {
    id,
    date,
  })

export const getCinemaOperation = (
  {
    id,
    date,
    duration = 7,
    sortBy = 'date',
    orderBy = 'desc',
    offset = 0,
    count = 200,
  }
) => request(API.cinemaOperation, {
  id,
  date,
  duration,
  sortBy,
  orderBy,
  offset,
  count,
})

export const getCinemaMovies = (
  {
    id,
    date,
    sortBy = 'boxoffice',
    orderBy = 'desc',
    offset = 0,
    count = 200,
  }
) => request(API.cinemaMovies, {
  id,
  date,
  sortBy,
  orderBy,
  offset,
  count,
})

export const getTheaterMovies = (
  {
    id,
    date,
    sortBy = 'boxoffice',
    orderBy = 'desc',
    offset = 0,
    count = 200,
  }
) =>
  request(API.theaterMovies, {
    id,
    date,
    sortBy,
    orderBy,
    offset,
    count,
  })
export const getTheaterOperation = ({
  id,
  date,
  duration = 7,
  sortBy = 'date',
  orderBy = 'desc',
  offset = 0,
  count = 200,
}) =>
request(API.theaterOperation, {
  id,
  date,
  duration,
  sortBy,
  orderBy,
  offset,
  count,
})

export const getTheaterCinemas = ({
  id,
  date,
  sortBy = 'boxoffice',
  orderBy = 'desc',
  offset = 0,
  count = 200,
}) =>
request(API.theaterCinemas, {
  id,
  date,
  sortBy,
  orderBy,
  offset,
  count,
})

export const getTheaters = ({
  date,
  sortBy = 'boxoffice',
  orderBy = 'desc',
  offset = 0,
  count = 200,
}) =>
request(API.theaters, {
  date,
  sortBy,
  orderBy,
  offset,
  count,
})

export const sendFeedback = (param) => request(API.feedback, param)

export const getCinema = ({
  id,
  date,
}) =>
  request(API.cinema, {
    id,
    date,
  })

export const getWechatHot = (
  hotType = 'ONE_DAY',
  page = 1,
  pageSize = 10
) =>
request(API.wechatHot, {
  hotType,
  paging: {
    page,
    pageSize,
  },
})

export const getDayRank = (
  date,
  page = 1,
  pageSize = 10
) =>
request(API.dayRank, {
  movieFilter: {
    scheduleDate: `${date} 00:00:00`,
  },
  paging: {
    page,
    pageSize,
  },
})

export const getFirstdayRank = (
  date,
  page = 1,
  pageSize = 10
) =>
request(API.firstdayRank, {
  movieFilter: {
    scheduleDate: `${date} 00:00:00`,
  },
  paging: {
    page,
    pageSize,
  },
})

export const getYearRank = (
  year = 0,
  locality = 'ALL',
  movieType = '',
  festival = '',
  page = 1,
  pageSize = 100
) =>
request(API.yearRank, {
  movieFilter: {
    year: year | 0,
    locality,
    movieType,
    festival,
  },
  paging: {
    page,
    pageSize,
  },
})

export const getComingMovie = (
  type,
  page = 1,
  sortType = 'asce'
) => {
  const sortBy = {
    BY_DATE: 'releaseDate',
    BY_WISH: 'wantCount',
  }

  return request(API.coming, {
    paging: {
      page,
      pageSize: 10,
    },
    movieFilter: {
      sortColumn: sortBy[type],
      sortType,
    },
  })
}

export const getMovieDetail = (
  movieId,
  date,
  cityId = ['0'],
  periodType = 0, // 0 - 全时段 1 - 黄金时段 2 - 非黄金时段
  theaterChainId = null,
  sortColumn = 0,
  showDays = 0,
  page = 1,
  pageSize = 15
) =>
request(API.movieDetail, {
  movieFilter: {
    cityId,
    movieId,
    periodType,
    scheduleDate: `${date}T 00:00:00`,
    theaterChainId,
    showDays,
    sortColumn,
  },
  paging: {
    page,
    pageSize,
  },
})

export const getMoviesSameSchedule = (id, {
  sortBy = 'boxoffice',
  orderBy = 'desc',
  count = 20,
} = {}) =>
request(API.moviesSameSchedule, {
  id,
  sortBy,
  orderBy,
  count,
})

export const getComparisonMovie = (ids, {
  date = Gon.yesterday,
  duration = 7,
} = {}) =>
request(API.comparisonMovie, {
  ids,
  date,
  duration,
})

export const getMapBoxoffice = (movieId = 0) =>
  request(API.mapBoxoffice, { movieId })

export const getHotCity = () =>
  request(API.hotCity, {})

export const getMapFilm = (
    pos = 0,
    movieId = 0
  ) =>
  request(API.mapFilm, {
    pos,
    movieId,
  })

export const getDownLoad = () =>
  request(API.downLoad, {})

export const getMovieBoxofficeDetail = (
  movieId,
  date,
  cityId = ['0'],
  periodType = 0, // 0 - 全时段 1 - 黄金时段 2 - 非黄金时段
  theaterChainId = null,
  sortColumn = 0,
  page = 1,
  pageSize = 20
) =>
request(API.movieBoxofficeDetail, {
  movieFilter: {
    cityId,
    movieId,
    periodType,
    scheduleDate: `${date}T 00:00:00`,
    theaterChainId,
    sortColumn,
  },
  paging: {
    page,
    pageSize,
  },
})

export const getMovieForecast =
  (id, date) =>
  request(API.movieForecast, {
    id,
    date,
  })

export const getMovieTotalForecast = (
    id,
    date,
    count = 15,
  ) =>
  request(API.movieTotalForecast, {
    id,
    date,
    count,
  })

export const getMovieDailySchedule = (
  movieId,
  date,
  page = 1,
  pageSize = 20
) =>
request(API.movieDailySchedule, {
  movieFilter: {
    movieId,
    periodType: 0,
    scheduleDate: `${date}T 00:00:00`,
  },
  paging: {
    page,
    pageSize,
  },
})

export const getForecast = (
  orderBy = 'asce',
  sortBy = 'forecast',
  offset = 0,
  count = 10,
  date = Gon.today
) =>
request(API.forecast, {
  orderBy,
  sortBy,
  offset,
  count,
  date,
})

export const getIndexTrend = (date, {
  lang = 'cn',
  duration = '7',
  orderBy = 'asce',
  sortBy = 'date',
} = {}) => request(API.indexTrend, {
  date,
  lang,
  duration,
  orderBy,
  sortBy,
})

export const getNewsList = (
  category = 0,
  offset = 0,
  count = 10
) =>
request(API.newsList, {
  category,
  offset,
  count,
})

export const getNewsDetail = (id) =>
request(API.newsDetail, { id })
