const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const authRoute = require('./routes/auth')
const userRoute = require('./routes/users')
const postRoute = require('./routes/posts')
const multer  = require('multer')
const path = require('path')

app.use(express.json());

dotenv.config();
app.use("/api/users" , userRoute);
app.use("/api/auth" , authRoute);
app.use("/api/posts" , postRoute);

const PORT = process.env.PORT || 4000;
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:false
}, ()=> {
    console.log("Connected to mongodb");
})



app.use("/images", express.static(path.join(__dirname, "public/images")))

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
    destination:(req , file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
})

const upload = multer({storage});
app.post("api/upload", upload.single("file"), (req , res) =>{
    try{
        return res.status(200).json("File uploaded successfully")
    }catch(err){
        console.log(err)
    }
})

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.resolve(__dirname, 'ui', 'build')));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'ui', 'build', 'index.html'));
    });
}

app.listen(PORT , ()=>{
    console.log("Server is running on port " + PORT);
})
