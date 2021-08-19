import express from 'express';

const app = express();

//Routes

app.use('/',require('./routes/login'));
app.use('/users',require('./routes/users'));

////////////////
app.get('/REST_API', (req, res) => {
  res.send('Hello World!');
});

app.post('/REST_API', (req, res) => {
  return res.send('Received a POST HTTP method');
});
 
app.put('/REST_API/:userId', (req, res) => {
  return res.send(
    `PUT HTTP method on user/${req.params.userId} resource`,
  );
});
 
app.delete('/REST_API/:userId', (req, res) => {
  return res.send(
    `DELETE HTTP method on user/${req.params.userId} resource`,
  );
});

app.listen(8001,"127.0.0.2", () =>
  console.log('Example app listening on port 8001!'),
);
