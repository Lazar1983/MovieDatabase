import { Router } from 'express';
import actions from './actions';

const { list } = actions;
 
const studioRouter = Router();

studioRouter.get('/studio', list);


export default studioRouter;