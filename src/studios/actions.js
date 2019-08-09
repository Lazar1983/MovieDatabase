import database from '../database/mysql';

const { con } = database;

function listAllStudios() {
  const listStudios = 'SELECT * FROM studio';
  return new Promise((resolve, reject) => {
    con.query(listStudios, (err, results) => {
      if (err) throw (err);
      resolve(results);
    });
  });
};

const list = async (req, res, next) => {
  try {
    const studios: Array = await listAllStudios();
    res.status(200).send({ success: true, message: 'A list of all studios', body: studios });
  } catch (error) {
    res.status(500).send({ success: false, message: 'internal server error'});
  }
  await next;
}

function getStudioByName(name) {
  const getStudioByNameQuery = 'SELECT * FROM studio WHERE name = ?';
  return new Promise((resolve, reject) => {
    con.query(getStudioByNameQuery, [name],(err, results) => {
      if (err) throw (err);
      resolve(results);
    });
  });
};

const get = async (req, res, next) => {
  const { name } : { name: string } = req.params;
  try {
    const studioName = await getStudioByName(name);
    res.status(200).send({ success: true, message: 'your studio search by title is:', body: studioName });
  } catch (error) {
    res.status(500).send({ success: false, message: 'internal server error'});
  }
  await next;
}

function getStudioMoviesPromise(name) {
  const getStudioMoviesQuery = 'SELECT title, length, rating FROM movies JOIN studio ON movies.studio_id = studio.id WHERE name = ?';
  return new Promise((resolve, reject) => {
    con.query(getStudioMoviesQuery, [name], (err, results) => {
      if (err) throw (err);
      resolve(results);
    });
  });
};

const getStudioMovies = async (req, res, next) => {
  const { name } : { name: string } = req.params;
  try {
    const studioMovies = await getStudioMoviesPromise(name);
    res.status(200).send({ success: true, message: 'your studio search by movies is:', body: studioMovies });
  } catch (error) {
    res.status(500).send({ success: false, message: 'internal server error'});
  }
  await next;
}

function getStudioWorthPromise(worth) {
  const getStudioWorthQuery = 'SELECT * FROM studio WHERE worth > ?';
  return new Promise((resolve, reject) => {
    con.query(getStudioWorthQuery, [worth], (err, results) => {
      if (err) throw (err);
      resolve(results);
    });
  });
};

const getStudioWorth = async (req, res, next) => {
  const { worth } : { worth: string } = req.params;
  try {
    const studioWorth = await getStudioWorthPromise(worth);
    res.status(200).send({ success: true, message: 'Studio search by worth is:', body: studioWorth });
  } catch (error) {
    res.status(500).send({ success: false, message: 'internal server error'});
  }
  await next;
}


export default {
  list,
  get,
  getStudioMovies,
  getStudioWorth
} 