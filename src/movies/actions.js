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
    con.query(getMovieByNameQuery, [title],(err, results) => {
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
  const { title } : { title : string} = req.params;
  try {
    const movieName = await getSingleMovie(title);
    res.status(200).send({ success: true, message: 'your movie search by title is:', body: movieName });
  } catch (error) {
    res.status(500).send({ success: false, message: 'internal server error'});
  }
  await next;
}








export default {
  list,
  getMovieByName,
  getMovieByLanguage
} 