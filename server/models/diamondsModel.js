// models/userModel.js
const pool = require('../db');
const multer = require('multer');
const path = require('path');

const getDiamonds = async () => {
  try {
    const res = await pool.query('SELECT * FROM diamonds');
    return res.rows;
  } catch (err) {
    throw err;
  }
};




const addDiamonds = async (req, res) => {
  const {
    diamond_id,
    shape,
    color,
    clarity,
    certificate,
    fluorescence,
    make,
    cut,
    polish,
    symmetry,
    table_percentage,
    depth_percentage,
    length_mm,
    width_mm,
    depth_mm,
    price // Include price in the request body
  } = req.body;

  try {
    // Check if the diamond_id already exists
    const existingDiamond = await pool.query('SELECT * FROM diamonds WHERE diamond_id = $1', [diamond_id]);
    
    if (existingDiamond.rows.length > 0) {
      return res.status(400).send('Diamond ID already exists');
    }

    // Handle multiple images
    const images = req.files ? req.files.map(file => file.filename) : null;

    // Insert the new diamond, including the image filenames if provided
    const newDiamond = await pool.query(
      'INSERT INTO diamonds (diamond_id, shape, color, clarity, certificate, fluorescence, make, cut, polish, symmetry, table_percentage, depth_percentage, length_mm, width_mm, depth_mm, price, images) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) RETURNING *',
      [
        diamond_id,
        shape,
        color,
        clarity,
        certificate,
        fluorescence,
        make,
        cut,
        polish,
        symmetry,
        table_percentage,
        depth_percentage,
        length_mm,
        width_mm,
        depth_mm,
        price,
        images ? `{${images.join(',')}}` : null // Save array of image filenames or null
      ]
    );
    
    res.json(newDiamond.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
};




const putDiamonds =async (req, res) => {
  const { diamond_id } = req.params;
  const { shape, color, clarity, certificate, fluorescence, make, cut, polish, symmetry, table_percentage, depth_percentage, length_mm, width_mm, depth_mm } = req.body;
  try {
    const updatedDiamond = await pool.query(
      'UPDATE diamonds SET shape = $1, color = $2, clarity = $3, certificate = $4, fluorescence = $5, make = $6, cut = $7, polish = $8, symmetry = $9, table_percentage = $10, depth_percentage = $11, length_mm = $12, width_mm = $13, depth_mm = $14 WHERE diamond_id = $15 RETURNING *',
      [shape, color, clarity, certificate, fluorescence, make, cut, polish, symmetry, table_percentage, depth_percentage, length_mm, width_mm, depth_mm, diamond_id]
    );
    if (updatedDiamond.rows.length === 0) {
      return res.status(404).send('Diamond not found');
    }
    res.json(updatedDiamond.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
const delDiamonds= async (req, res) => {
  const { diamond_id } = req.params;
  try {
    const deletedDiamond = await pool.query('DELETE FROM diamonds WHERE diamond_id = $1 RETURNING *', [diamond_id]);
    if (deletedDiamond.rows.length === 0) {
      return res.status(404).send('Diamond not found');
    }
    res.send(`Diamond with diamond_id ${diamond_id} was deleted`);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

module.exports = { getDiamonds,addDiamonds,putDiamonds,delDiamonds };
