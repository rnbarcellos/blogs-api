const express = require('express');
const { userController } = require('./controller');
const loginMiddleware = require('./middlewares/login.middleware');
const { userRouter, categoryRouter } = require('./routes');

// ...

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());
app.use('/user', userRouter);
app.use('/categories', categoryRouter);

app.post('/login', loginMiddleware, userController.login);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
