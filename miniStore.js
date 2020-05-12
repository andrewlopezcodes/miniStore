const express = require('express');
const bodyParser = require('body-parser');

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


app.post('/', (req, res) => {
  console.log(req.body);
  res.send('Account created!!')
});










app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});