const express = require('express');
const ServiceRegistry = require('./lib/ServiceRegistry');


const service = express();
// const ServiceRegistry = require('./ServiceRegistry');

module.exports = (config) => {
  const log = config.log();
  const serviceRegistory= new ServiceRegistry(log);
  // Add a request logging middleware in development mode
  if (service.get('env') === 'development') {
    service.use((req, res, next) => {
      log.debug(`${req.method}: ${req.url}`);
      return next();
    });
  }
service.put('/register/:servicename/:serviceversion/:serviceport', (req,res, next)=>{
const{servicename, serviceversion, serviceport} = req.params;
const serviceip= req.connection.remoteAddress.includes('::')?`[${req.connection.remoteAddress}]` : req.connection.remoteAddress;
const serviceKey= serviceRegistory.register(servicename,serviceversion,serviceip,serviceport);
return res.json({result:serviceKey});
});

service.delete('/register/:servicename/:serviceversion/:serviceport', (req, res, next) => {
  const{servicename, serviceversion, serviceport} = req.params;
  const serviceip= req.connection.remoteAddress.includes('::')?`[${req.connection.remoteAddress}]` : req.connection.remoteAddress;
  const serviceKey= serviceRegistory.unregister(servicename,serviceversion,serviceip,serviceport);
  return res.json({result:serviceKey});

});

service.get('/find/:servicename/:serviceversion', (req, res, next) =>{

  const {servicename,serviceversion}= req.params;
  const svc= serviceRegistory.get(servicename,serviceversion);

});

  // eslint-disable-next-line no-unused-vars
  service.use((error, req, res, next) => {
    res.status(error.status || 500);
    // Log out the error to the console
    log.error(error);
    return res.json({
      error: {
        message: error.message,
      },
    });
  });
  return service;
};
