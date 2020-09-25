const rateLimit = require('express-rate-limit');
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const { requestLogger, errorLogger } = require('./middleware/logger');
const { PORT, DATABASE_ADDRESS } = require('./configs/config');
const routes = require('./routes/routes');
const errorHandler = require('./middleware/error-handler');
const celebValidateRequest = require('./middleware/requestValidators');

mongoose.connect(DATABASE_ADDRESS, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
const app = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);
// app.get(`${BASE_PATH}/crash-test`, () => {
//   setTimeout(() => {
//     throw new Error('Сервер сейчас упадёт');
//   }, 0);
// });
app.use(routes);
app.use(errorLogger);
app.use(celebValidateRequest);
app.use(errorHandler);
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Сервер запущен, порт: ${PORT}.`);
});
