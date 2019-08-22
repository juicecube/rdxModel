const querystring = require('querystring');
const colors = require('colors');
const axios = require('axios');
const configs = require('./config.js');
const users = require('./mock_users').users;
const fs = require('fs');
const path = require('path');
// TODO use different env
configs.init();
const config = configs.get();

async function updateToken(spec = {username: '', password: ''}) {
  if (!spec.username || !spec.username) {
    console.log('Please use available account'.red);
    return;
  }
  try {
    const queryLogin = await axios.post(
      config.api + '/tiger/v3/web/accounts/login',
      {
        identity: spec.username,
        password: spec.password,
        pid: "oiOsnNlR",
      },
    );
    if (queryLogin.status === 200) {
      const userData = queryLogin.data;
      const queryQiniuToken = await axios.get(
        `${config.qiniuToken}?bucket=k12edu`,
        {
          headers: { authorization: `Bearer ${userData.auth.token}` }
        },
      );
      const queryAliToken = await axios.get(
        `${config.aliyunToken}?bucket=k12edu`,
        {
          headers: { authorization: `Bearer ${userData.auth.token}` }
        },
      );
      if (queryQiniuToken.status === 200 && queryAliToken.status === 200) {
        const userinfo = {
          userid: userData.user_info.id,
          username: spec.username,
          password: spec.password,
          qiniu_token: queryQiniuToken.data,
          ali_token: queryAliToken.data,
        };
        return userinfo;
      }
    }
  } catch(e) {
    console.log(e.response.data);
  }
}

async function asyncLoop(array, cb) {
  for(let i = 0; i < array.length; i++) {
    await cb(array[i], i);
  }
}
(async () => {
  const mock_data = [];
  await asyncLoop(users.dev, async (item, i) => {
    const userinfo = await updateToken(item);
    mock_data.push(userinfo);
  });
  if (mock_data.length > 0) {
    users.dev = mock_data;
  }
  const file_string = `{"users": ${JSON.stringify(users)}}`;
  try {
    fs.writeFileSync(path.resolve(__dirname, './mock_data.json'), file_string, 'utf8');
  } catch(e) {
    console.log(e);
  }
  
})();