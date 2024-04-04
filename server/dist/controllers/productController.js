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
const db_config_1 = __importDefault(require("../config/db.config"));
const Product_model_1 = require("../models/Product.model");
const postProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, price, stock, images } = req.body;
        const product = { name, description, price, stock, images };
        const result = yield db_config_1.default.collection('products').insertOne(product);
        res.status(201).json({
            message: 'Product created LOL',
            product: Object.assign({ _id: result.insertedId }, product),
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.postProduct = postProduct;
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const products = (await db
        //   .collection<IProduct>('products')
        //   .find()
        //   .toArray()) as IProduct[];
        const products = yield Product_model_1.Product.find();
        console.log(products);
        res.status(200).json(products);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getProducts = getProducts;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const product = (yield db_config_1.default
            .collection('products')
            .findOne({ _id: new mongodb_1.ObjectId(id.trim()) }));
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getProductById = getProductById;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, description, price, stock, images } = req.body;
        const product = { name, description, price, stock, images };
        const result = yield db_config_1.default
            .collection('products')
            .replaceOne({ _id: new mongodb_1.ObjectId(id.trim()) }, product, { upsert: true });
        res
            .status(200)
            .json({ message: 'Product updated', product: Object.assign({ _id: id }, product) });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const product = (yield db_config_1.default
            .collection('products')
            .findOne({ _id: new mongodb_1.ObjectId(id.trim()) }));
        if (!product) {
            throw { name: 'NotFound', message: `Product with id ${id} not found` };
        }
        yield db_config_1.default
            .collection('products')
            .deleteOne({ _id: new mongodb_1.ObjectId(id.trim()) });
        res.status(200).json({ message: `Product with id ${id} deleted` });
    }
    catch (error) {
        console.log(error);
        if (error.name === 'NotFound') {
            return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.deleteProduct = deleteProduct;
