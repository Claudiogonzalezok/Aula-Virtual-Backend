const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Material = require("../models/Material");
const verifyToken = require('../middlewares/authMiddleware');

// Carpeta donde se guardarán los archivos
const uploadPath = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);

// Configuración de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // guarda con fecha + nombre original
    const filename = Date.now() + "-" + file.originalname;
    cb(null, filename);
  },
});
const upload = multer({ storage });

// Ruta para subir archivos (solo profesores deberían acceder)
router.post("/upload", verifyToken, upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No se subió ningún archivo" });

  try {
    const { courseId, classId } = req.body; // opcional

    const newMaterial = new Material({
      originalname: req.file.originalname,
      filename: req.file.filename,
      url: `/uploads/${req.file.filename}`,
      uploadedBy: req.user._id, // asumimos que tenés middleware auth
      course: courseId || null,
      class: classId || null,
    });

    await newMaterial.save();

    res.status(200).json({ message: "Archivo subido y guardado", material: newMaterial });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al guardar archivo" });
  }
});


router.get("/materials", async (req, res) => {
  try {
    const materials = await Material.find().populate("uploadedBy", "name").sort({ createdAt: -1 });
    res.status(200).json(materials);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al obtener materiales" });
  }
});


module.exports = router;