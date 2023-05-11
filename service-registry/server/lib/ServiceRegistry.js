const semver =require('semver');

class ServiceRegistry {
  constructor(log) {
    this.log = log;
    this.services = {};
    this.timeout = 30;
  }

  get(name,version){
    this.cleanup();
    const candidate=Object.values(this.services).filter(service =>service.name===name && semver.satisfies(service.version,version))
    return candidate[Math.floor(Math.random() * candidate.length)];
  }
  register(name, version, ip, port) {
    this.cleanup();
    const key = name + version + ip + port;

    if (!this.services[key]) {
      this.services[key] = {};
      this.services[key].timestamp = Math.floor(new Date() / 1000);
      this.services[key].ip = ip;
      this.services[key].port = port;
      this.services[key].name = name;
      this.services[key].version = version;
      this.log.debug(`added services ${name},version ${version} at ${ip}:${port}`);
      return key;
    }
    this.services[key].timestamp = Math.floor(new Date() / 1000);
    this.log.debug(`updated services ${name},version ${version} at ${ip}:${port}`);
    return key;
  }
  unregister(name,version,ip,port){
    const key = name + version + ip + port;
    delete this.services[key];
    this.log.debug(`Unregistered services ${name},version ${version} st ${ip}:${port}`);
    return key;
    
  }
  cleanup()
  {
    const now= Math.floor(new Date() /1000);
    Object.keys(this.services).forEach((key)=>{
      if(this.services[key].timestamp+this.timeout <now)
      {
        delete this.services[key];
        this.log.debug(`Removed service ${key}`);
      }
    })
  }
}

module.exports = ServiceRegistry;
