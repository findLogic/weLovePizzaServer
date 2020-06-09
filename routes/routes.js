// Load the MySQL pool connection
const pool = require('../data/config');

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

  // Display a single user by ID
  app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    console.log('truing to use id ', id);
    pool.query('SELECT * FROM users WHERE id = ?', id, (err, result) => {
      if (err) throw err;

      res.send(result);
    });
  });

  // Add a new user
  app.post('/users', (req, res) => {
    console.log(req.body);
    pool.query('INSERT INTO users SET ?', req.body, (err, result) => {
      if (err) throw err;
      res.status(201).send(`User added with ID: ${result.insertId}`);
    });
  });

  // Update an existing user
  app.put('/users/:id', (req, res) => {
    const id = req.params.id;

    pool.query(
      'UPDATE users SET ? WHERE id = ?',
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
