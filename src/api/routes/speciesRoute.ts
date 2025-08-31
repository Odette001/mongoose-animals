import express from 'express';
import { postSpecies, getSpecies, getSpeciesById, getSpeciesByArea, 
  putSpecies, deleteSpecies } 
from '../controllers/speciesController';

const router = express.Router();

router.post('/', postSpecies);
router.get('/', getSpecies);
router.get('/:id', getSpeciesById);
router.post('/area', getSpeciesByArea);  // ← NEW ROUTE
router.put('/:id', putSpecies);
router.delete('/:id', deleteSpecies);

export default router;


/*import express from 'express';
import {
  deleteSpecies,
  getSpecies,
  getSpeciesById,
  postSpecies,
  putSpecies,
} from '../controllers/speciesController';

const router = express.Router();

router.route('/').post(postSpecies).get(getSpecies);

router.route('/:id').get(getSpeciesById).put(putSpecies).delete(deleteSpecies);

export default router;
*/