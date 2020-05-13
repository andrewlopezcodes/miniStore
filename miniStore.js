const express = require('express');
const bodyParser = require('body-parser');
const usersRepository = require('./repositories/users');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', (req, res) => {
  res.send(`
    <div>
      <form method="POST">
        <input placeholder = "email" name="email" />
        <input placeholder = "password" name="password" />
        <input placeholder = "password confirmation" name="passwordconfirmation" />
        <button type="submit" >Sign Up</button>
      </form>
    </div>
  `)
});


app.post('/', async (req, res) => {
  const {
    email,
    password,
    passwordconfirmation
  } = req.body;
  const existingUser = await usersRepository.getFiltered({
    email: email
  });
  if (existingUser) {
    return res.send('Email Already Registered')
  }

  if (password !== passwordconfirmation) {
    return res.send('Passwords Do Not Match');
  }

  const user = await usersRepository.create({
    email,
    password
  });


  res.send('Account created!!')
});










app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});