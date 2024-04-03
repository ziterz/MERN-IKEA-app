import express from 'express';
import { postProduct, getProducts, getProductById, updateProduct, deleteProduct } from '../controllers/productController';

const router = express.Router();

router.post('/', postProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.patch('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;