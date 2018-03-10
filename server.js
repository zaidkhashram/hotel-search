const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3030;
var fbResponse = "";
app.use('/public', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended : true}));

function GetHotels(destinationName , regionIds , minTripStartDate,lengthOfStay,maxStarRating,minStarRating
,maxTotalRate,minTotalRate,maxGuestRating,minGuestRating){
  const https = require('https');
  var url = 'https://offersvc.expedia.com/offers/v2/getOffers?scenario=deal-finder&page=foo&uid=foo&productType=Hotel';

  if(destinationName && typeof destinationName !== 'undefined')
  {
    url = url + '&destinationName='+destinationName;
  }

  if(regionIds && typeof regionIds !== 'undefined')
  {
    url = url + '&regionIds='+regionIds;
  }

  if(minTripStartDate && typeof minTripStartDate !== 'undefined')
  {
    url = url + '&minTripStartDate='+minTripStartDate;
  }

  if(lengthOfStay && typeof lengthOfStay !== 'undefined')
  {
    url = url + '&lengthOfStay='+lengthOfStay;
  }

  if(maxStarRating && typeof maxStarRating !== 'undefined')
  {
    url = url + '&maxStarRating='+maxStarRating;
  }

  if(minStarRating && typeof minStarRating !== 'undefined')
  {
    url = url + '&minStarRating='+minStarRating;
  }

  if(maxTotalRate && typeof maxTotalRate !== 'undefined')
  {
    url = url + '&maxTotalRate='+maxTotalRate;
  }

  if(minTotalRate && typeof minTotalRate !== 'undefined')
  {
    url = url + '&minTotalRate='+minTotalRate;
  }

  if(maxGuestRating && typeof maxGuestRating !== 'undefined')
  {
    url = url + '&maxGuestRating='+maxGuestRating;
  }

  if(minGuestRating && typeof minGuestRating !== 'undefined')
  {
    url = url + '&minTotalRate='+minGuestRating;
  }

  https.get(url, function(res){
      var body = '';
      res.on('data', function(chunk){
         body += chunk;
      });
      res.on('end', function(){
         fbResponse = JSON.parse(body);
      });
  }).on('error', function(e){
      console.log("Got an error: ", e);
  });
}


app.get('/', function(req, res){
    res.sendfile('./index.html', { root: __dirname });
});

app.get('/getHotels',(req,res)=>{
  var destinationName = req.query.destinationName;
  var regionIds = req.query.regionIds;
  var minTripStartDate = req.query.minTripStartDate;
  var lengthOfStay = req.query.lengthOfStay;
  var maxStarRating = req.query.maxStarRating;
  var minStarRating = req.query.minStarRating;
  var maxTotalRate = req.query.maxTotalRate;
  var minTotalRate = req.query.minTotalRate;
  var maxGuestRating = req.query.maxGuestRating;
  var minGuestRating = req.query.minGuestRating;

  GetHotels(destinationName,regionIds,minTripStartDate,lengthOfStay,maxStarRating,minStarRating,maxTotalRate,minTotalRate
  ,maxGuestRating,minGuestRating);
  setTimeout(function () {
  res.send(fbResponse);
}, 2000);

});
app.listen(process.env.PORT);
