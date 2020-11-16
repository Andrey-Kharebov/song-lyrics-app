const express = require('express');
const keys = require('./keys/index');
const mongoose = require('mongoose');

const app = express();

app.use(express.json({ extended: true }));

app.use('/', require('./routes/app.routes'));

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await mongoose.connect(keys.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}`));
  } catch (e) {
    console.log('Server Error: ', e.message);
    process.exit(1);
  }
}

start();

