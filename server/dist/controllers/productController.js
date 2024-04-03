"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProductById = exports.getProducts = exports.postProduct = void 0;
const mongodb_1 = require("mongodb");
const mongodb_2 = __importDefault(require("../config/mongodb"));
const postProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, price, images } = req.body;
        const product = { name, description, price, images };
        const result = yield mongodb_2.default.collection('products').insertOne(product);
        if (!result.acknowledged) {
            return res.status(500).json({ message: 'Failed to create product' });
        }
        res.status(201).json({ message: 'Product created', product });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to create product' });
    }
});
exports.postProduct = postProduct;
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield mongodb_2.default.collection('products').find().toArray();
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch products' });
    }
});
exports.getProducts = getProducts;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const product = yield mongodb_2.default.collection('products').findOne({ _id: new mongodb_1.ObjectId(id.trim()) });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch product' });
    }
});
exports.getProductById = getProductById;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, description, price, images } = req.body;
        const product = { name, description, price, images };
        const result = yield mongodb_2.default.collection('products').updateOne({ _id: new mongodb_1.ObjectId(id.trim()) }, { $set: product });
        if (!result.acknowledged) {
            return res.status(500).json({ message: 'Failed to update product' });
        }
        res.status(200).json({ message: 'Product updated', product });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to update product' });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield mongodb_2.default.collection('products').deleteOne({ _id: new mongodb_1.ObjectId(id.trim()) });
        if (!result.acknowledged) {
            return res.status(500).json({ message: 'Failed to delete product' });
        }
        res.status(200).json({ message: 'Product deleted' });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to delete product' });
    }
});
exports.deleteProduct = deleteProduct;
