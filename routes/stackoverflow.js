var express = require('express');
var router = express.Router();
require('dotenv').config();
const BigQuery = require('@google-cloud/bigquery');

/* GET users listing. */
router.get('/', function(req, res, next) {
  queryStackOverflow('nodejs-bigquery')
  .then((result) => res.send(result))
});

function queryStackOverflow(projectId) {

  // Creates a client
  const bigquery = new BigQuery({
    projectId: projectId,
  });

  // The SQL query to run
  const sqlQuery = `SELECT
    id,
    CONCAT(
      'https://stackoverflow.com/questions/',
      CAST(id as STRING)) as url,
    view_count,
    title,
    creation_date,
    answer_count
    FROM \`bigquery-public-data.stackoverflow.posts_questions\`
    WHERE tags like '%google-bigquery%'
    ORDER BY view_count DESC
    LIMIT 10`;

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
