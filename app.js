// const rateLimit = require('express-rate-limit');
const express = require('express');
// const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const { requestLogger, errorLogger } = require('./middleware/logger');

const { PORT, DATABASE_ADDRESS } = require('./configs/config');
const routes = require('./routes/routes');
// const celebValidateRequest = require('./middleware/requestValidators');

mongoose.connect(DATABASE_ADDRESS, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
const app = express();

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
// });

// app.use(limiter);
app.use(bodyParser.json());
// app.use(cookieParser());
// app.use(requestLogger);
// app.get(`${BASE_PATH}/crash-test`, () => {
//   setTimeout(() => {
//     throw new Error('Сервер сейчас упадёт');
//   }, 0);
// });

app.use(routes);
// app.use(errorLogger);
// app.use(celebValidateRequest);
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500
      ? `На сервере произошла ошибка: ${message}`
      : message,
  });
  next();
});
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Сервер запущен, порт: ${PORT}.`);
});
