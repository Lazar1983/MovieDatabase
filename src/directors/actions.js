import database from '../database/mysql';

const { con } = database;

function listAllDirectors() {
  const listDirectors = 'SELECT * FROM directors';
  return new Promise((resolve, reject) => {
    con.query(listDirectors, (err, results) => {
      if (err) throw (err);
      resolve(results);
    });
  });
};

const list = async (req, res, next) => {
  try {
    const directors: Array = await listAllDirectors();
    res.status(200).send({ success: true, message: 'A list of all directors', body: directors });
  } catch (error) {
    res.status(500).send({ success: false, message: 'internal server error'});
  }
  await next;
}

function getDirectorByName(first_name) {
  const getDirectorByNameQuery = 'SELECT * FROM directors WHERE first_name=?';
  return new Promise((resolve, reject) => {
    con.query(getDirectorByNameQuery, [first_name],(err, results) => {
      if (err) throw (err);
      resolve(results);
    });
  });
};

const get = async (req, res, next) => {
  const { first_name }: { first_name:string }=req.params;
  try {
    const searchDirectorByName = await getDirectorByName(first_name);
    res.status(200).send({ success: true, message: 'you are searching directors by first name', body: searchDirectorByName });
  } catch (error) {
    res.status(500).send({ success: false, message: 'internal server error'});
  }
  await next;
}

function directorSeries(first_name) {
  const getDirectorSeriesQuery = 'SELECT title FROM series JOIN directors ON series.directors_series_id = directors.id WHERE first_name = ?;';
  return new Promise((resolve, reject) => {
    con.query(getDirectorSeriesQuery, [first_name],(err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

const getDirectorsSeries = async (req, res, next) => {
  const { first_name }: { first_name : string } = req.params;
  try {
    const searchDirectorSeries = await directorSeries(first_name);
    res.status(200).send({ success: true, message: 'Director series', body: searchDirectorSeries });
  } catch (error) {
    res.status(500).send({ success: false, message: 'internal server error'});
  }
  await next;
}

function directorMovies(first_name) {
  const getDirectorMoviesQuery = 'SELECT title FROM movies JOIN directors ON movies.directors_movies_id = directors.id WHERE first_name = ?;';
  return new Promise((resolve, reject) => {
    con.query(getDirectorMoviesQuery, [first_name],(err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

const getDirectorsMovies = async (req, res, next) => {
  const { first_name }: { first_name : string } = req.params;
  try {
    const searchDirectorMovies = await directorMovies(first_name);
    res.status(200).send({ success: true, message: 'Director movies', body: searchDirectorMovies });
  } catch (error) {
    res.status(500).send({ success: false, message: 'internal server error'});
  }
  await next;
}

function directorByBirth(start_date , end_date) {
  const getDirectorBirthQuery = 'SELECT * FROM directors WHERE birth_date > ? AND birth_date < ?';
  return new Promise((resolve, reject) => {
    con.query(getDirectorBirthQuery, [start_date , end_date], (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

const getDirectorsByBirth = async (req, res, next) => {
  const { start_date }: { start_date: string } = req.params;
  const { end_date } : { end_date: string } = req.params;
  try {
    const searchDirectorsByBirthDate = await directorByBirth(start_date , end_date);
    res.status(200).send({ success: true, message: 'Directors by birth_date', body: searchDirectorsByBirthDate });
  } catch (error) {
    res.status(500).send({ success: false, message: 'internal server error'});
  }
  await next;
}



export default {
  list,
  get, 
  getDirectorsSeries,
  getDirectorsMovies,
  getDirectorsByBirth
} 