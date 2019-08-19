import database from '../database/mysql';

const { con } = database;

function listAllSeries() {
  const listSeries = 'SELECT * FROM series';
  return new Promise((resolve, reject) => {
    con.query(listSeries, (err, results) => {
      if (err) throw (err);
      resolve(results);
    });
  });
};

const list = async (req, res, next) => {
  try {
    const series: Array = await listAllSeries();
    res.status(200).send({ success: true, message: 'A list of all series', body: series });
  } catch (error) {
    res.status(500).send({ success: false, message: 'internal server error'});
  }
  await next;
}

function getSingleSeries(title) {
  const getSeriesTitleQuery = 'SELECT * FROM series WHERE title=?';
  return new Promise((resolve, reject) => {
    con.query(getSeriesTitleQuery, [title],(err, results) => {
      if (err) throw (err);
      resolve(results);
    });
  });
};

const get = async (req, res, next) => {
  const { title }: { title:string }=req.params;
  try {
    const seriesTitle = await getSingleSeries(title);
    res.status(200).send({ success: true, message: 'you are searching series by title', body: seriesTitle });
  } catch (error) {
    res.status(500).send({ success: false, message: 'internal server error'});
  }
  await next;
}

function actorsBySerieTitle (title) {
  const getActorsSerieQuery = 'SELECT first_name, last_name FROM actors JOIN actors_series ON actors.id = actors_series.actors_series_id JOIN series ON actors_series.series_id = series.id WHERE title=?';
  return new Promise((resolve, reject) => {
    con.query(getActorsSerieQuery, [title], (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

const getActorsBySeriesTitle = async (req, res, next) => {
  const { title }: { title : string } = req.params;
  try {
    const searchActorSerie = await actorsBySerieTitle(title);
    res.status(200).send({ success: true, message: `${title} movies is:`, body: searchActorSerie });
  } catch (error) {
    res.status(500).send({ success: false, message: 'internal server error'});
  }
  await next;
}

function getSerieByGenrePromise (genre_name) {
  const getSerieByGenreQuery = 'SELECT title FROM series JOIN genres ON series.genres_series_id = genres.id WHERE genre_name = ?';
  return new Promise((resolve, reject) => {
    con.query(getSerieByGenreQuery, [genre_name], (err, results) => {
      if (err) {
        reject (err);
      }
      resolve(results);
    })
  }) 
}

const getSerieByGenre = async (req, res, next) => {
  const { genre_name } : { genre_name : string } = req.params;
  try {
    const serieGenre = await getSerieByGenrePromise (genre_name);
    res.status(200).send({ success: true, message: 'your serie search by genre is:', body: serieGenre });
  } catch (error) {
    res.status(500).send({ success: false, message: 'internal server error'});
  }
  await next;
}

function getSeriesLanguage (language) {
  const getSeriesByLanguageQuery = 'SELECT * FROM series WHERE language = ?';
  return new Promise((resolve, reject) => {
    con.query(getSeriesByLanguageQuery, [language], (err, results) => {
      if (err) {
        reject (err);
      }
      resolve(results);
    })
  }) 
}

const getSeriesByLanguage = async (req, res, next) => {
  const { language } : { language : string } = req.params;
  try {
    const movieLanguage = await getSeriesLanguage(language);
    res.status(200).send({ success: true, message: 'your movie search by language is:', body: movieLanguage });
  } catch (error) {
    res.status(500).send({ success: false, message: 'internal server error'});
  }
  await next;
}



function getSeriesEpisodes (episodes) {
  const getSeriesByEpisodesQuery = 'SELECT title,episodes FROM series WHERE episodes > ?';
  return new Promise((resolve, reject) => {
    con.query(getSeriesByEpisodesQuery, [episodes], (err, results) => {
      if (err) {
        reject (err);
      }
      resolve(results);
    })
  }) 
}

const getSeriesByNumberOfEpisodes = async (req, res, next) => {
  const { episodes } : { episodes : string } = req.params;
  try {
    const seriesEpisodes = await getSeriesEpisodes(episodes);
    res.status(200).send({ success: true, message: 'number of series episodes:', body: seriesEpisodes });
  } catch (error) {
    res.status(500).send({ success: false, message: 'internal server error'});
  }
  await next;
}

function getSeriesByRating (rating) {
  const getSeriesRatingQuery = 'SELECT * FROM series WHERE rating > ?';
  return new Promise((resolve, reject) => {
    con.query(getSeriesRatingQuery, [rating], (err, results) => {
      if (err) {
        reject (err);
      }
      resolve(results);
    })
  }) 
}

const getSeriesRating = async (req, res, next) => {
  const { rating } : { rating : string } = req.params;
  try {
    const seriesRating = await getSeriesByRating (rating);
    res.status(200).send({ success: true, message: 'your series search by rating is:', body: seriesRating });
  } catch (error) {
    res.status(500).send({ success: false, message: 'internal server error'});
  }
  await next;
}

function seriesDate(start_date, end_date) {
  const getSeriesByDateQuery = 'SELECT * FROM series WHERE release_date > ? AND release_date < ?';
  return new Promise((resolve, reject) => {
    con.query(getSeriesByDateQuery, [start_date , end_date], (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

const getSeriesByReleaseDate = async (req, res, next) => {
  const { start_date }: { start_date: string } = req.params;
  const { end_date } : { end_date: string } = req.params;
  try {
    const searchSeriesByReleaseDate = await seriesDate(start_date, end_date);
    res.status(200).send({ success: true, message: 'Series by release date', body: searchSeriesByReleaseDate });
  } catch (error) {
    res.status(500).send({ success: false, message: 'internal server error'});
  }
  await next;
}

function seriesEpisode(start_count, end_count) {
  const numberOfEpisodes = 'SELECT * FROM series WHERE episodes > ? AND episodes < ?';
  return new Promise((resolve, reject) => {
    con.query(numberOfEpisodes, [start_count, end_count], (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

const seriesByEpisodesCount = async (req, res, next) => {
  const { start_count }: { start_count: string } = req.params;
  const { end_count } : { end_count: string } = req.params;
  try {
    const seriesByEpisodeCount = await seriesEpisode(start_count, end_count);
    res.status(200).send({ success: true, message: 'Series by release date', body: seriesByEpisodeCount });
  } catch (error) {
    res.status(500).send({ success: false, message: 'internal server error'});
  }
  await next;
}


export default {
  list,
  get,
  getActorsBySeriesTitle,
  getSerieByGenre,
  getSeriesByLanguage,
  getSeriesByNumberOfEpisodes,
  getSeriesRating,
  getSeriesByReleaseDate,
  seriesByEpisodesCount
} 