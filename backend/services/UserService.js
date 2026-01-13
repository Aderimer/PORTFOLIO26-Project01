const { INTEGER } = require("sequelize");

class UserService {
  constructor(db) {
    this.db = require("../models");
    this.User = this.db.User;
  }

  async createUser(fName, lName, email, encryptedPassword, salt) {
    const newUser = await this.User.create({
      fName,
      lName,
      email,
      password,
      encryptedPassword,
      salt,
    });
    return newUser.id, newUser.fName;
  }

  async getUserById(id) {
    return await this.User.findByPk(id);
  }

  async getAllUsers() {
    return await this.User.findAll();
  }

  async authenticateUser(email, password) {
    const user = await this.User.findOne({ where: { email, password } });
    return user;
  }
}

module.exports = UserService;
