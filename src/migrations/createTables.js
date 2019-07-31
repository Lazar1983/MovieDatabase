const moviesCreateModel = `
  CREATE TABLE IF NOT EXISTS movies (
    id INT(11) NOT NULL AUTO_INCREMENT,
    title VARCHAR(45) NOT NULL,
    length VARCHAR(45) NOT NULL,
    rating VARCHAR(10) NOT NULL,
    language VARCHAR(45) NOT NULL,
    directors_id INT(11) NOT NULL,
    studio_id INT(11) NOT NULL,
    PRIMARY key (id)
  )
`;

const actorsCreateModel = `
  CREATE TABLE IF NOT EXISTS actors (
    id INT(11) NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(45) NOT NULL,
    last_name VARCHAR(45) NOT NULL,
    birth_date VARCHAR(10) NOT NULL,
    PRIMARY key (id)
  )
`;

const adminCreateModel = `
  CREATE TABLE IF NOT EXISTS administrator (
    id INT(11) NOT NULL AUTO_INCREMENT,
    username VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL,
    password VARCHAR(45) NOT NULL,
    phonenumber VARCHAR(45) NOT NULL,
    PRIMARY key (id)
  )
`;

export default {
  moviesCreateModel,
  actorsCreateModel,
  adminCreateModel

}