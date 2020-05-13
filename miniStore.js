const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const usersRepository = require('./repositories/users');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cookieSession({
  keys: ['iaufbyoiac1q7bpbevaqupo765886.,m.,,ncv']
}));

app.get('/signup', (req, res) => {
  res.send(`
    <div>
      Your Id is : ${req.session.userId}
      <form method="POST">
        <input placeholder = "email" name="email" />
        <input placeholder = "password" name="password" />
        <input placeholder = "password confirmation" name="passwordconfirmation" />
        <button type="submit" >Sign Up</button>
      </form>
    </div>
  `)
});


app.post('/signup', async (req, res) => {
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

  req.session.userId = user.id;

  res.send('Account created!!')
});

app.get('/signout', (req, res) => {
  req.session = null;
  res.send('You are logged out.');
});

app.get('/signin', (req, res) => {
  res.send(`
  <div>
  <form method="POST">
    <input placeholder = "email" name="email" />
    <input placeholder = "password" name="password" />
    <button type="submit" >Sign In</button>
  </form>
</div>
  `)
});

app.post('/signin', async (req, res) => {
  const {
    email,
    password
  } = req.body;

  const user = await usersRepository.getFiltered({
    email: email
  });

  if (!user) {
    return res.send('Check your information again!');
  }

  if (user.password !== password) {
    return res.send('Check your information again!');
  }

  req.session.userId = user.id;

  res.send("Welcome")

});








app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});