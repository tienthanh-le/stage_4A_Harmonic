/** @format */

const express = require('express');
const app = express();
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const port = process.env.PORT || 8001;

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: '1.0.0',
      title: 'API',
      description: 'API Information',
      contact: {
        name: 'Le Tien',
      },
      servers: ['http://localhost:8001'],
    },
  },
  // ['.routes/*.js']
  apis: ['app.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
/**
 * @swagger
 * /api:
 *  get:
 *    description: Use to request api data
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.get('/api', (req, res) => {
  // res.status(200).send('Customer results');
  res.status(200).json({
    sucess: true,
    msg: 'api data',
  });
});

/**
 * @swagger
 * /api:
 *    put:
 *      description: Use to return all customers
 *    parameters:
 *      - name: customer
 *        in: query
 *        description: Name of our customer
 *        required: false
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '201':
 *        description: Successfully created user
 */
app.put('/api', (req, res) => {
  res.status(200).send('Update');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
