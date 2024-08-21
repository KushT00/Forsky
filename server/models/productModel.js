// models/userModel.js
const pool = require('../db');

const getProducts = async () => {
  try {
    const res = await pool.query('SELECT * FROM products');
    return res.rows;
  } catch (err) {
    throw err;
  }
};

const addProducts = async ({ name, description, price, stock_quantity, image, sub_categories, category_name }) => {
  const query = `
    INSERT INTO products (name, description, price, stock_quantity, image, sub_categories, category_name)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `;

  const values = [name, description, price, stock_quantity, image, sub_categories, category_name];

  const result = await pool.query(query, values);
  return result.rows[0];
};

const putProducts =async (req, res) => {
  
  const { product_id } = req.params;
  const { name, description, price, category_id, stock_quantity } = req.body;
  try {
    const updatedProduct = await pool.query(
      'UPDATE products SET name = $1, description = $2, price = $3, category_id = $4, stock_quantity = $5 WHERE product_id = $6 RETURNING *',
      [name, description, price, category_id, stock_quantity, product_id]
    );
    if (updatedProduct.rows.length === 0) {
      return res.status(404).send('Product not found');
    }
    res.json(updatedProduct.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const delProduct=async (req, res) => {
  
  const { product_id } = req.params;
  try {
    const deletedProduct = await pool.query(
      'DELETE FROM products WHERE product_id = $1 RETURNING *',
      [product_id]
    );
    if (deletedProduct.rows.length === 0) {
      return res.status(404).send('Product not found');
    }
    res.send(`Product with product_id ${product_id} was deleted`);
  } catch (err) {
    res.status(500).send(err.message);
  }
}


module.exports = { getProducts,addProducts,putProducts,delProduct };
