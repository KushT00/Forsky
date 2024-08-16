// models/userModel.js
const pool = require('../db');

const getCategory = async () => {
  try {
    const res = await pool.query('SELECT * FROM categories ORDER BY category_id ASC ');
    return res.rows;
  } catch (err) {
    throw err;
  }
};

const addSubCategory = async (req, res) => {
  const { categoryId, subCategory } = req.body;

  try {
    // Check if the category with the given ID exists
    const existingCategory = await pool.query(
      'SELECT * FROM categories WHERE category_id = $1',
      [categoryId]
    );

    if (existingCategory.rows.length === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }

    // Check if the subCategory already exists in the array
    const subCategoriesArray = existingCategory.rows[0].sub_categories || [];
    if (subCategoriesArray.includes(subCategory)) {
      return res.status(400).json({ error: 'Subcategory already exists' });
    }

    // Add the subCategory to the sub_categories array
    const updatedCategory = await pool.query(
      'UPDATE categories SET sub_categories = array_append(sub_categories, $2) WHERE category_id = $1 RETURNING *',
      [categoryId, subCategory]
    );

    res.json(updatedCategory.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
};


const postCategory = async (req, res) => {
  const { name, description } = req.body;
  try {
    // Check if a category with the same name already exists
    const existingCategory = await pool.query(
      'SELECT * FROM categories WHERE name = $1',
      [name]
    );

    if (existingCategory.rows.length > 0) {
      return res.status(400).json({ error: 'Category already exists' });
    }

    // Insert the new category
    const newCategory = await pool.query(
      'INSERT INTO categories (name, description ) VALUES ($1, $2) RETURNING *',
      [name, description]
    );
    res.json(newCategory.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
const putCategory =  async (req, res) => {
  const { category_id } = req.params;
  const { name, description } = req.body;
  try {
    const updatedCategory = await pool.query(
      'UPDATE categories SET name = $1, description = $2 WHERE category_id = $3 RETURNING *',
      [name, description, category_id]
    );
    if (updatedCategory.rows.length === 0) {
      return res.status(404).send('Category not found');
    }
    res.json(updatedCategory.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
const delCategory=async (req, res) => {
  const { category_id } = req.params;
  try {
    const deletedCategory = await pool.query(
      'DELETE FROM categories WHERE category_id = $1 RETURNING *',
      [category_id]
    );
    if (deletedCategory.rows.length === 0) {
      return res.status(404).send('Category not found');
    }
    res.send(`Category with category_id ${category_id} was deleted`);
  } catch (err) {
    res.status(500).send(err.message);
  }
}


module.exports = { getCategory,postCategory,putCategory,delCategory,addSubCategory};
