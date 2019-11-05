export function Movie(data) {
  this.title = data.title;
  this.length = data.length;
  this.release_date = data.release_date;
  this.rating = data.rating;
  this.language = data.language; 
  this.directors_movies_id = data.directors_movies_id; 
  this.studio_id = data.studio_id; 
  this.genres_movies_id = data.genres_movies_id; 

}