import database from '../database/mysql';

const { con } = database;

function listAllActors() {
  const listActors = 'SELECT * FROM actors';
  return new Promise((resolve, reject) => {
    con.query(listActors, (err, results) => {
      if (err) throw (err);
      resolve(results);
    });
  });
};

const listOfAllActors = async (req, res, next) => {
  try {
    const actors: Array = await listAllActors();
    res.status(200).send({ success: true, message: 'A list of all actors:', body: actors });
  } catch (error) {
      res.status(500).send({ success: false, message: 'internal server error'});
    }
  await next;
}

function searchActorsByName (name) {
  const getActorsByNameQuery = `SELECT first_name, last_name, birth_date FROM actors WHERE first_name = ? OR last_name = ?`;
  return new Promise((resolve, reject) => {
    con.query(getActorsByNameQuery, [name, name], (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

const getActorsByName = async (req, res, next) => {
  const { name } : { name: string } = req.params;
  try {
    const searchActorByName = await searchActorsByName(name);
    res.status(200).send({ success: true, message: `Your searching actor by ${name} :`, body: searchActorByName });
  } catch (error) {
    res.status(500).send({ success: false, message: 'internal server error'});
  }
  
  await next;
}

function actorsByMovieTitle (name) {
  const getActorsMoviesQuery = 'SELECT title FROM movies JOIN actors_movies ON movies.id = actors_movies.movies_id JOIN actors ON actors_movies.actors_movies_id = actors.id WHERE first_name = ? OR last_name = ?';
  return new Promise((resolve, reject) => {
    con.query(getActorsMoviesQuery, [name, name], (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

const getActorsByMovieTitle = async (req, res, next) => {
  const { name }: { name : string } = req.params;
  try {
    const searchActorMovies = await actorsByMovieTitle(name);
    res.status(200).send({ success: true, message: `${name} acting movies is:`, body: searchActorMovies });
  } catch (error) {
    res.status(500).send({ success: false, message: 'internal server error'});
  }
  await next;
}

function getSeriesCastPromise(name) {
  const getSeriesCastQuery = 'SELECT title FROM series JOIN actors_series ON series.id = actors_series.series_id JOIN actors ON actors_series.actors_series_id = actors.id WHERE first_name = ? OR last_name = ?';
  return new Promise((resolve, reject) => {
    con.query(getSeriesCastQuery, [name, name],(err, results) => {
      if (err) {
        reject(err)
      };
      resolve(results);
    });
  });
};

const getSeriesCast = async (req, res, next) => {
  const { name }: { name: string } = req.params;
  try {
    const seriesCast = await getSeriesCastPromise(name);
    res.status(200).send({ success: true, message: `${name} acting series is:`, body: seriesCast });
  } catch (error) {
    res.status(500).send({ success: false, message: 'internal server error'});
  }
  await next;
}

function getActorsByDate(date) {
  const getActorsByDate = `SELECT * FROM actors WHERE birth_date > ? AND birth_date < ?`;
  return new Promise((resolve, reject) => {
    con.query(getActorsByDate, [date, date], (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

const getActorsByDateOfBirth = async (req, res, next) => {
  const { date }: { date: string } = req.query;
  try {
    const actorsByDate = await getActorsByDate (date);
    res.status(200).send({ success: true, message: `Your searching actors by ${date} to ${date}`, body: actorsByDate });
  } catch (error) {
    res.status(500).send({ success: false, message: 'internal server error'});
  }
  await next;
}

export default {
  listOfAllActors,
  getActorsByName,
  getActorsByMovieTitle,
  getSeriesCast,
  getActorsByDateOfBirth
} 