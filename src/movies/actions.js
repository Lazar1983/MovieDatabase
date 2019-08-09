import database from '../database/mysql';

const { con } = database;

function listAllMovies() {
  const listMovies = 'SELECT * FROM movies';
  return new Promise((resolve, reject) => {
    con.query(listMovies, (err, results) => {
      if (err) throw (err);
      resolve(results);
    });
  });
};

const list = async (req, res, next) => {
  try {
    const movies: Array = await listAllMovies();
    res.status(200).send({ success: true, message: 'A list of all movies', body: movies });
  } catch (error) {
    res.status(500).send({ success: false, message: 'internal server error'});
  }
  await next;
}

function getSingleMovie(title) {
  const getMovieByNameQuery = 'SELECT * FROM movies where title = ?';
  return new Promise((resolve, reject) => {
    con.query(getMovieByNameQuery, [title], (err, results) => {
      if (err) throw (err);
      resolve(results);
    });
  });
};

function getMovieLanguage (language) {
  const getMovieByLanguageQuery = 'SELECT * FROM movies WHERE language = ?';
  return new Promise((resolve, reject) => {
    con.query(getMovieByLanguageQuery, [language], (err, results) => {
      if (err) {
        reject (err);
      }
      resolve(results);
    })
  }) 
}

const getMovieByLanguage = async (req, res, next) => {
  const { language } : { language : string } = req.params;
  try {
    const movieLanguage = await getMovieLanguage(language);
    res.status(200).send({ success: true, message: 'your movie search by language is:', body: movieLanguage });
  } catch (error) {
    res.status(500).send({ success: false, message: 'internal server error'});
  }
  await next;
}

const getMovieByName = async (req, res, next) => {
  const { title } : { title : string } = req.params;
  try {
    const movieName = await getSingleMovie(title);
    res.status(200).send({ success: true, message: 'your movie search by title is:', body: movieName });
  } catch (error) {
    res.status(500).send({ success: false, message: 'internal server error'});
  }
  await next;
}

function getMovieByGenrePromise (genre_name) {
  const getMovieByGenreQuery = 'SELECT title FROM movies JOIN genres ON movies.genres_movies_id = genres.id WHERE genre_name = ?';
  return new Promise((resolve, reject) => {
    con.query(getMovieByGenreQuery, [genre_name], (err, results) => {
      if (err) {
        reject (err);
      }
      resolve(results);
    })
  }) 
}

const getMovieByGenre = async (req, res, next) => {
  const { genre_name } : { genre_name : string } = req.params;
  try {
    const movieGenre = await getMovieByGenrePromise (genre_name);
    res.status(200).send({ success: true, message: 'your movie search by genre is:', body: movieGenre });
  } catch (error) {
    res.status(500).send({ success: false, message: 'internal server error'});
  }
  await next;
}

function getMovieByCast (title) {
  const getMovieByCastQuery = 'SELECT first_name, last_name FROM actors JOIN actors_movies ON actors.id = actors_movies.actors_movies_id JOIN movies ON actors_movies.movies_id = movies.id WHERE title = ?';
  return new Promise((resolve, reject) => {
    con.query(getMovieByCastQuery, [title], (err, results) => {
      if (err) {
        reject (err);
      }
      resolve(results);
    })
  }) 
}

const getMoviesCast = async (req, res, next) => {
  const { title } : { title : string } = req.params;
  try {
    const movieCast = await getMovieByCast (title);
    res.status(200).send({ success: true, message: 'your movie search by cast is:', body: movieCast });
  } catch (error) {
    res.status(500).send({ success: false, message: 'internal server error'});
  }
  await next;
}

function getMoviesByRating (rating) {
  const getMovieRatingQuery = 'SELECT * FROM movies WHERE rating > ?';
  return new Promise((resolve, reject) => {
    con.query(getMovieRatingQuery, [Number(rating)], (err, results) => {
      if (err) {
        reject (err);
      }
      resolve(results);
    })
  }) 
}

const getMoviesRating = async (req, res, next) => {
  const { rating } : { rating : string } = req.params;
  try {
    const movieRating = await getMoviesByRating (rating);
    res.status(200).send({ success: true, message: 'your movie search by rating is:', body: movieRating });
  } catch (error) {
    res.status(500).send({ success: false, message: 'internal server error'});
  }
  await next;
}




export default {
  list,
  getMovieByName,
  getMovieByLanguage,
  getMovieByGenre,
  getMoviesCast,
  getMoviesRating
} 