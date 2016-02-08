var secrets = require('./secrets');

module.exports = {
  megaplexWsdlUrl : 'http://linz.megaplex.at/webservice/serviceext.asmx?wsdl',
  megaplexContentUrl : 'http://www.megaplex.at/content/',
  
  getIftttUrl : function(eventName) {
    return 'https://maker.ifttt.com/trigger/' + eventName + '/with/key/' + secrets.iftttKey;
  }
};