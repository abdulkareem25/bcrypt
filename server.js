const app = require('./src/app');
const connectDB = require('./src/config/db');



app.listen(process.env.PORT, () => {
    console.log("Server is running on port:", process.env.PORT);
    connectDB();
});