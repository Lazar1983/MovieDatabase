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

function searchActorsByName (fName, lName) {
  const getActorsByNameQuery = `SELECT * FROM actors WHERE first_name AS ${fName} = ? OR last_name AS ${lName} = ?`;
  return new Promise((resolve, reject) => {
    con.query(getActorsByNameQuery, [fName, lName], (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

const getActorsByName = async (req, res, next) => {
    let fName = req.query.fName;
    let lName = req.query.lName;
  try {
    const searchActorByName = await searchActorsByName(fName, lName);
    console.log(searchActorByName)
    res.status(200).send({ success: true, message: `Your searching actor by name :`, body: searchActorByName });
  } catch (error) {
    res.status(500).send({ success: false, message: 'internal server error'});
  }
  
  await next;
}

function actorsByMovieTitle (first_name) {
  const getActorsMoviesQuery = 'SELECT title, length, release_date, rating, language FROM movies JOIN actors_movies ON movies.id = actors_movies.movies_id JOIN actors ON actors_movies.actors_movies_id = actors.id WHERE first_name = ?';
  return new Promise((resolve, reject) => {
    con.query(getActorsMoviesQuery, [first_name], (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

const getActorsByMovieTitle = async (req, res, next) => {
  const { first_name }: { first_name : string } = req.params;
  try {
    const searchActorMovies = await actorsByMovieTitle(first_name);
    res.status(200).send({ success: true, message: `${first_name} movies is:`, body: searchActorMovies });
  } catch (error) {
    res.status(500).send({ success: false, message: 'internal server error'});
  }
  await next;
}


function getSeriesCastPromise(first_name) {
  const getSeriesCastQuery = 'SELECT title, language, release_date, episodes, rating FROM series JOIN actors_series ON series.id = actors_series.series_id JOIN actors ON actors_series.actors_series_id = actors.id WHERE first_name = ?';
  return new Promise((resolve, reject) => {
    con.query(getSeriesCastQuery, [first_name],(err, results) => {
      if (err) throw (err);
      resolve(results);
    });
  });
};

const getSeriesCast = async (req, res, next) => {
  const { first_name }: { first_name: string } = req.params;
  try {
    const seriesCast = await getSeriesCastPromise(first_name);
    res.status(200).send({ success: true, message: 'you are searching series by first name', body: seriesCast });
  } catch (error) {
    res.status(500).send({ success: false, message: 'internal server error'});
  }
  await next;
}

function getActorsByDate(fromDate, toDate) {
  const getActorsByDate = `SELECT * FROM actors WHERE birth_date > ? AND birth_date < ?`;
  return new Promise((resolve, reject) => {
    con.query(getActorsByDate, [fromDate, toDate], (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

const getActorsByDateOfBirth = async (req, res, next) => {
  const { fromDate }: { fromDate: string } = req.params;
  const { toDate }: { toDate: string } = req.params;
  try {
    const actorsByDate = await getActorsByDate (fromDate, toDate);
    res.status(200).send({ success: true, message: 'you are searching actors by birth date', body: actorsByDate });
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