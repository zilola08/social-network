const { Chats } = require("../db_models/db_models");
const errorHandlingMiddleware = require("../middleware/errorHandlingMiddleware");
const { Op } = require("sequelize");

class ChatsController {
  async addChat(req,res) {
    const { sender,recipient } = req.body;
    try {
      // const isDuplicate = await Chats.findOne({
      //   where: {
      //     [Op.or]: [
      //       { sender: sender },
      //       { recipient: sender }
      //     ]
      //   }
      // })
      // if (isDuplicate) {
      //   console.log("this chat already is in my chats");
      //   return;
      // };
      const savedChat = await Chats.create({ sender: sender,recipient: recipient });
      return res.json(savedChat);
    } catch (error){
      console.log(error);
      errorHandlingMiddleware(error, req,res)
    }
  }

  async deleteChat(req,res) {
    try {
      const id = parseInt(req.query.id,10);
      const chat = await Chats.findByPk(id);
      if (!chat) {
        return res.status(400).end('No post with this id');
      }
      await chat.destroy();
      res.statusMessage = `chat with id ${id} was deleted`;
      return res.status(200).send(res.statusMessage);
    } catch (error){
      console.log(error);
      errorHandlingMiddleware(error, req,res)
    }
  }

  async getMyChats(req,res) {
    const username = req.query.username;
    try {
      const myChats = await Chats.findAll({
        where: {
          [Op.or]: [
            { sender: username },
            { recipient: username }
          ]
        }
      });
      return res.json(myChats);
    } catch (error){
      console.log(error);
      errorHandlingMiddleware(error, req,res)
    }
  }

}

module.exports = new ChatsController();