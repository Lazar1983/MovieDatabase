import mysql from 'mysql';
import mysqlJsonConfigs from '../../config/mysql';
import models from '../migrations/createTables';

const dbConfig = mysqlJsonConfigs['dev']; 
const { adminCreateModel, moviesCreateModel, actorsCreateModel, directorsCreateModel, seriesCreateModel, studioCreateModel, genresCreateModel } = models;
const con = mysql.createConnection(dbConfig); 

con.connect(() => {
  console.log('db connection is on');
  con.query(moviesCreateModel);
  con.query(actorsCreateModel);
  con.query(adminCreateModel);
  con.query(directorsCreateModel);
  con.query(seriesCreateModel);
  con.query(studioCreateModel);
  con.query(genresCreateModel);
}); 

export default {
  con
}; 