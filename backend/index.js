const express        = require('express'),
      app            = express(),
      bodyParser     = require('body-parser'),
      methodOverride = require('method-override'),
      morgan         = require('morgan');


app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(morgan('dev'));

app.listen(process.env.PORT || 3000, process.env.IP, function(){
   console.log("ToDo api server has started.");
});
