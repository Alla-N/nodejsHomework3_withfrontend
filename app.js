const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const bodyParser = require('body-parser');
const cors = require('cors');

const {port: serverPort} = config.get('webServer');
const {protocol, host, port, name} = config.get('dataBase');
const mongoURL = `${protocol}://${host}:${port}/${name}`;
const registrationRouter = require('./server/api/routes/registration');
const loginRouter = require('./server/api/routes/login');
const userRouter = require('./server/api/routes/user');
const changePasswordRouter = require('./server/api/routes/changePassword');
const truckRouter = require('./server/api/routes/truck');


const start = async () => {
  try {
    await mongoose.connect(mongoURL,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
        },
    );
  } catch (e) {
    console.log('Server Error', e.message);
    process.exit(1);
  }
};

start();

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json({extended: true}));

app.use('/api', registrationRouter);
app.use('/api', loginRouter);
app.use('/api', userRouter);
app.use('/api', changePasswordRouter);
app.use('/api', truckRouter);

app.listen(serverPort, (err) => {
  if (err) {
    console.log(err);
  }

  console.log(`server is listening on ${serverPort}`);
});
