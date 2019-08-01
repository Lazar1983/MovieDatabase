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
    const createNewAdmin = 'INSERT INTO administrator (username, email, password, phonenumber) VALUES (?,?,?,?)';
    con.query(createNewAdmin, [username, email, password, phonenumber], (err, results) => {
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




export default {
  list,
  create
} 