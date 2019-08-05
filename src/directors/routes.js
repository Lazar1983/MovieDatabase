import { Router } from 'express';
import actions from './actions';

const { list, get } = actions;
 
const directorsRouter = Router();

directorsRouter.get('/directors', list);
directorsRouter.get('/directors/:first_name', get);

export default directorsRouter;