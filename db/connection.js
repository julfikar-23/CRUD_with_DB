const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',      // your DB host
  user: 'root',           // your DB username
  password: '',           // your DB password
  database: 'task_manager' // your DB name
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as ID ' + db.threadId);
});

module.exports = db;
