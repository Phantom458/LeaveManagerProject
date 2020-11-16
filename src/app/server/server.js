//Required modules
const jsonServer = require('json-server');
const fs = require('fs');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

//Returning express server and router
const server = jsonServer.create();
const router = jsonServer.router('db.json');

//Reading and parsing. Table for registered users
const userDb = JSON.parse(fs.readFileSync('./db.json', 'UTF-8'));

//Setting default middlewares - functions that execute during lifecycle of a request
server.use(jsonServer.defaults());
//Middleware setting with bodyParser
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());

//To sign payload (unique values for users) and time for token to expire
const SECRET_KEY = '123456789';
const expiresIn = '1h';

const users = userDb.Users;

const leave = userDb.Leaves;

function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, {expiresIn})
}
function verifyToken(token){
  return  jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ?  decode : err)
}

function isAuthenticated({email, password}) {
  return users.find(user => user.email === email && user.password === password)
}

//Check is user exists then create and send a JWT token
server.post('/guards/login', (req, res) => {
  const {email, password} = req.body;
  if (isAuthenticated({email, password}) === false) {
    const status = 401;
    const message = "Incorrect email or Password";
    res.status(status).json({status, message});
    return
  }
  const access_token = createToken({email, password});
  res.status(200).json({access_token});
});

//Middleware that checks if authoriztion header has bearer scheme and verifies token for all routes except previous
server.use(/^(?!\/auth).*$/,  (req, res, next) => {
  if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
    const status = 401
    const message = 'Bad authorization header'
    res.status(status).json({status, message})
    return
  }
  try {
    verifyToken(req.headers.authorization.split(' ')[1])
    next()
  } catch (err) {
    const status = 401
    const message = 'Error: access_token is not valid'
    res.status(status).json({status, message})
  }
})

server.get('/Users', (req, res) => {
  res.json(users);
});
server.get('/Leaves', (req, res) => {
  res.json(leave);
});

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running in http://localhost:3000');
});
