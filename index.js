const express = require('express');
const keys = require('./keys/index');
const mongoose = require('mongoose');

const app = express();

app.use('/app', require('./routes/app.routes'));

const PORT = keys.PORT || 5000;

async function start() {
  try {
    await mongoose.connect(keys.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}`));
  } catch (e) {
    console.log('Server Error: ', e.message);
    process.exit(1);
  }
}

start();

