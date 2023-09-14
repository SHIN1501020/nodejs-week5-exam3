import express from "express";
import { prisma } from "../utils/prisma/index.js";

const router = express.Router();

const createNewPost = async (req, res) => {
  /** (구현) **/
};

const getAllPosts = async (req, res) => {
  /** (구현) **/
};

const updatePost = async (req, res) => {
  /** (구현) **/
};

const deletePostById = async (req, res) => {
  /** (구현) **/
};

router.post('/api/posts', createNewPost);
router.get('/api/posts', getAllPosts);
router.put('/api/posts/:postId', updatePost);
router.delete('/api/posts/:postId', deletePostById);

module.exports = router;