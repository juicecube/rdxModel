const path = require('path');
const bodyParser = require('body-parser')
const webpack = require('webpack');
const fs = require('fs');
const colors = require('colors');

const getPort = require('./getPort');
const webpackDevServer = require('webpack-dev-server');
const config = require('./dev.webpack.config.js');
const mockData = require('./mock_data.json');
const configs = require('./config.js');
const tokenData = mockData.users.dev;

// args[0]：文件地址
const args = process.argv.slice(2);
const testFile = args[0];
let testTimes = 1 || args[1] && parseInt(args[1]);

console.log(testFile, typeof testTimes);

const env = args[2];

function create_server(token, testTimes) {
  configs.init(env);
  const cfg = configs.get();
  const webpackConfig = config(token, cfg, testTimes);
  if (testFile) {
    const paths = path.resolve(__dirname, '../test', args[0]);
    try {
      fs.statSync(paths);
      webpackConfig.entry.index = paths;
    } catch(err) {
      console.error('File not exists, use default file!'.red); 
    }
  }
  console.log('Entry file'.green, webpackConfig.entry.index.green);

  const compiler = webpack(webpackConfig);
  const server = new webpackDevServer(compiler, {
    before: (app) => {
      console.log('listen: /log');
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({ extended: true }));
      app.post('/log', (req, res) => {
        console.log(req.body);
        res.json({success: true});
      })
    },
  });

  getPort().then((value) => {
    server.listen(value, '127.0.0.1', () => {
      console.log('Starting server on http://localhost:' + value);
    });
  });
}

testTimes = testTimes >= tokenData.length - 1 ? tokenData.length - 1 : testTimes;
for(let i = 0; i < testTimes; i++) {
  create_server(tokenData[i], testTimes);
}


