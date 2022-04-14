const express = require("express");
const app = express();
const PORT = 5000;
const mongoose  = require('mongoose');
const cors = require("cors");
const cookieParser = require('cookie-parser')
const authRoutes = require("./Routes/AuthRoutes")
// const Adminroute = require("./Routes/Admin.route")
const { checkuser } = require('./Middlewares/AuthMiddlewares');

const whiteList = ['http://127.0.0.1:5000', 'http://localhost:3000'];

const corsOption = {
    origin: (origin, callback) => {
        if(whiteList.indexOf(origin) !== -1 || !origin){
            callback(null, true);
        }else{
            callback(new Error(`Not allowed by CORS, ${origin}`));
        }
    },
    credentials: true,
    optionSuccessStatus: 200
}


// middelware

app.use(express.json());
app.use(cookieParser())
app.use(cors(corsOption));

//  database connect
// uri string i am using local database thats why not use username pass
mongoose.connect('mongodb://localhost/myapp')
.then(()=>console.log('database connect succesfully'))
.catch((err)=> console.log (err) )


// app.get('/', () => {
    
//     console.log('get runnig');
// })

app.use('/', authRoutes);
// app.use('/admin', checkuser, Adminroute)



app.listen(PORT, () => {
console.log(`server is runnig ${PORT}`);
})