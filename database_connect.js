const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',        // DB 사용자 이름
  password: '1234', // DB 비밀번호
  database: 'transdb'   // 사용할 데이터베이스 이름
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});