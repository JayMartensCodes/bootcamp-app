const { Pool } = require('pg');

const pool = new Pool({
  user: 'Jay',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

pool.query(`SELECT DISTINCT teachers.name teacher, cohorts.name cohort
FROM assistance_requests
JOIN teachers ON teachers.id = assistance_requests.teacher_id
JOIN students ON assistance_requests.student_id = students.id
JOIN cohorts ON students.cohort_id = cohorts.id
WHERE cohorts.name = '${process.argv[2] || 'JUL02'}'
ORDER BY teacher;
`).then(res => {
  res.rows.forEach(row => {
    console.log(`${row.cohort}: ${row.teacher}`);
  });
})
  .catch(err => console.error('query error', err.stack));