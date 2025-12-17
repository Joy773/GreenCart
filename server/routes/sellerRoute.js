import express from "express";
import { login, isSellerAuth, logout } from "../controllers/sellerController.js";
import authSeller from "../middleware/authSeller.js";

const sellerRouter = express.Router();

sellerRouter.post('/login', login);
sellerRouter.get('/is-auth', authSeller, isSellerAuth);
sellerRouter.get('/logout', logout);

export default sellerRouter;