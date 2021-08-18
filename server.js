const express = require('express');

const connectDB = require('./config/db')

const app = express();

//Connect mongoDB
connectDB();

//express json
app.use(express.json({ extended: false }));


app.get('/', (req, res) => {
    res.send('Doge to the moon');
})


app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));


const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
    console.log(`Server Started on Port ${PORT}`);
});