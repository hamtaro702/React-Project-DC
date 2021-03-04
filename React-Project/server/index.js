import mongoose from 'mongoose';
import express  from 'express';
import bodyParser from 'body-parser';
import cors  from 'cors';
import accessRouter from './router/accessRouter.js';



const app = express();
app.use(bodyParser.json({limit:"30mb", extended: true}));
app.use(bodyParser.urlencoded({limit:"30mb", extended: true}));
app.use(cors());
app.use(express.json());
app.use("/access",accessRouter);


const urlMongodbKubernate ="mongodb://mongo-0.mongo:27017,mongo-1.mongo:27017/accessDC"
//const CONNECTION_URL = "mongodb+srv://root:admin8v,ru@cluster0.4u530.mongodb.net/accessDC?retryWrites=true&w=majority";
//const CONNECTION_URL ="mongodb://mongo:27017/accessDC";
const PORT = process.env.PORT || 7000;

mongoose.connect(urlMongodbKubernate,{ useNewUrlParser: true,useUnifiedTopology: true})
    .then(() => app.listen(PORT, () =>  console.log(`Server running on port ${PORT} 🔥`)))
    .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify',false);


