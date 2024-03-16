import express from 'express';
import config from './common/config/config.js';
import logger from './common/utils/logging.js';

const app = express();
const { port } = config.app;

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Selamat datang di HealthPlus API' });
});

app.listen(port, () => logger.info(`Server is running on port ${port}`));
