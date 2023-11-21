const sequelize = require("../db");

const { DataTypes } = require("sequelize");

const Persons = sequelize.define('persons',{
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING
  },
  lastName: {
    type: DataTypes.STRING
  },
  username: {
    type: DataTypes.STRING,
    primaryKey: true,
    unique: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  refreshToken: {
    type: DataTypes.STRING  }
})

const Posts = sequelize.define('posts',{
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  }
})

const Chats = sequelize.define('chats',{
  chat_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  recipient: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  sender: {
    type: DataTypes.TEXT,
    allowNull: false,
  }
})

const Messages = sequelize.define('message',{
  message_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  receiverUsername: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  senderUsername: {
    type: DataTypes.TEXT,
    allowNull: false,
  }
})

const Persons_Chats = sequelize.define('persons_chats',{
})

Persons.hasMany(Posts);
Posts.belongsTo(Persons);

Persons.hasMany(Messages, {
  as: "messagesOut",
  foreignKey: "senderUsername",
});

Persons.hasMany(Messages, {
  as: "messagesIn",
  foreignKey: "receiverUsername",
});

Messages.belongsTo(Persons, {
  foreignKey: "senderUsername",
  as: 'sender'
});

Messages.belongsTo(Persons, {
  foreignKey: "receiverUsername",
  as: 'receiver'
});

Chats.hasMany(Messages, {
  as: "messages",
  foreignKey: "chatId",
});

Messages.belongsTo(Chats, {
  as: "messages",
  foreignKey: "chatId",
});

Persons.belongsToMany(Chats,{
  through: Persons_Chats,
});

Chats.belongsToMany(Persons,{
  through: Persons_Chats,
});

Chats.hasMany(Persons_Chats);
Persons.hasMany(Persons_Chats);

module.exports = {
  Persons,
  Messages,
  Posts,
  Chats,
  Persons_Chats,
};