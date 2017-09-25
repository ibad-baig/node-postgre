var express = require('express');
var Promise = require('bluebird');
const { Pool } = Promise.promisifyAll(require('pg'));
const dbConfig = require('../../dbconfig');
var router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  const qry = 'SELECT * FROM users';
  let pool = new Pool(dbConfig);
  pool.query(qry)
    .then(result => {
      res.send(result.rows);
  })
    .catch(err => { res.send({'error': err.message });
  });
});

router.get('/:id', (req, res, next) => {
  const qry = `SELECT * FROM users where id=${req.params.id}`;
  const pool = new Pool(dbConfig);
  pool.query(qry)
    .then(result => {
      res.send(result.rows[0]);
    })
    .catch(err => { res.send({ 'error': err.message });
    });
});

router.post('/', (req, res, next) => {
  const qry = `INSERT INTO users values(default, '${req.body.username}', '${req.body.email}')`;
  let pool = new Pool(dbConfig);
  pool.query(qry)
    .then(() => {
      res.send();
    })
    .catch(err => { res.send({ 'error': err.message });
    });
});

router.put('/:id', (req, res, next) => {
  let qry = `UPDATE users set`;
  if (req.body.username) {
    qry += ` username='${req.body.username}',`;
  }

  if (req.body.email) {
    qry += ` email='${req.body.email}',`;
  }

  qry = qry.substring(0, qry.length - 1);
  qry += ` WHERE id=${req.params.id}`;

  const pool = new Pool(dbConfig);
  pool.query(qry)
    .then(() => {
      res.end();
    })
    .catch(err => { res.send({ 'error': err.message }); });
});

router.delete('/:id', (req, res, next) => {
  const qry = `DELETE FROM users where id=${req.params.id}`;
  let pool = new Pool(dbConfig);
  pool.query(qry)
    .then(() => {
      res.end();
    })
    .catch(err => { res.send({ 'error': err.message }); });
});

module.exports = router;
