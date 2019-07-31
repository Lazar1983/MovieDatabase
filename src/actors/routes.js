import { Router } from 'express';
import actions from './actions';

const { list, create } = actions;
 
const actorRouter = Router();

actorRouter.get('/actors', list);
actorRouter.post('/actors', create);


export default actorRouter;