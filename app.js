const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

// const { errors } = require('celebrate');
const rateLimiter = require('./middleware/rate-limiter');
const { requestLogger, errorLogger } = require('./middleware/logger');
const { PORT, DATABASE_ADDRESS } = require('./configs/config');
const routes = require('./routes');
const errorHandler = require('./middleware/error-handler');
const parseCelebError = require('./middleware/parse-celeb-error');

mongoose.connect(DATABASE_ADDRESS, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
const app = express();

app.use(rateLimiter);
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
app.use(parseCelebError);
// app.use(errors());
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Сервер запущен, порт: ${PORT}.`);
});
