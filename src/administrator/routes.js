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
adminRouter.get('/admin/:id', getAdminById);
adminRouter.post('/sign-up', createAdmin);
adminRouter.post('/login', login);
adminRouter.post('/createMovie', createMovie);
adminRouter.post('/createActor', createActor);
adminRouter.post('/createDirector', createDirector);
adminRouter.post('/createSerie', createSerie);
adminRouter.post('/createStudio', createStudio);
adminRouter.post('/createGenre', createGenre);
adminRouter.put('/updateMovieRating', updateMovieRating);
adminRouter.put('/admin/:id', updateAdmin);
adminRouter.put('/updateMovieRating/:id', updateMovieRating);
adminRouter.put('/updateSerieRating/:id', updateSerieRating);
adminRouter.put('/updateStudioWorth/:id', updateStudioWorth);
adminRouter.delete('/admin/:id', deleteAdmin);


export default adminRouter;