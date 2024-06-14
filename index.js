import dotenv from "dotenv";
import app from "./src/app.js";



dotenv.config({path:"./config.env"});
// dotenv.config();
// const declarations
console.log(process.env.PORT)
const PORT = process.env.PORT ;


app.listen(PORT , ()=>{
    console.log(`server running on port = ${PORT}`);
})