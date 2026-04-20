const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();

// ✅ MongoDB Atlas URL
const url = "mongodb+srv://sameena:sameena123@cluster0.kl0nzxi.mongodb.net/video-project";

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let db;

// ✅ Connect to MongoDB ONLY ONCE
MongoClient.connect(url)
  .then(client => {
    db = client.db("video-project");
    console.log("MongoDB Connected ✅");
  })
  .catch(err => {
    console.error("MongoDB Connection Error ❌", err);
  });


// ✅ Root route (to avoid "Cannot GET /")
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});


// ✅ Get Categories
app.get("/get-categories", async (req, res) => {
  try {
    const data = await db.collection("tblcategories").find({}).toArray();
    res.send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

// ✅ Get Admin
app.get("/get-admin", async (req, res) => {
  try {
    const data = await db.collection("tbladmin").find({}).toArray();
    res.send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

// ✅ Get Users
app.get("/get-users", async (req, res) => {
  try {
    const data = await db.collection("tblusers").find({}).toArray();
    res.send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

// ✅ Get All Videos
app.get("/get-video", async (req, res) => {
  try {
    const data = await db.collection("tblvideos").find({}).toArray();
    res.send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

// ✅ Get Video by ID
app.get("/get-video/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = await db.collection("tblvideos").find({ video_id: id }).toArray();
    res.send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

// ✅ Register User
app.post("/register-user", async (req, res) => {
  try {
    await db.collection("tblusers").insertOne(req.body);
    res.send("User Registered");
  } catch (err) {
    res.status(500).send(err);
  }
});

// ✅ Add Video
app.post("/add-video", async (req, res) => {
  try {
    const video = {
      video_id: parseInt(req.body.video_id),
      title: req.body.title,
      description: req.body.description,
      comments: req.body.comments,
      likes: parseInt(req.body.likes),
      views: parseInt(req.body.views),
      url: req.body.url,
      category_id: parseInt(req.body.category_id)
    };

    await db.collection("tblvideos").insertOne(video);
    res.send("Video Added");
  } catch (err) {
    res.status(500).send(err);
  }
});

// ✅ Edit Video
app.put("/edit-video/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    await db.collection("tblvideos").updateOne(
      { video_id: id },
      { $set: req.body }
    );

    res.send("Video Updated");
  } catch (err) {
    res.status(500).send(err);
  }
});

// ✅ Delete Video
app.delete("/delete-video/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    await db.collection("tblvideos").deleteOne({ video_id: id });

    res.send("Video Deleted");
  } catch (err) {
    res.status(500).send(err);
  }
});
app.post("/user-login", (req, res) => {
  const { user_id, password } = req.body;

  mongoClient.connect(url).then(clientObj => {
    const database = clientObj.db("video-project");

    database.collection("tblusers")
      .findOne({ user_id: user_id, password: password })
      .then(user => {
        if (user) {
          res.send({ success: true, user });
        } else {
          res.send({ success: false });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).send("Server error");
      });
  });
});

// ✅ Start Server
const PORT = process.env.PORT || 5080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});