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
    res.status(200).send({ success: true, message: 'A list of all direcotrs', body: directors });
  } catch (error) {
    res.status(500).send({ success: false, message: 'internal server error'});
  }
  await next;
}





export default {
  list
} 