import { Router } from 'express';
import actions from './actions';

const { list } = actions;
 
const directorsRouter = Router();

directorsRouter.get('/directors', list);


export default direcotrsRouter;