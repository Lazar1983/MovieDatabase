import database from '../database/mysql';
import Bluebird from 'bluebird';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const { con } = database;

Bluebird.promisifyAll(jwt);
Bluebird.promisifyAll(bcrypt);

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

const create = async (req, res, next) => {
  const {
    username, 
    email, 
    phonenumber,
    password
  }: {
    username: string,
    email: string,
    phonenumber: string,
    password: string
  } = req.body;

  const salt = bcrypt.genSaltSync(10);
  const getRounds = bcrypt.getRounds(salt);
  const passHash = bcrypt.hashSync(password,getRounds);

  const createAt = new Date(Date.now());
  
  try {
    const createNewAdmin = 'INSERT INTO administrator (username, email, phonenumber, password, salt, created_at) VALUES (?,?,?,?,?,?)';
    con.query(createNewAdmin, [username, email, phonenumber, passHash, salt, createAt], (err, results) => {
      if (err) {
        console.error(err);
      }
      console.log(results);
    });

    res.status(201).send({ success: true, message: 'Created new admin', body: {username, email, password, phonenumber} });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Server error' });
  }
  
  

  await next;
}

function createSingleMovie(title, length, release_date, rating, language, directors_id, studio_id) {
  const createNewMovie = 'INSERT INTO movies (title, length release_date, rating, language, directors_id, studio_id) VALUES (?,?,?,?,?,?,?)';
  return new Promise((resolve, reject) => {
    con.query(createNewMovie, [title, length, release_date, rating, language, directors_id, studio_id], (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

const createMovie = async (req, res, next) => {
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
    directors_id: number,
    studio_id: number
  } = req.body;
  
  try {
    const newMovie = await createSingleMovie (title, length, release_date, rating, language, directors_id, studio_id);
    res.status(201).send({ success: true, message: 'Created new movie', body: {title, length, release_date, rating, language, directors_id, studio_id} });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Server error'});
  }
  await next;
}

const login = async (req, res, next) => {
  const { email, password } : { email: string, password: string } = req.body;

  const adminWithEmail = 'SELECT * FROM administrator WHERE email = ?';
  return con.query(adminWithEmail, email, (err, results) => {
    if(err) {
      console.error(err);
    }
    const admin = results.find(emailObj => emailObj.email === email);

    if (results && results.length && admin.email) {
      const matchPassword : boolean = bcrypt.compareSync(password, admin.password);
      if (matchPassword) {
        delete admin.password;
        delete admin.salt;
        const adminId = admin.id;
        const token = jwt.sign({ admin }, 'aaaa', { expiresIn: '1h'});
        res.status(200).send({message: 'Logged in', token: token});
      } else {
        res.status(403).send('Password is not correct');
        }
    } else {
      res.status(404).send(`User with email ${email} not found!`);
    }
  })


  await next;
}

export default {
  list,
  create,
  createMovie,
  login
} 