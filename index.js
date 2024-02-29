const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const userRoute = require('./routes/userRoute');
const getRoutes = require('./routes/getRoutes');
const postRoutes = require('./routes/postRoutes');
const port = 3000;

app.use(express.static(path.join(__dirname, 'pages')));
app.use(fileUpload());
app.use(bodyParser.urlencoded({extended: true}));
app.use((express.urlencoded({extended: true})));


app.use(getRoutes);

app.use('/',userRoute);

app.use(postRoutes);
  
 
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});