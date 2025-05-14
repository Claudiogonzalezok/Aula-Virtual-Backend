const Class = require('../models/Class');

exports.createClass = async (req, res) => {
  try {
    const { title, description, contentUrl, type, course } = req.body;

    const newClass = new Class({
      title,
      description,
      contentUrl,
      type,
      course
    });

    const saved = await newClass.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ msg: 'Error al crear la clase', error });
  }
};
