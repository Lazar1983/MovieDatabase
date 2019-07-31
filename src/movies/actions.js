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



export default {
  list
} 