// backend/routes/stories.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

const DATA_FILE = path.join(__dirname, '..', 'data', 'stories.json');

function loadStories() {
  if (!fs.existsSync(DATA_FILE)) return [];
  return JSON.parse(fs.readFileSync(DATA_FILE));
}

function saveStories(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// GET STORIES with optional category filter
router.get('/', (req, res) => {
  let all = loadStories();
  const category = req.query.category;

  if (category) {
    const catLower = category.toLowerCase();
    all = all.filter(s =>
      Array.isArray(s.categories) &&
      s.categories.some(c => c.toLowerCase() === catLower)
    );
  }

  res.json(all);
});

// GET single story
router.get('/:id', (req, res) => {
  const all = loadStories();
  const story = all.find(s => s.id === req.params.id);
  if (!story) return res.status(404).json({ error: "Not found" });
  res.json(story);
});

// CREATE story
router.post('/', (req, res) => {
  const { title, excerpt, content, thumbnail_url, categories } = req.body;
  
  const newStory = {
    id: uuidv4(),
    title,
    excerpt,
    content,
    thumbnail_url: thumbnail_url || "",
    categories: categories || [],
    created_at: new Date().toISOString()
  };

  const list = loadStories();
  list.unshift(newStory);
  saveStories(list);

  res.json(newStory);
});

// DELETE story
router.delete('/:id', (req, res) => {
  let all = loadStories();
  const before = all.length;
  all = all.filter(s => s.id !== req.params.id);
  saveStories(all);
  res.json({ deleted: before - all.length });
});

module.exports = router;


