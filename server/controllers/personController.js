const { Persons } = require("../db_models/db_models");
const errorHandlingMiddleware = require("../middleware/errorHandlingMiddleware");

class PersonController {

  getAllPersons = async (req,res) => {
    try {
      const persons = await Persons.findAll();
      console.log(persons);
      return res.json(persons);
    } catch (error) {
      console.log(error)
      errorHandlingMiddleware(error,req,res)
    }
  }
}

module.exports = new PersonController();