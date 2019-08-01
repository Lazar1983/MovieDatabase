import { Router } from 'express';
import actions from './actions';

const { list,get } = actions;
 
const studioRouter = Router();

studioRouter.get('/studio', list);
studioRouter.get('/studio/:name', get);


export default studioRouter;