const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const eventRoutes = require('./routes/eventRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/co-lab', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api', eventRoutes);

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
});
