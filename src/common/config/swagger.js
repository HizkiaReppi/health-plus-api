import swaggerJsdoc from 'swagger-jsdoc';
import config from './config.js';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Health Plus API',
      version: '1.0.0',
      description: 'API documentation for Health Plus application',
    },
    servers: [
      {
        url: `${config.app.url}:${config.app.port}/api/v1`,
      },
    ],
  },
  apis: ['./**/*.route.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;
