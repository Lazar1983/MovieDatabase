import database from '../database/mysql';

const { con } = database;

function listAllGenres() {
  const listGenres = 'SELECT genre_name FROM genres';
  return new Promise((resolve, reject) => {
    con.query(listGenres, (err, results) => {
      if (err) {
        reject(err);
      };
      resolve(results);
    });
  });
};

const list = async (req, res, next) => {
  try {
    const genres: Array = await listAllGenres();
    res.status(200).send({ success: true, message: 'A list of all genres', body: genres });
  } catch (error) {
    res.status(500).send({ success: false, message: 'internal server error'});
  }
  await next;
}

export default {
  list
}