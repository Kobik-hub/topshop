const bcrypt = require("bcrypt");

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Yosef Cohen",
    password: bcrypt.hashSync("123456", 10),
    email: "user1@example.com",
  },
  {
    name: "David Levi",
    password: bcrypt.hashSync("123456", 10),
    email: "user2@example.com",
  },
];

module.exports = users;
