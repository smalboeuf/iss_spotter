const { fetchMyIP, fetchCoordsByIP } = require('./iss');
let ipDone = "";


// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log('It worked! Returned IP:' , ip);
//   ipDone = ip;
// });

fetchCoordsByIP('67.71.216.6', (error, data) => {
  
  if (error) {
    console.log("It didn't");
    return;
  }

  console.log("Longitude: ", data.longitude);
  console.log("Latitude: ", data.latitude);
  console.log('67.71.216.6');

});

