const pool = require('../db');

const fetchdiscounts = async (req, res) => {
    try {
      const discounts = await pool.query('SELECT * FROM discounts');
      res.json(discounts.rows);
    } catch (err) {
      res.status(500).send(err.message);
    }
  };

  const postdiscounts = async (req, res) => {
    const { code, description, discount_percentage, valid_until } = req.body;
    try {
      const newDiscount = await pool.query(
        'INSERT INTO discounts (code, description, discount_percentage, valid_until) VALUES ($1, $2, $3, $4) RETURNING *',
        [code, description, discount_percentage, valid_until]
      );
      res.json(newDiscount.rows[0]);
    } catch (err) {
      res.status(500).send(err.message);
    }
  };

  const putdiscounts=  async (req, res) => {
    const { discount_id } = req.params;
    const { code, description, discount_percentage, valid_until } = req.body;
    try {
      const updatedDiscount = await pool.query(
        'UPDATE discounts SET code = $1, description = $2, discount_percentage = $3, valid_until = $4 WHERE discount_id = $5 RETURNING *',
        [code, description, discount_percentage, valid_until, discount_id]
      );
      if (updatedDiscount.rows.length === 0) {
        return res.status(404).send('Discount not found');
      }
      
      res.json(updatedDiscount.rows[0]);
    } catch (err) {
      res.status(500).send(err.message);
    }
  };


  const deldiscounts = async (req, res) => {
    const { discount_id } = req.params;
    try {
      const deletedDiscount = await pool.query('DELETE FROM discounts WHERE discount_id = $1 RETURNING *', [discount_id]);
      if (deletedDiscount.rows.length === 0) {
        return res.status(404).send('Discount not found');
      }
      res.send(`Discount with discount_id ${discount_id} was deleted`);
    } catch (err) {
      res.status(500).send(err.message);
    }
  };


  module.exports = { fetchdiscounts,postdiscounts,putdiscounts,deldiscounts };
