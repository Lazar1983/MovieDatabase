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
actorRouter.get('/actors?:fName=&lName=', getActorsByName);
actorRouter.get('/actors/movies/:first_name', getActorsByMovieTitle);
actorRouter.get('/actors/series/:first_name', getSeriesCast);
actorRouter.get('/actors/byDate/:fromDate/:toDate', getActorsByDateOfBirth);



export default actorRouter;