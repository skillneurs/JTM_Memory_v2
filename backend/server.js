require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const Image = require('./models/Image');

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connecté à MongoDB'))
.catch(err => console.error('❌ MongoDB error :', err));

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!req.file || !title || !description) {
      return res.status(400).json({ error: 'Tous les champs sont requis' });
    }

    const image = new Image({
      title,
      description,
      filename: req.file.filename
    });

    await image.save();
    res.status(200).json({ message: '✅ Image enregistrée' });
  } catch (err) {
    console.error('Upload error :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.get('/images', async (req, res) => {
  try {
    const images = await Image.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (err) {
    console.error('Image fetch error:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.get('/image/:id', async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) return res.status(404).json({ error: 'Image non trouvée' });

    res.sendFile(path.join(__dirname, 'uploads', image.filename));
  } catch (err) {
    console.error('Image get error:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur en écoute sur http://localhost:${PORT}`);
});
