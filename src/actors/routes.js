import { Router } from 'express';
import actions from './actions';

const { list, create, get } = actions;
 
const actorRouter = Router();

actorRouter.get('/actors', list);
actorRouter.post('/actors', create);
actorRouter.get('/actors/:first_name', get);


export default actorRouter;