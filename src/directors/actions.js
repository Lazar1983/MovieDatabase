import database from '../database/mysql';

const { con } = database;

function listAllDirectors() {
  const listDirectors = 'SELECT * FROM directors';
  return new Promise((resolve, reject) => {
    con.query(listDirectors, (err, results) => {
      if (err) {
        reject(err);
      };
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

function getDirectorByName(name) {
  const getDirectorByNameQuery = 'SELECT first_name, last_name, birth_date FROM directors WHERE first_name=? OR last_name=?';
  return new Promise((resolve, reject) => {
    con.query(getDirectorByNameQuery, [name, name],(err, results) => {
      if (err) {
        reject(err);
      };
      resolve(results);
    });
  });
};

const getDirectosByNames = async (req, res, next) => {
  const { name }: { name : string }=req.params;
  try {
    const searchDirectorByName = await getDirectorByName(name);
    res.status(200).send({ success: true, message: `Your searching directors by name ${name} is`, body: searchDirectorByName });
  } catch (error) {
    res.status(500).send({ success: false, message: 'internal server error'});
  }
  await next;
}

function directorSeries(name) {
  const getDirectorSeriesQuery = 'SELECT title FROM series JOIN directors ON series.directors_series_id = directors.id WHERE first_name = ? or last_name = ?;';
  return new Promise((resolve, reject) => {
    con.query(getDirectorSeriesQuery, [name, name],(err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

const getDirectorsSeries = async (req, res, next) => {
  const { name }: { name : string } = req.params;
  try {
    const searchDirectorSeries = await directorSeries(name);
    res.status(200).send({ success: true, message: `Director series by name ${name}`, body: searchDirectorSeries });
  } catch (error) {
    res.status(500).send({ success: false, message: 'internal server error'});
  }
  await next;
}

function directorMovies(name) {
  const getDirectorMoviesQuery = 'SELECT title FROM movies JOIN directors ON movies.directors_movies_id = directors.id WHERE first_name = ? OR last_name = ?';
  return new Promise((resolve, reject) => {
    con.query(getDirectorMoviesQuery, [name, name],(err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

const getDirectorsMovies = async (req, res, next) => {
  const { name }: { name : string } = req.params;
  try {
    const searchDirectorMovies = await directorMovies(name);
    res.status(200).send({ success: true, message: `Director movies by name:${name}`, body: searchDirectorMovies });
  } catch (error) {
    res.status(500).send({ success: false, message: 'internal server error'});
  }
  await next;
}

function directorByBirth(start_date , end_date) {
  const getDirectorBirthQuery = 'SELECT first_name, last_name, birth_date FROM directors WHERE birth_date > ? AND birth_date < ?';
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
    res.status(200).send({ success: true, message: `Directors by birth_date from ${start_date} to ${end_date}`, body: searchDirectorsByBirthDate });
  } catch (error) {
    res.status(500).send({ success: false, message: 'internal server error'});
  }
  await next;
}



export default {
  list,
  getDirectosByNames, 
  getDirectorsSeries,
  getDirectorsMovies,
  getDirectorsByBirth
} 