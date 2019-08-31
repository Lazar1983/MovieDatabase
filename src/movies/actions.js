import database from '../database/mysql';

const { con } = database;


function listAllMovies() {
  const listMovies = 'SELECT title FROM movies';
  return new Promise((resolve, reject) => {
    con.query(listMovies, (err, results) => {
      if (err) {
        reject(err);
      };
      resolve(results);
    });
  });
};

const list = async (req, res, next) => {
  try {
    const movies: Array = await listAllMovies();
    let movie = [];
    for (let i = 0; i < movies.length; i++) {
      let title = movies[i].title;
      movie.push(title);
    }
    res.status(200).send({ success: true, message: 'A list of all movies', body: {movie} });
  } catch (error) {
    res.status(500).send({ success: false, message: 'internal server error'});
  }
  await next;
}

function getSingleMovie(title) {
  const getMovieByNameQuery = 'SELECT * FROM movies WHERE title = ?';
  return new Promise((resolve, reject) => {
    con.query(getMovieByNameQuery, [title], (err, results) => {
      if (err) {
        reject(err)
      };
      resolve(results);
    });
  });
};

function getStudioMovies(name) {
  const getStudioMoviesQuery = 'SELECT title, name, genre_name FROM movies JOIN studio ON movies.studio_id = studio.id JOIN genres ON movies.genres_movies_id = genres.id WHERE title = ?';
  return new Promise((resolve, reject) => {
    con.query(getStudioMoviesQuery, name, (err, results) => {
      if (err) {
        reject(err);
      };
      resolve(results);
    });
  });
};

const getMovieByName = async (req, res, next) => {
  const { name } : { name : string } = req.params;
 
  try {
    const movieName = await getStudioMovies(name);
    res.status(200).send({ success: true, message: `your movie search by title ${name} is:`, body: movieName });
  } catch (error) {
    res.status(500).send({ success: false, message: 'internal server error'});
  }
  await next;
}

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
    res.status(200).send({ success: true, message: `your movie search by ${language} is:`, body: movieLanguage });
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

function getMoviesByLength (length1, length2) {
  const getMovieLengthQuery = 'SELECT title, length FROM movies WHERE length > ? AND length < ?';
  return new Promise((resolve, reject) => {
    con.query(getMovieLengthQuery, [length1, length2], (err, results) => {
      if (err) {
        reject (err);
      }
      resolve(results);
    })
  }) 
}

const getMoviesLength = async (req, res, next) => {
  const { length1 } : { length1 : string } = req.params;
  const { length2 } : { length2 : string } = req.params;
  try {
    const movieLength = await getMoviesByLength (length1, length2);
    res.status(200).send({ success: true, message: `your movie search by length ${length1} minutes and ${length2} minutes is:`, body: movieLength });
  } catch (error) {
    res.status(500).send({ success: false, message: 'internal server error'});
  }
  await next;
}

function moviesDate(start_date, end_date) {
  const getMovieByDateQuery = 'SELECT * FROM movies WHERE release_date > ? AND release_date < ?';
  return new Promise((resolve, reject) => {
    con.query(getMovieByDateQuery, [start_date , end_date], (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

const getMoviesByReleaseDate = async (req, res, next) => {
  const { start_date }: { start_date: string } = req.params;
  const { end_date } : { end_date: string } = req.params;
  try {
    const searchMoviesByReleaseDate = await moviesDate(start_date, end_date);
    res.status(200).send({ success: true, message: `Movies by release date from ${start_date} to ${end_date}`, body: searchMoviesByReleaseDate });
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
  getMoviesRating,
  getMoviesLength,
  getMoviesByReleaseDate
} 