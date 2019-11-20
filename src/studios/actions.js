import database from '../database/mysql';

const { con } = database;

function listAllStudios() {
  const listStudios = 'SELECT name FROM studio';
  return new Promise((resolve, reject) => {
    con.query(listStudios, (err, results) => {
      if (err) {
        reject(err);
      };
      resolve(results);
    });
  });
};

const listStudios = async (req, res, next) => {
  try {
    const studios: Array = await listAllStudios();
    let studio = [];
    for (let i = 0; i < studios.length; i++) {
      let name = studios[i].name
      studio.push(name);
    }
    res.status(200).send({ success: true, message: 'A list of all studios', body: {studio}  });
  } catch (error) {
    res.status(500).send({ success: false, message: 'internal server error'});
  }
  await next;
}

function getStudioByName(name) {
  const getStudioByNameQuery = 'SELECT * FROM studio WHERE name = ?';
  return new Promise((resolve, reject) => {
    con.query(getStudioByNameQuery, [name],(err, results) => {
      if (err) {
        reject(err);
      };
      resolve(results);
    });
  });
};

const get = async (req, res, next) => {
  const { name } : { name: string } = req.query;
  try {
    const studioName = await getStudioByName(name);
    res.status(200).send({ success: true, message: `your studio search by name ${name}:`, body: studioName });
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
  const { name } : { name: string } = req.query;
  try {
    const studioMovies = await getStudioMoviesPromise(name);
    res.status(200).send({ success: true, message: `your studio search by movie name ${name}:`, body: studioMovies });
  } catch (error) {
    res.status(500).send({ success: false, message: 'internal server error'});
  }
  await next;
}

function worthVaues (worth1, worth2) {
  if (worth1 < worth2) {
    return true;
  } else {
    return false;
  }
}

function getStudioWorthPromise(worth1, worth2) {
  const getStudioWorthQuery = 'SELECT name, worth FROM studio WHERE worth > ? AND worth < ?';
  return new Promise((resolve, reject) => {
    con.query(getStudioWorthQuery, [parseFloat(worth1), parseFloat(worth2)], (err, results) => {
      if (err){
        reject(err);
      };
      resolve(results);
    });
  });
};

const getStudioWorth = async (req, res, next) => {
  const { worth1, worth2 } : { worth1: string, worth2: string } = req.query;
  const checkValues = worthVaues(worth1, worth2);

  if (checkValues === true) {
    try {
      const studioWorth = await getStudioWorthPromise(worth1, worth2);
      res.status(200).send({ success: true, message: `Studio search by worth from ${worth1} to ${worth2}:`, body: studioWorth });
    } catch (error) {
        res.status(500).send({ success: false, message: 'internal server error'});
      }
  } else {
    res.status(404).send({success: false, message: 'The first value must be smaller to get results'})
  }

  await next;
}

export default {
  listStudios,
  get,
  getStudioMovies,
  getStudioWorth
} 