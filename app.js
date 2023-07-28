const express = require('express');
require('dotenv').config();
const connetDB = require('./data')
const categoryRouter = require('./router/categoryRoutes');
const productRouter = require('./router/productRoutes');
const userRouter = require('./router/userRoutes');
const errorHandler = require('./middlewares/error')

const app = express();
connetDB();
app.use(express.json())
app.use('/api/category',categoryRouter)
app.use('/api/product',productRouter)
app.use('/api/user',userRouter)
app.use(errorHandler)

app.listen(process.env.port,()=>{
    console.log(`server listen ${process.env.port}`);
});