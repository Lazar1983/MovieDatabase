import { Router } from 'express';
import actions from './actions';

const { list, getActorsByName, getActorsByMovieTitle, getSeriesCast } = actions;
 
const actorRouter = Router();

actorRouter.get('/actors', list);
actorRouter.get('/actors/:first_name', getActorsByName);
actorRouter.get('/actors/movies/:first_name', getActorsByMovieTitle);
actorRouter.get('/actors/series/:first_name', getSeriesCast);



export default actorRouter;