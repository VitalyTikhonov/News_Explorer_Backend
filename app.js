const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');

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

app.use(helmet());
app.use(rateLimiter);
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(routes);
app.use(errorLogger);
app.use(parseCelebError);
app.use(errorHandler);
app.listen(PORT);
