const moviesCreateModel = `
  CREATE TABLE IF NOT EXISTS movies (
    id INT(11) NOT NULL AUTO_INCREMENT,
    title CHAR(45) NOT NULL,
    length CHAR(45) NOT NULL,
    rating VARCHAR(10) NOT NULL,
    language VARCHAR(45) NOT NULL,
    directors_id INT(11) NOT NULL,
    studio_id INT(11) NOT NULL
  )
`;

export default {
  moviesCreateModel,

}