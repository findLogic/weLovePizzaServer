// Load the MySQL pool connection
const pool = require('../data/config');
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

const router = (app) => {
  // TESTING
  app.get('/', (req, res) => {
    res.send({
      message: 'Node.js and Express REST API',
    });
  });

  //////////////////
  // PIZZAS SECTION
  ///////////////////
  app.get('/pizzas', (req, res) => {
    pool.query('SELECT * FROM pizzas', (err, result) => {
      if (err) throw err;

      res.send(result);
    });
  });

  //////////////////
  // CURRENCY SECTION
  ///////////////////
  app.get('/currency', (req, res) => {
    pool.query('SELECT * FROM currencyDB', (err, result) => {
      if (err) throw err;

      res.send(result);
    });
  });

  //////////////////
  // USERS SECTION
  ///////////////////

  // get a single user by login
  app.get('/users/:str', jsonParser, (req, res) => {
    const login = req.params.str.split('...')[0].slice(1);
    const password = req.params.str.split('...')[1];
    pool.query(
      'SELECT * FROM users WHERE login = ? and password = ?',
      [login, password],

      (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
      },
    );
  });

  // Add a new user
  app.post('/users', (req, res) => {
    pool.query('INSERT INTO users SET ?', [req.body], (err, result) => {
      if (err) throw err;
      const id = result.insertId;
      res.status(201).send({ id });
    });
  });

  // Update an existing user
  app.put('/users/:id', (req, res) => {
    const id = req.params.id;
    pool.query(
      'UPDATE users SET orders=? WHERE id = ?',
      [req.body, id],
      (err, result) => {
        if (err) throw err;

        res.send('User update successfully');
      },
    );
  });

  // Delete a user
  app.delete('/users/:id', (req, res) => {
    const id = req.params.id;

    pool.query('DELETE FROM users WHERE id = ?', id, (err, result) => {
      if (err) throw err;

      res.send('User deleted.');
    });
  });
};

module.exports = router;
