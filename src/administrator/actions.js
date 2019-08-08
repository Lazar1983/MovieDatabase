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

function listAdminId (id) {
  const getAdmin = 'SELECT * FROM administrator WHERE id=?';
  return new Promise((resolve, reject) => {
    con.query(getAdmin, [Number(id)], (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
      console.log(results);
    });
  });
};

const getAdminById = async (req, res, next) => {
  const { id } : { id: string } = req.params;
  try {
    const adminByIds = await listAdminId(id);
    res.status(200).send({ success: true, message: 'Get administrators by id', body: adminByIds });
  } catch (error) {
    res.status(500).send({ success: false, message: 'internal server error'});
  }
  await next;
}


const createAdmin = async (req, res, next) => {
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

function createSingleMovie(title, length, release_date, rating, language, directors_movies_id, studio_id, genres_movies_id) {
  const createNewMovie = 'INSERT INTO movies (title, length, release_date, rating, language, directors_movies_id, studio_id, genres_movies_id) VALUES (?,?,?,?,?,?,?,?)';
  return new Promise((resolve, reject) => {
    con.query(createNewMovie, [title, length, release_date, rating, language, directors_movies_id, studio_id, genres_movies_id], (err, results) => {
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
    directors_movies_id,
    studio_id,
    genres_movies_id
  }: {
    title: string,
    length: string,
    release_date: string,
    rating: string,
    language: string,
    directors_movies_id: number,
    studio_id: number,
    genres_movies_id : number
  } = req.body;
  
  try {
    const newMovie = await createSingleMovie (title, length, release_date, rating, language, directors_movies_id, studio_id, genres_movies_id);
    res.status(201).send({ success: true, message: 'Created new movie', body: {title, length, release_date, rating, language, directors_movies_id, studio_id, genres_movies_id} });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Server error'});
  }
  await next;
}

function createSingleActor(first_name, last_name, birth_date) {
  const createNewActor = 'INSERT INTO actors(first_name, last_name, birth_date) VALUES (?,?,?)';
  return new Promise((resolve, reject) => {
    con.query(createNewActor, [first_name, last_name, birth_date], (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
}

const createActor = async (req, res, next) => {
  const {
    first_name,
    last_name,
    birth_date
  }: {
    first_name: string,
    last_name: string,
    birth_date: string
  } = req.body;

  try {
    const newActor = await createSingleActor(first_name, last_name, birth_date);
    res.status(201).send({ success: true, message: 'Created new actor', body: {first_name, last_name, birth_date} });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Server error' });
  }
  
  await next;
}

function createSingleDirector(first_name, last_name, birth_date) {
  const createNewDirector = 'INSERT INTO directors (first_name, last_name, birth_date) VALUES (?,?,?)';
  return new Promise((resolve, reject) => {
    con.query(createNewDirector, [first_name, last_name, birth_date], (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
}

const createDirector = async (req, res, next) => {
  const {
    first_name,
    last_name,
    birth_date
  }: {
    first_name: string,
    last_name: string,
    birth_date: string
  } = req.body;

  try {
    const newDirector = await createSingleDirector(first_name, last_name, birth_date);
    res.status(201).send({ success: true, message: 'Created new director', body: {first_name, last_name, birth_date} });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Server error' });
  }
  
  await next;
}

function createSingleSerie (title, language, release_date, episodes, rating, directors_id, genres_series_id) {
  const createNewSerie = 'INSERT INTO series (title, language, release_date, length, rating, directors_id, genres_series_id) VALUES (?,?,?,?,?,?,?)';
  return new Promise((resolve, reject) => {
    con.query(createNewSerie, [title, language, release_date, episodes, rating, directors_id, genres_series_id], (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
}

const createSerie = async (req, res, next) => {
  const {
    title, 
    language, 
    release_date, 
    episodes, 
    rating, 
    directors_id,
    genres_series_id
  }: {
    title : string,
    language : string,
    release_date : string,
    episodes : number,
    rating : string,
    directors_id : number,
    genres_series_id : number
  } = req.body;

  try {
    const newSerie = await createSingleSerie(title, language, release_date, episodes, rating, directors_id, genres_series_id);
    res.status(201).send({ success: true, message: 'Created new director', body: {title, language, release_date, episodes, rating, directors_id, genres_series_id} });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Server error' });
  }
  
  await next;
}

function createSingleStudio (name, worth, ceo) {
  const createNewStudio = 'INSERT INTO studio (name, worth, ceo) VALUES (?,?,?)';
  return new Promise((resolve, reject) => {
    con.query(createNewStudio, [name, worth, ceo], (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
}

const createStudio = async (req, res, next) => {
  const {
    name,
    worth,
    ceo,
  }: {
    name : string,
    worth : string,
    ceo : string,
  } = req.body;

  try {
    const newStudio = await createSingleStudio (name, worth, ceo);
    res.status(201).send({ success: true, message: 'Created new studio', body: {name, worth, ceo} });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Server error' });
  }
  
  await next;
}

function createMovieGenre (genre_name) {
  const createNewGenre = 'INSERT INTO genres (genre_name) VALUES (?)';
  return new Promise((resolve, reject) => {
    con.query(createNewGenre, [genre_name], (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
}

const createGenre = async (req, res, next) => {
  const { genre_name }: { genre_name : string } = req.body;
  try {
    const newGenre = await createMovieGenre (genre_name);
    res.status(201).send({ success: true, message: 'Created new studio', body: {genre_name} });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Server error' });
  }
  
  await next;
}


function updateAdminValues (username, email, phonenumber, password, id) {
  const updateAdminValues = 'UPDATE administrator SET username=?, email=?, phonenumber=?, password=? WHERE id=?';
  return new Promise((resolve, reject) => {
    con.query(updateAdminValues, [username, email, phonenumber, password, id], (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
}

const updateAdmin = async (req, res, next) => {
  const { id }: { id : string } = req.params;
  const { 
    username,
    email,
    phonenumber,
    password
  } : {
    username : ?string,
    email: ?string,
    phonenumber: ?string,
    password: ?string
  } = Object.assign({}, req.body);

  
   try {
    
    const adminFromDB = await listAdminId(id);

    const admin = adminFromDB[0];

    let adminForUpdate = {
      username : '',
      email : '',
      phonenumber : '',
      password : ''
    }

    if (username) {
      adminForUpdate.username = username;
    } else {
      adminForUpdate.username = admin.username;
    }
    if (email) {
      adminForUpdate.email = email;
    }
    else {
      adminForUpdate.email = admin.email;
    }
    if (phonenumber) {
      adminForUpdate.phonenumber = phonenumber;
    }
    else {
      adminForUpdate.phonenumber = admin.phonenumber;
    }
    if (password && password.length) {
      const salt = bcrypt.genSaltSync(10);
      const getRounds = bcrypt.getRounds(salt);
      const passHash = bcrypt.hashSync(password, getRounds);
      adminForUpdate.password = passHash;
    }
    else {
      adminForUpdate.password = admin.passHash;
    }

    const updatedAdmin = await updateAdminValues (adminForUpdate.username, adminForUpdate.email, adminForUpdate.phonenumber, adminForUpdate.password, id);
    res.status(201).send({ success: true, message: 'Updated admin', body: {username, email, phonenumber, password} });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Server error' });
  }
  
  await next;
}





export default {
  list,
  getAdminById,
  createAdmin,
  login,
  createMovie,
  createActor,
  createDirector,
  createSerie,
  createStudio,
  createGenre,
  updateAdmin
} 