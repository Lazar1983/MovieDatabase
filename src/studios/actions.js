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





export default {
  list
} 