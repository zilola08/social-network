const { Posts } = require('../db_models/db_models');
const errorHandlingMiddleware = require("../middleware/errorHandlingMiddleware");

class PostsController {
  getAllPosts = async (req,res) => {
    try {
      const posts = await Posts.findAll();
      return res.json(posts);
    } catch (error) {
      errorHandlingMiddleware(error,req,res)
    }
  }
  
  getMyPosts = async (req,res) => {
    try {
      const myPosts = await Posts.findAll({
        where: {
          personUsername: req.query.username
        }
      })
      return res.json(myPosts)
    } catch (error) {
      console.log(error)
      errorHandlingMiddleware(error,req,res)
    }
  }

  addPost = async (req,res) => {
    try {
      const { content,personUsername } = req.body;
      const post = await Posts.create({ content: content,personUsername: personUsername })
      return res.json(post)
    } catch (error) {
      console.log(error)
      errorHandlingMiddleware(error,req,res)
    }
  }

  deletePost = async (req,res) => {
    try {
      const id = parseInt(req.query.id,10);
      const post = await Posts.findByPk(id);
      if (!post) {
        return res.status(400).end('No post with this id');
      }
      await post.destroy();
      res.statusMessage = `post with id ${id} was deleted`;
      return res.status(200).send(res.statusMessage);
    } catch (error) {
      console.log(error);
      errorHandlingMiddleware(error,req,res);
    }
  }
}

module.exports = new PostsController