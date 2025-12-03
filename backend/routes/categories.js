const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();
const DATA_FILE = path.join(__dirname, '..', 'data', 'categories.json');

function load() {
  if (!fs.existsSync(DATA_FILE)) return [];
  return JSON.parse(fs.readFileSync(DATA_FILE));
}
function save(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// GET all categories
router.get('/', (req, res) => {
  const all = load();
  res.json(all);
});

// POST create category
router.post('/', (req, res) => {
  const { name, slug } = req.body;
  if (!name || !name.trim()) return res.status(400).json({ error: 'Category name required' });
  const all = load();
  // prevent duplicates by name (case-insensitive)
  const exists = all.find(c => c.name.toLowerCase() === name.trim().toLowerCase());
  if (exists) return res.status(409).json({ error: 'Category already exists' });

  const n = {
    id: uuidv4(),
    name: name.trim(),
    slug: (slug && slug.trim()) || name.trim().toLowerCase().replace(/\s+/g, '-'),
    created_at: new Date().toISOString()
  };
  all.push(n);
  save(all);
  res.json(n);
});

// PUT rename/update category
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, slug } = req.body;
  const all = load();
  const idx = all.findIndex(c => c.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Category not found' });
  if (name && name.trim()) all[idx].name = name.trim();
  if (slug && slug.trim()) all[idx].slug = slug.trim();
  all[idx].updated_at = new Date().toISOString();
  save(all);
  res.json(all[idx]);
});

// DELETE category
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  let all = load();
  const before = all.length;
  all = all.filter(c => c.id !== id);
  save(all);
  res.json({ deleted: before - all.length });
});

module.exports = router;
