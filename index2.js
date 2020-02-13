const { nextISSTimesForMyLocation } = require('./iss_promised');



nextISSTimesForMyLocation()
  .then((passTimes) => {
    for (let time of passTimes) {
      const datetime = new Date(0);
      datetime.setUTCSeconds(time.risetime);
      const duration = time.duration;
      console.log(`Next pass at ${datetime} for ${duration} seconds!`);
    }
  
  })
  .catch((error) => {
    console.log("There was an error: ", error);
  });