const express = require('express');
const cors = require('cors')
const bodyparser = require('body-parser')
const paymentRoutes = require('./routes/payment.routes');
require ('dotenv').config()

const app = express();
const port = process.env.PORT || 3000;


app.use(cors());
app.use(bodyparser.json());

//Routes
app.use('/payment', paymentRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
}); 