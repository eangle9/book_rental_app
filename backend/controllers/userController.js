const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const pool = require("../config/db");

const registerUser = asyncHandler(async (req, res) => {
  const { username, password, email, role } = req.body;

  try {
    // Check if the user already exists
    const userCheck = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (userCheck.rows.length > 0) {
      res.status(409);
      throw new Error("User Already Exists");
    }

    // Hash the password
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert the new user
    const newUser = await pool.query(
      "INSERT INTO users (username, password, email, role) VALUES ($1, $2, $3, $4) RETURNING id, username, email, role, status, created_at, updated_at",
      [username, hashedPassword, email, role]
    );
    res.status(201).json(newUser.rows[0]);
  } catch (err) {
    throw new Error(err.message);
  }
});

module.exports = { registerUser };
