var express = require('express');
var router = express.Router();
require('dotenv').config();
const BigQuery = require('@google-cloud/bigquery');

/* GET users listing. */
router.get('/:query_id', function(req, res, next) {
  queryStackOverflow('nodejs-bigquery',req.params.query_id)
  .then((result) => res.send(result))
});

function queryStackOverflow(projectId,query_id) {

  // Creates a client
  const bigquery = new BigQuery({
    projectId: projectId,
  });

  var sqlQuery

  console.log('query_id:',query_id)

  switch(query_id){
    case '1':
      // The SQL query to run
      sqlQuery = `SELECT
      id,
      CONCAT(
        'https://stackoverflow.com/questions/',
        CAST(id as STRING)) as url,
      view_count,
      title,
      creation_date,
      answer_count
      FROM \`bigquery-public-data.stackoverflow.posts_questions\`
      ORDER BY view_count DESC
      LIMIT 10`;
      break;
    case '2':
      // The SQL query to run
      sqlQuery = `SELECT
      id,
      CONCAT(
        'https://stackoverflow.com/questions/',
        CAST(id as STRING)) as url,
      view_count,
      title,
      creation_date,
      answer_count
      FROM \`bigquery-public-data.stackoverflow.posts_questions\`
      ORDER BY creation_date DESC
      LIMIT 10`;
      break;
    case '3':
      // The SQL query to run
      sqlQuery = `SELECT
      id,
      CONCAT(
        'https://stackoverflow.com/questions/',
        CAST(id as STRING)) as url,
      view_count,
      title,
      creation_date,
      answer_count
      FROM \`bigquery-public-data.stackoverflow.posts_questions\`
      ORDER BY answer_count DESC
      LIMIT 10`;
      break;
  }
  

  // Query options list: https://cloud.google.com/bigquery/docs/reference/v2/jobs/query
  const options = {
    query: sqlQuery,
    useLegacySql: false, // Use standard SQL syntax for queries.
  };

  // Runs the query
  return bigquery
    .query(options)
    .then(results => {
      const rows = results[0];
      return rows
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
}

function printResult(rows) {
  console.log('Query Results:');
  rows.forEach(function (row) {
    let url = row['url'];
    let viewCount = row['view_count'];
    console.log(`url: ${url}, ${viewCount} views`);
  });
}

module.exports = router;
