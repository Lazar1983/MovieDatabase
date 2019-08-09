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

export default {
  list,
  get,
  getActorsBySeriesTitle,
  getSerieByGenre,
  getSeriesByLanguage,
  getSeriesByNumberOfEpisodes,
  getSeriesRating
} 