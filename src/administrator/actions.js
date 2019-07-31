import database from '../database/mysql';

const { con } = database;

function listAllAdmins() {
  const listAdmins = 'SELECT * FROM administrator';
  return new Promise((resolve, reject) => {
    con.query(listAdmins, (err, results) => {
      if (err) throw (err);
      resolve(results);
    });
  });
};

const list = async (req, res, next) => {
  try {
    const admins: Array = await listAllAdmins();
    res.status(200).send({ success: true, message: 'A list of all administrators', body: admins });
  } catch (error) {
    res.status(500).send({ success: false, message: 'internal server error'});
  }
  await next;
}

const create = async (req, res,next) => {
  const {
    username, 
    email, 
    password, 
    phonenumber
  }: {
    username: string,
    email: string,
    password: string,
    phonenumber: string
  } = req.body;

  try {
    const createNewMovie = 'INSERT INTO administrator (username, email, password, phonenumber) VALUES (?,?,?,?)';
    con.query(createNewMovie, [username, email, password, phonenumber], (err, results) => {
      if (err) {
        reject(err);
      }
      console.log(results);
    });

    res.status(201).send({ success: true, message: 'Created new admin', body: {username, email, password, phonenumber} });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Server error' });
  }
  
  

  await next;
}

const createMovie = async (req, res, next) => {
  const { id } : { id : string } = req.params;
  const {
    title,
    length,
    release_date, 
    rating,
    language,
    directors_id,
    studio_id
  }: {

    title: string,
    length: string,
    release_date: string,
    rating: string,
    language: string,
    directors_id: Number,
    studio_id: Number
  } = req.body;

  try {
    const createNewMovie = 'INSERT INTO movies (title, length, release_date, rating, language, directors_id, studio_id) VALUES (?,?,?,?,?,?,?)';
    con.query(createNewMovie, [title, length, release_date, rating, language, directors_id, studio_id], (err, results) => {
      if (err) {
        reject(err);
      }
      console.log(results);
    });
    res.status(201).send({ success: true, message: 'Created new movie', body: {title, length, release_date, rating, language, directors_id, studio_id} });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Server error'});
  }
  
  

  await next;
}


export default {
  list,
  create,
  createMovie
} 