var express = require("express");
var router = express.Router();
const db = require("../models");
const UserService = require("../services/UserService");
const userService = new UserService();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/signup", async (req, res) => {
  const { fName, lName, email, password } = req.body;
  try {
    const userId = await userService.createUser(fName, lName, email, password);
    res.status(201).json({
      message: "User created successfully",
      userId: userId.id,
      fName: userId.fName,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
});

router.get("/all", async (req, res) => {
  try {
    const allUsers = await userService.getAllUsers();
    res.status(200).json(allUsers);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving users", error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    if (!isNaN(userId)) {
      const user = await userService.getUserById(userId);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } else {
      res.status(400).json({ message: "Invalid user ID format" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving user", error: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userService.authenticateUser(email, password);
    if (user) {
      res.status(200).json({
        message: "Login successful",
        userId: user.id,
        fName: user.fName,
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error during login", error: error.message });
  }
});

module.exports = router;
