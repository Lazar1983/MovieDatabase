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
    let genre = [];
    for (let i = 0; i < genres.length; i++) {
      let name = genres[i].genre_name;
      genre.push(name);
    }
    res.status(200).send({ success: true, message: 'A list of all genres', body: {genre} });
  } catch (error) {
    res.status(500).send({ success: false, message: 'internal server error'});
  }
  await next;
}

export default {
  list
};