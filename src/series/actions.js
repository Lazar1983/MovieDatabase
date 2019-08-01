import database from '../database/mysql';

const { con } = database;

function listAllSeries() {
  const listSeries = 'SELECT * FROM series';
  return new Promise((resolve, reject) => {
    con.query(listSeries, (err, results) => {
      if (err) throw (err);
      resolve(results);
    });
  });
};

const list = async (req, res, next) => {
  try {
    const series: Array = await listAllSeries();
    res.status(200).send({ success: true, message: 'A list of all series', body: series });
  } catch (error) {
    res.status(500).send({ success: false, message: 'internal server error'});
  }
  await next;
}





export default {
  list
} 