const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const storiesRoute = require('./routes/stories');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

// Routes
app.use('/api/stories', storiesRoute);

// Default health check
app.get('/', (req, res) => {
  res.json({ status: "Backend running" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
