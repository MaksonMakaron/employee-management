const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const employees = require('./api/employee.js');
const positions = require('./api/position.js');

app.use(employees);
app.use(positions);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
