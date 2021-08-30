const exp = require('constants');
const express=require('express');
const cors=require('cors');
const path = require('path');
const exphbs=require('express-handlebars');
const members=require('./Members');
const members2=require('./Members2');

const app=express();


//Init middleware
//app.use(logger);

//Handlebars Middleware
app.engine('handlebars',exphbs({defaultLayout:'main'}));
app.set('view engine','handlebars');

//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//Add headers before routes
app.use(cors());

//Homepage Route
app.get('/',(req,res)=>res.render('index',{
    title:"Member Xinghua",
    title2:"Member2 Xinghua",
    members,
    members2
   })
);

//Set static folder
app.use(express.static(path.join(__dirname,'public')));

//Members API Router
app.use('/api/members', require('./routes/api/members'));
app.use('/api/members2', require('./routes/api/members2'));

const PORT=5000;

app.listen(PORT,()=>console.log(`Server started on port ${PORT}`));

























