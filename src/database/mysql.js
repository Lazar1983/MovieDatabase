import mysql from 'mysql';
import mysqlJsonConfigs from '../../config/mysql';
import models from '../migrations/createTables';


const dbConfig = mysqlJsonConfigs['dev']; 
const { moviesCreateModel } = models;
const con = mysql.createConnection(dbConfig); 

con.connect(() => {
  console.log('db connection is on');
  con.query(moviesCreateModel);
}); 

export default {
  con
}; 