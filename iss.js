const request = require('request');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

//IPV4: $ curl 'https://api.ipify.org?format=json'
//              {"ip":"67.71.216.6"}

const fetchMyIP = (callback) => {
  //use request to fetch IP address  from JSON API
  const URL = 'https://api.ipify.org?format=json';
  

  request(URL, (error, response, body) => {


    try {
      let data = JSON.parse(body);
      data = data.ip;
    } catch (e) {
      return callback(e, null);
    }

    if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
        callback(Error(msg), null);
        return;
      }

    return callback(null, data);

  });

};


const fetchCoordsByIP = function(ip, callback) {

  const URL = 'https://ipvigilante.com/'
 
  request(URL + ip, (error, response, body) => {
    
    
      if(error){
        return callback(error, null);
      } else if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
      } else {

        let data = JSON.parse(body);

        let coordinates = {
            latitude: data.data.latitude,
            longitude: data.data.longitude
          };

        return callback(null, coordinates);
      }
      
    
  });
  
};


module.exports = { fetchMyIP, fetchCoordsByIP };