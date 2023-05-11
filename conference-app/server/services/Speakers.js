//const fs = require('fs');
//const util = require('util');
const { StreamableFile } = require('@nestjs/common');
const axios= require('axios');
//const readFile = util.promisify(fs.readFile);

class SpeakersService {
  // constructor(datafile) {
  //   this.datafile = datafile;
  // }
  constructor( serviceRegistoryUrl,serviceVersionIdentifier)
  {
    this.serviceRegistoryUrl=serviceRegistoryUrl;
    this.serviceVersionIdentifier=serviceVersionIdentifier
  }
  async getImage(path){
    const {ip,port}=await this.getService('speakers-service');
    console.log(`Found ${servicename} service at http://${ip}:${port}`);
    return this.callservice({
      method:'get',
      responseType:'stream',
      url:`http://${ip}:${port}/images/${path}`,
    })
    
  }
  async getNames() {
    const {ip,port}=await this.getService('speakers-service');
    console.log(`Found ${servicename} service at http://${ip}:${port}`);
    return this.callservice({
      method:'get',
      url:`http://${ip}:${port}/names`,
    })
  }

  async getListShort() {
    const {ip,port}=await this.getService('speakers-service');
    console.log(ip);
    return this.callservice({
      method:'get',
      url:`http://${ip}:${port}/list-short`,
    })
  }

  async getList() {
    const {ip,port}=await this.getService('speakers-service');
    return this.callservice({
      method:'get',
      url:`http://${ip}:${port}/list`,
    })
  }

  async getAllArtwork() {
    const {ip,port}=await this.getService('speakers-service');
    return this.callservice({
      method:'get',
      url:`http://${ip}:${port}/artwork`,
    })
  }

  async getSpeaker(shortname) {
    const {ip,port}=await this.getService('speakers-service');
    return this.callservice({
      method:'get',
      url:`http://${ip}:${port}/speaker/${shortname}`,
    })
  }

  async getArtworkForSpeaker(shortname) {
    const {ip,port}=await this.getService('speakers-service');
    return this.callservice({
      method:'get',
      url:`http://${ip}:${port}/artwork/${shortname}`,
    });
  }

//   async getData() {
//     const data = await readFile(this.datafile, 'utf8');
//     if (!data) return [];
//     return JSON.parse(data).speakers;
//   }
// }

async callService(requestOptions)
{
  const response= await axios(requestOptions);
  return response.data;
}
async getService(servicename){
  const response =await axios.get(`${this.serviceRegistoryUrl}/find/${servicename}/${this.serviceVersionIdentifier}`);
  return response.data;
}
}
module.exports = SpeakersService;
