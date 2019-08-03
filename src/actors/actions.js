import database from '../database/mysql';

const { con } = database;

function listAllActors() {
  const listActors = 'SELECT * FROM actors';
  return new Promise((resolve, reject) => {
    con.query(listActors, (err, results) => {
      if (err) throw (err);
      resolve(results);
    });
  });
};

const list = async (req, res, next) => {
  try {
    const actors: Array = await listAllActors();
    res.status(200).send({ success: true, message: 'A list of all actors', body: actors });
  } catch (error) {
    res.status(500).send({ success: false, message: 'internal server error'});
  }
  await next;
}

function createSingleActor(first_name, last_name, birth_date){
  const createNewMovie = 'INSERT INTO movies (first_name, last_name, birth_date) VALUES (?,?,?)';
  return new Promise((resolve, reject)=>{
    con.query(createNewMovie, [first_name, last_name, birth_date], (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
}

const create = async (req, res,next) => {
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
    const actors = await createSingleActor(first_name, last_name, birth_date);
    res.status(201).send({ success: true, message: 'Created new actor', body: {first_name, last_name, birth_date} });
  } catch (error) {
    res.status(500).send({ success: false, message: 'Server error' });
  }
  
  

  await next;
}

function getActorByName(first_name) {
  const getActorByNameQuery = 'SELECT * FROM actors WHERE first_name=?';
  return new Promise((resolve, reject) => {
    con.query(getActorByNameQuery, [first_name],(err, results) => {
      if (err) throw (err);
      resolve(results);
    });
  });
};

const get = async (req, res, next) => {
  const { first_name }: { first_name:string }=req.params;
  try {
    const searchActorByName = await getActorByName(first_name);
    res.status(200).send({ success: true, message: 'your searching actors by first name :', body: searchActorByName });
  } catch (error) {
    res.status(500).send({ success: false, message: 'internal server error'});
  }
  await next;
}



export default {
  list,
  create,
  get
} 