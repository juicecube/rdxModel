const path = require('path');
const fs = require('fs');
const dev_config = require('../config/dev.json');
const staging_config = require('../config/staging.json');
const prod_config = require('../config/prod.json');

function getConfig(env){
    let config = prod_config;

    switch(env) {
      case 'dev': config = dev_config;break;
      case 'staging': config = staging_config;break;
      case 'prod': config = prod_config;break;
      default: config = prod_config;break;
    }
    try {
      const local_path = path.resolve(__dirname, '../config/local.json');
      fs.statSync(local_path);
      const local_config = require(local_path);
      config = Object.assign({}, config, local_config);
    } catch(err) {
      console.log('local config not exists, use default file!'.red, err);
    }
    return config;
}
function config(){
    let config;
    return {
        init: (env) => {
            config = getConfig(env);
        },
        get: () => config
    }
}
const configs = config();
module.exports = configs;