const express = require('express');
const cors = require('cors')
const bodyparser = require('body-parser')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');
const paymentRoutes = require('./routes/payment.routes');
const webpayRoutes = require('./routes/webpay.routes');
require ('dotenv').config()

const app = express();
const port = process.env.PORT || 3000;


app.use(cors());
app.use(bodyparser.json());

//Routes
app.use('/payment', paymentRoutes);
app.use('/pay', webpayRoutes);

// Documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});