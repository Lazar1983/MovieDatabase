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
    res.status(200).send({ success: true, message: 'A list of all directors', body: directors });
  } catch (error) {
    res.status(500).send({ success: false, message: 'internal server error'});
  }
  await next;
}

function getDirectorByName(first_name) {
  const getDirectorByNameQuery = 'SELECT * FROM directors WHERE first_name=?';
  return new Promise((resolve, reject) => {
    con.query(getDirectorByNameQuery, [first_name],(err, results) => {
      if (err) throw (err);
      resolve(results);
    });
  });
};

const get = async (req, res, next) => {
  const { first_name }: { first_name:string }=req.params;
  try {
    const searchDirectorByName = await getDirectorByName(first_name);
    res.status(200).send({ success: true, message: 'you are searching directors by first name', body: searchDirectorByName });
  } catch (error) {
    res.status(500).send({ success: false, message: 'internal server error'});
  }
  await next;
}




export default {
  list,
  get
} 