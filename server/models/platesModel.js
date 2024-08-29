// models/userModel.js
const pool = require('../db');

const getPlates = async () => {
  try {
    const res = await pool.query('SELECT * FROM plates');
    return res.rows;
  } catch (err) {
    throw err;
  }
};

const addPlates = async (req, res) => {
  const { plate_id, size, diameter, thickness, carat_weight_ea, plate_type, material, price } = req.body;

  try {
    const newPlate = await pool.query(
      `INSERT INTO plates (plate_id, size, diameter, thickness, carat_weight_ea, plate_type, material, price)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [plate_id, size, diameter || null, thickness, carat_weight_ea, plate_type, material, price]
    );
    
    res.json(newPlate.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

const putPlates = async (req, res) => {
  const { plate_id } = req.params;
  const { size, diameter, thickness, carat_weight_ea, plate_type, material } = req.body;
  try {
    const updatedPlate = await pool.query(
      'UPDATE plates SET size = $1, diameter = $2, thickness = $3, carat_weight_ea = $4, plate_type = $5, material = $6 WHERE plate_id = $7 RETURNING *',
      [size, diameter, thickness, carat_weight_ea, plate_type, material, plate_id]
    );
    if (updatedPlate.rows.length === 0) {
      return res.status(404).send('Plate not found');
    }
    res.json(updatedPlate.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
const delPlates = async (req, res) => {
  const { plate_id } = req.params;
  try {
    const deletedPlate = await pool.query(
      'DELETE FROM plates WHERE plate_id = $1 RETURNING *',
      [plate_id]
    );
    if (deletedPlate.rows.length === 0) {
      return res.status(404).send('Plate not found');
    }
    res.send(`Plate with plate_id ${plate_id} was deleted`);
  } catch (err) {
    res.status(500).send(err.message);
  }
};



module.exports = { getPlates,addPlates,putPlates,delPlates };
