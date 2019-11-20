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
actorRouter.get('/actorsByName', getActorsByName);
actorRouter.get('/actorsByMovies', getActorsByMovieTitle);
actorRouter.get('/actorsBySeries', getSeriesCast);
actorRouter.get('/actorsByDate', getActorsByDateOfBirth);

export default actorRouter;