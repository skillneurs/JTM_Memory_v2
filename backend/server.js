const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connexion MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Schéma Mongo
const imageSchema = new mongoose.Schema({
  title: String,
  description: String,
  filename: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Image = mongoose.model('Image', imageSchema);

// Upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({ storage });

// POST /upload
app.post('/upload', upload.single('image'), async (req, res) => {
  const { title, description } = req.body;
  const newImage = new Image({
    title,
    description,
    filename: req.file.filename
  });

  await newImage.save();
  res.status(201).json({ message: 'Image enregistrée' });
});

// ✅ GET /images — Cette route doit être ici
app.get('/images', async (req, res) => {
  try {
    const images = await Image.find().sort({ createdAt: -1 });
    res.status(200).json(images);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Lancement du serveur
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 API opérationnelle sur http://localhost:${PORT}`));
