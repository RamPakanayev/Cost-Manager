const express = require("express");
const app = express();

const addcost = require('./routers/addCost');
const report = require('./routers/report');
const about= require('./routers/about');

app.use('/',addcost);
app.use('/',report);
app.use('/',about);


app.listen(1300);

//http://localhost:1300/addcost?user_id=shahar1&year=1992&month=5&day=3&id=123&description=veryGood&category=food&sum=90.99
//http://localhost:1300/report?user_id=shahar1&year=1992&month=5
//http://localhost:1300/report?user_id=Ram1&year=2008&month=5
