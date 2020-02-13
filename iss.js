const request = require('request');



const fetchMyIP = (callback) => {
  //use request to fetch IP address  from JSON API
  const URL = 'https://api.ipify.org?format=json';
  

  request(URL, (error, response, body) => {

    if (error) {
      return callback(error, null);
    } else if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    } else {

      let data = JSON.parse(body);
      data = data.ip;

      return callback(null, data);
    }

  });

};


const fetchCoordsByIP = function(ip, callback) {

  const URL = 'https://ipvigilante.com/';
 
  request(URL + ip, (error, response, body) => {
    
    
    if (error) {
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

const fetchISSFlyOverTimes = function(coords, callback) {

  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    
    if (error) {
      return callback(error, null);
    } else if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    } else {

      let data = JSON.parse(body);
      data = data.response;
  

      return callback(null, data);
    }
    
  
  });
};
 

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error,ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, coordinates) => {
      if (error) {
        return callback(error, null);
      }
  
      fetchISSFlyOverTimes(coordinates, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextPasses);
      });
    });
  });
};


module.exports = { nextISSTimesForMyLocation };