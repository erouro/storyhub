const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

const DATA_FILE = path.join(__dirname, '..', 'data', 'stories.json');

function loadStories() {
  if (!fs.existsSync(DATA_FILE)) return [];
  return JSON.parse(fs.readFileSync(DATA_FILE));
}
function saveStories(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// GET all stories (supports ?category=Name or ?categorySlug=slug)
router.get('/', (req, res) => {
  let all = loadStories();
  const { category, categorySlug } = req.query;

  if (category) {
    const cat = String(category).toLowerCase();
    all = all.filter(s => Array.isArray(s.categories) && s.categories.some(c => String(c).toLowerCase() === cat));
  } else if (categorySlug) {
    const slug = String(categorySlug).toLowerCase();
    // Since we store only category names in story.categories, match by slugible form
    all = all.filter(s => Array.isArray(s.categories) && s.categories.some(c => slug === String(c).toLowerCase().replace(/\s+/g, '-')));
  }

  res.json(all);
});

// GET single story by id (optional convenience)
router.get('/:id', (req, res) => {
  const all = loadStories();
  const s = all.find(x => String(x.id) === String(req.params.id));
  if (!s) return res.status(404).json({ error: 'Not found' });
  res.json(s);
});

// CREATE story
router.post('/', (req, res) => {
  const allStories = loadStories();
  const {
    title,
    excerpt,
    content,
    thumbnail_url = '',
    categories = [],
    primary_tag = ''
  } = req.body;

  if (!title || !title.trim()) return res.status(400).json({ error: 'Title required' });

  // sanitize categories => ensure array of trimmed strings
  const cats = Array.isArray(categories) ? categories.map(c => String(c).trim()).filter(Boolean) : [];

  const newStory = {
    id: uuidv4(),
    title: title.trim(),
    excerpt: (excerpt || '').toString(),
    content: (content || '').toString(),
    thumbnail_url: thumbnail_url || '',
    categories: cats,
    primary_tag: primary_tag || (cats.length ? cats[0] : ''),
    created_at: new Date().toISOString()
  };

  allStories.unshift(newStory);
  saveStories(allStories);

  res.json(newStory);
});

// DELETE story
router.delete('/:id', (req, res) => {
  const all = loadStories();
  const before = all.length;
  const updated = all.filter(s => s.id !== req.params.id);
  saveStories(updated);
  res.json({ deleted: before - updated.length });
});

module.exports = router;

