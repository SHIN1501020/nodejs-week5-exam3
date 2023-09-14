import express from "express";
import { prisma } from "../utils/prisma/index.js";

const router = express.Router();

const createNewPost = async (req, res) => {
  const { title, content } = req.body;
  
  const post = await prisma.posts.create({
    data: {
        title,
        content,
    }
  });

  const newPost = {
    id: post.id,
    title: post.title,
    content: post.content,
  };

  return res.status(201).json(newPost);
};

const getAllPosts = async (req, res) => {
    const posts = await prisma.posts.findMany({
        select:{
            id: true,
            title: true,
            content: true,
        }
      });
    
      return res.status(201).json(posts);
};

const updatePost = async (req, res) => {
    const { postId } = req.params;
    const { title, content } = req.body;

    const post = await prisma.posts.findUnique({
      where: {
        id: Number(postId)
      }
    });

    if(!post) return res.status(404).json({ errorMessage:'게시글이 존재하지 않습니다.'});
  
    const newPost = await prisma.posts.update({
        where: {
            id: Number(postId)
        },
        data: {
            title,
            content,
        },
    });
  
    return res.status(201).json(newPost);
};

const deletePostById = async (req, res) => {
    const { postId } = req.params;

    const post = await prisma.posts.findUnique({
      where: {
        id: Number(postId)
      }
    });

    if(!post) return res.status(404).json({ errorMessage:'게시글이 존재하지 않습니다.'});
    
    await prisma.posts.delete({
        where: {
            id: Number(postId)
        },
    });
    return res.status(201).json({message: "success"});
};

router.post('/api/posts', createNewPost);
router.get('/api/posts', getAllPosts);
router.put('/api/posts/:postId', updatePost);
router.delete('/api/posts/:postId', deletePostById);

export default router;