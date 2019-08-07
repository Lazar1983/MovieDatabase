import database from '../database/mysql';

const { con } = database;

function listAllSeries() {
  const listSeries = 'SELECT * FROM series';
  return new Promise((resolve, reject) => {
    con.query(listSeries, (err, results) => {
      if (err) throw (err);
      resolve(results);
    });
  });
};

const list = async (req, res, next) => {
  try {
    const series: Array = await listAllSeries();
    res.status(200).send({ success: true, message: 'A list of all series', body: series });
  } catch (error) {
    res.status(500).send({ success: false, message: 'internal server error'});
  }
  await next;
}

function getSingleSeries(title) {
  const getSeriesTitleQuery = 'SELECT * FROM series WHERE title=?';
  return new Promise((resolve, reject) => {
    con.query(getSeriesTitleQuery, [title],(err, results) => {
      if (err) throw (err);
      resolve(results);
    });
  });
};

const get = async (req, res, next) => {
  const { title }: { title:string }=req.params;
  try {
    const seriesTitle = await getSingleSeries(title);
    res.status(200).send({ success: true, message: 'you are searching series by title', body: seriesTitle });
  } catch (error) {
    res.status(500).send({ success: false, message: 'internal server error'});
  }
  await next;
}



function actorsBySerieTitle (title) {
  const getActorsSerieQuery = 'SELECT first_name, last_name FROM actors JOIN actors_series ON actors.id = actors_series.actors_series_id JOIN series ON actors_series.series_id = series.id WHERE title=?';
  return new Promise((resolve, reject) => {
    con.query(getActorsSerieQuery, [title], (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

const getActorsBySeriesTitle = async (req, res, next) => {
  const { title }: { title : string } = req.params;
  try {
    const searchActorSerie = await actorsBySerieTitle(title);
    res.status(200).send({ success: true, message: `${title} movies is:`, body: searchActorSerie });
  } catch (error) {
    res.status(500).send({ success: false, message: 'internal server error'});
  }
  await next;
}



export default {
  list,
  get,
  getActorsBySeriesTitle
} 