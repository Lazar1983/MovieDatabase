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

function createSingleMovie(title, length, release_date, rating, language, directors_id, studio_id) {
  const createNewMovie = 'INSERT INTO movies (title, length, release_date, rating, language, directors_id, studio_id) VALUES (?,?,?,?,?,?,?)';
  return new Promise((resolve, reject) => {
    con.query(createNewMovie, [title, length, release_date, rating, language, directors_id, studio_id], (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};



const createMovie = async (req, res, next) => {
  const {
    title,
    length,
    release_date, 
    rating,
    language,
    directors_id,
    studio_id
  }: {
    title: string,
    length: string,
    release_date: string,
    rating: string,
    language: string,
    directors_id: number,
    studio_id: number
  } = req.body;
  
  try {
    const newMovie = await createSingleMovie (title, length, release_date, rating, language, directors_id, studio_id);
    res.status(201).send({ success: true, message: 'Created new movie', body: {title, length, release_date, rating, language, directors_id, studio_id} });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Server error'});
  }
  await next;
}



export default {
  list,
  createMovie
} 