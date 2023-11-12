const { Messages } = require("../db_models/db_models");
const errorHandlingMiddleware = require("../middleware/errorHandlingMiddleware");
const { Op } = require("sequelize");

class MessagesController {
  
  async addMessage(req,res) {
    const senderUsername = req.body.senderUsername;
    const receiverUsername = req.body.receiverUsername;
    const chatId = req.body.chatId;
    const content = req.body.content;
    try {
      const savedMessage = await Messages.create({ senderUsername: senderUsername,receiverUsername: receiverUsername, chatId:chatId, content: content});
      return res.json(savedMessage);
    } catch (error){
      console.log(error);
      errorHandlingMiddleware(error, req,res)
    }
  }

  async getMessagesInChat(req,res) {
    const id = parseInt(req.query.chatId,10);
    try {
      const MessagesInChat = await Messages.findAll({
        where: {
          chatId:id
        }
      });
      return res.json(MessagesInChat);
    } catch (error){
      console.log(error);
      errorHandlingMiddleware(error, req,res)
    }
  }

}

module.exports = new MessagesController();