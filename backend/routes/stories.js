const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

const DATA_FILE = path.join(__dirname, '..', 'data', 'stories.json');

// load stories
function loadStories() {
  return JSON.parse(fs.readFileSync(DATA_FILE));
}

// save stories
function saveStories(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// GET all stories
router.get('/', (req, res) => {
  const allStories = loadStories();
  res.json(allStories);
});

// CREATE story
router.post('/', (req, res) => {
  const allStories = loadStories();
  const newStory = {
    id: uuidv4(),
    created_at: new Date().toISOString(),
    ...req.body
  };

  allStories.unshift(newStory);
  saveStories(allStories);

  res.json(newStory);
});

// DELETE story
router.delete('/:id', (req, res) => {
  const allStories = loadStories();
  const beforeLen = allStories.length;

  const updatedStories = allStories.filter(s => s.id !== req.params.id);

  saveStories(updatedStories);

  res.json({
    deleted: beforeLen - updatedStories.length
  });
});

module.exports = router;
