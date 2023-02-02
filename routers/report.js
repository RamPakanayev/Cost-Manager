const express = require('express');
const router = express.Router();
const { costDoc } = require('../db/db');
const url = require('url');

// Route to get a report of expenses based on user_id, year, month, and day
router.get('/', async (req, res) => {
  console.log('Processing report');

  const queryObject = url.parse(req.url, true).query;
  const userId = queryObject.user_id;
  const year = String(queryObject.year);
  const month = String(queryObject.month);
  const day = queryObject.day;

  let query = { cost_user_id: userId };
  if (year) {
    query.cost_year = year;
  }
  if (month) {
    query.cost_month = month;
  }
  if (day) {
    query.cost_day = day;
  }

  let result;
  try {
    result = await costDoc.find(query).exec();
  } catch (error) {
    console.error(error);
  }

  const report = {
    food: [],
    health: [],
    housing: [],
    sport: [],
    education: [],
    transportation: [],
    other: [],
  };

  for (const cost of result) {
    switch (cost.category) {
      case 'food':
        report.food.push({
          day: cost.day,
          description: cost.description,
          sum: cost.sum,
        });
        break;
      case 'health':
        report.health.push({
          day: cost.day,
          description: cost.description,
          sum: cost.sum,
        });
        break;
      case 'housing':
        report.housing.push({
          day: cost.day,
          description: cost.description,
          sum: cost.sum,
        });
        break;
      case 'sport':
        report.sport.push({
          day: cost.day,
          description: cost.description,
          sum: cost.sum,
        });
        break;
      case 'education':
        report.education.push({
          day: cost.day,
          description: cost.description,
          sum: cost.sum,
        });
        break;
      case 'transportation':
        report.transportation.push({
          day: cost.day,
          description: cost.description,
          sum: cost.sum,
        });
        break;
      default:
        report.other.push({
          day: cost.day,
          description: cost.description,
          sum: cost.sum,
        });
    }
  }

  res.send(report);
});

module.exports = router;
