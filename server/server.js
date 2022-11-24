require("dotenv").config()
const database = require("./config/database/database")
const app = require("./app")
require("./models/Courses")
require("./models/Students")
require("./models/Users")
require("./models/Attachments")

database.authenticate().then(()=> {
    console.log("Database successfully connected");
    database.sync({
        // force: true
    })
}).catch(error => {
    console.log(error);
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})