
import app from "./src/app.js";



// console.log(process.env.PORT)
const PORT = process.env.PORT ;


app.listen(PORT , ()=>{
    console.log(`server running on port = ${PORT}`);
})