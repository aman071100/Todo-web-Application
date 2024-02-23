const app  = require('./app');
const dbConnection = require('./database/db');
// const { errorHandlerMiddleWare } = require('./middleware/errorHandler');

dbConnection();

app.listen(process.env.PORT, ()=>{
    console.log("Server is running.")
});
