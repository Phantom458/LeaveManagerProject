const jsonServer = require('json-server');
const fs = require('fs');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middleWares = jsonServer.defaults();
const userDb = JSON.parse(fs.readFileSync('./db.json', 'UTF-8'));

server.use(middleWares);
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());

const SECRET_KEY = '123456789';

const users = userDb.Users;

const leave = userDb.Leaves;

const expiresIn = '1h';

function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, {expiresIn})
}

function isAuthenticated({email, password}) {
  return users.find(user => user.email === email && user.password === password)
}

server.post('/auth/login', (req, res) => {
  const {email, password} = req.body;
  const check = isAuthenticated({email, password});
  if (check === null) {
    const status = 401;
    const message = "Incorrect email or Password";
    res.status(status).json({status, message});
    return
  }
  const access_token = createToken({email, password});
  res.status(200).json({access_token, user: check });
});

server.get('/Leaves', (req, res) => {
  res.json(leave);
});

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running in http://localhost:3000');
});
