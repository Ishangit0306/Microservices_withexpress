const path = require('path');

module.exports = {
  development: {
    sitename: 'Roux Meetups [Development]',
    serviceRegistoryUrl:'http://localhost:3000',
      serviceVersionIdentifier:'1.x.x',
    data: {
      //speakers: path.join(__dirname, '../data/speakers.json'),
      feedback: path.join(__dirname, '../data/feedback.json'),
      
    },
  },
  production: {
    sitename: 'Roux Meetups',
    serviceRegistoryUrl:'http://localhost:3000',
    serviceVersionIdentifier:'1.x.x',
    data: {
     // speakers: path.join(__dirname, '../data/speakers.json'),
    
      feedback: path.join(__dirname, '../data/feedback.json'),
    },
  },
};
