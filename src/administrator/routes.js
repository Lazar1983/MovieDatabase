import { Router } from 'express';
import actions from './actions';

const { 
  list,
  getAdminById, 
  createAdmin, 
  login, 
  createMovie, 
  createActor, 
  createDirector, 
  createSerie, 
  createStudio, 
  createGenre,
  updateAdmin,
  updateMovieRating,
  updateSerieRating,
  deleteAdmin,
  updateStudioWorth 
} = actions;

const adminRouter = Router();

adminRouter.get('/admin', list);
adminRouter.get('/getAdminById', getAdminById);
adminRouter.post('/sign-up', createAdmin);
adminRouter.post('/login', login);
adminRouter.post('/createMovie', createMovie);
adminRouter.post('/createActor', createActor);
adminRouter.post('/createDirector', createDirector);
adminRouter.post('/createSerie', createSerie);
adminRouter.post('/createStudio', createStudio);
adminRouter.post('/createGenre', createGenre);
adminRouter.put('/updateAdmin', updateAdmin);
adminRouter.put('/updateMovieRating', updateMovieRating);
adminRouter.put('/updateSerieRating', updateSerieRating);
adminRouter.put('/updateStudioWorth', updateStudioWorth);
adminRouter.delete('/deleteAdmin', deleteAdmin);


export default adminRouter;