const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
// const multer = require('multer');
// const multer = require("multer");
// const GridFsStorage = require('multer-gridfs-storage');
// const GridFsStorage = require("multer-gridfs-storage").GridFsStorage;
// const Grid = require("gridfs-stream");
// const GridFsStorage = require('multer-gridfs-storage');
// const { GridFsStorage } = require('mongoose-gridfs');
const cors = require("cors");
const { ObjectID } = require("mongodb");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/ogmusic";

app.use(express.json());
app.use(cors());

mongoose
  .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("DB Connected");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

const loginSchema = new mongoose.Schema({
  usrname: String,
  email: String,
  password: String,
  confirmpass: String,
});
const SongSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const Song = mongoose.model("Song", SongSchema);

const User = mongoose.model("User", loginSchema);

app.put("/editusers", async (req, res) => {
  try {
    console.log(req.body.email);
    console.log(req.body.username);
    const data = await mongoose
      .model("signup", loginSchema)
      .updateOne(
        { $or: [{ email: req.body.email }, { usrname: req.body.username }] },
        { $set: { email: req.body.email, usrname: req.body.username } }
      );
    console.log(data);
    if (!data) {
      res.status(404).json({ message: "data not found" });
    }
    res.status(201).json({ message: "updated success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
app.get("/getUsers", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

app.post("/signup", async (req, res) => {
  const { usrname, email, password, confirmpass } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const newUser = await User.create({
      usrname,
      email,
      password,
      confirmpass,
    });
    console.log(newUser);
    console.log("Hi, " + newUser.usrname);
    res.json({ statusCode: 200, message: "Successfully signed up" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Registration failed" });
  }
});

app.post("/uploadSongDet", async (req, res) => {
  const { title, description } = req.body;
  try {
    const existingSong = await User.findOne({ title });
    if (existingSong) {
      return res.json({ message: "Song already uploaded" });
    }
    const newSong = await Song.create({
      title,
      description,
    });
    console.log(newSong);
    // console.log("Hi, " + newUser.usrname);
    res.json({ statusCode: 200, message: "Song Successfully Added" });
  } catch (error) {
    console.error("Error uploading song", error);
    res.status(500).json({ message: "Upload failed" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const user = await User.findOne({ email, password });

    if (user) {
      // User found, redirect to home component or send success response
      if (user.email == "krishna@gmail.com") {
        res.json({ statusCode: 201, message: "Login successful", user });
      } else {
        res.json({ statusCode: 200, message: "Login successful", user });
      }
    } else {
      // User not found or credentials incorrect
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Login failed" });
  }
});

app.post("/update1", async (req, res) => {
  console.log("In backend");
  const { username, email, password } = req.body;
  console.log(req.body);
  try {
    const user = await User.updateOne(
      { email },
      { $set: { usrname: username, password: password, confirmpass: password } }
    );
    console.log("After Update", user);
    res.json({ statusCode: 200, message: "Update successful", User });
  } catch (error) {
    console.error("Error update user:", error);
    res.status(500).json({ message: "Update failed" });
  }
});

app.get("/users/:email", async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email }); // Query MongoDB for user with the specified email
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user); // Send the user data as JSON response
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/Songs", async (req, res) => {
  try {
    const data = await Song.find();
    console.log(data);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/delete", async (req, res) => {
  try {
    console.log(req.body);
    const data = await Song.deleteOne({ title: req.body.title });
    res.status(200).json({ message: "Song Deleted Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/search", async (req, res) => {
  const searchTerm = req.body.searchTerm.toLowerCase();
  try {
    const songs = await Song.find({ title: { $regex: searchTerm, $options: "i" } })
      console.log(songs)
    res.json(songs);
  } catch (error) {
    console.error("Error fetching data from MongoDB:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/songs", async (req, res) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const fs = require("fs");
// MongoDB URI
const mongoURI = "mongodb://localhost:27017/ogmusic";

// Create mongo connection
const conn = mongoose.createConnection(mongoURI);

// Init gfs
let gfs;

conn.once("open", () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});

// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return {
      filename: file.originalname,
      bucketName: "uploads",
    };
  },
});
const upload = multer({ storage });
app.post("/upload", upload.single("file"), (req, res) => {
  console.log(req.file);
  res.json({ file: req.file });
});

// GET /files endpoint to retrieve file names (optional)
app.get("/files", async (req, res) => {
  try {
    const files = await gfs.files.find().toArray();
    const fileNames = files.map((file) => file.filename);
    res.json(fileNames);
  } catch (err) {
    console.error("Failed to fetch files:", err);
    res.status(500).json({ error: "Failed to fetch files" });
  }
});

// GET /download/:filename endpoint to download files
app.get("/download/:filename", async (req, res) => {
  try {
    const filename = req.params.filename;
    const gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db);

    const file = await gfs.find({ filename: filename }).toArray();

    if (!file.length) {
      return res.status(404).json({ message: "File not found" });
    }

    const stream = await gfs.openDownloadStreamByName(filename);
    res.set("Content-Type", file[0].contentType);
  } catch (error) {
    // Handle the error
    console.error(error);
  }
});
