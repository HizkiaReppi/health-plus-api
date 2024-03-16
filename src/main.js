import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import config from './common/config/config.js';
import logger from './common/utils/logging.js';
import router from './routes.js';
import loggingMiddleware from './common/middleware/logging.middleware.js';
import errorMiddleware from './common/middleware/error.middleware.js';

const app = express();
const { port } = config.app;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(helmet());

app.use(loggingMiddleware);

app.use('/api/v1', router);

app.get('/api/v1', (req, res) => {
  logger.info('Welcome to HealthPlus API');
  res.status(200).json({ message: 'Welcome to HealthPlus API' });
});

app.use((req, res) => {
  const { originalUrl, method } = req;
  const message = `Page ${method} | ${originalUrl} Not Found`;
  logger.error(message);
  res.status(404).json({ message });
});

app.use(errorMiddleware);

app.listen(port, () => logger.info(`Server is running on port ${port}`));
