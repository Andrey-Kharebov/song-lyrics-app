const express = require('express');
const keys = require('./keys/index');

const app = express();

const PORT = keys.PORT || 5000;

app.listen(PORT, () => console.log(`App has been started on port ${PORT}`));
