import { Router } from 'express';
import actions from './actions';

const { 
  listOfAllActors, 
  getActorsByName, 
  getActorsByMovieTitle, 
  getSeriesCast, 
  getActorsByDateOfBirth
} = actions;
 
const actorRouter = Router();

actorRouter.get('/actors', listOfAllActors);
actorRouter.get('/actors/:name', getActorsByName);
actorRouter.get('/actorsByMovies/:name', getActorsByMovieTitle);
actorRouter.get('/actorsBySeries/:name', getSeriesCast);
actorRouter.get('/actors/byDate/:fromDate/:toDate', getActorsByDateOfBirth);

export default actorRouter;