import axios from 'axios';
import { RxModel } from '../src';
const userData = require('../scripts/mock_data.json').users.dev;

const useridEl = document.getElementById('userId') as HTMLInputElement;
const fileEl = document.getElementById('file') as HTMLInputElement;
const uploadEl = document.getElementById('upload');
const uploadBackEl = document.getElementById('uploadBackup');
const loginEl = document.getElementById('login');

// const uploader;

uploadEl.addEventListener('click', () => {
  if ((window as any).login) {
    // uploader.upload(fileEl.files[0], { bucket: 'k12edu' }).then((res) => {
    //   console.log(res);
    // });
  } else {
    const userid = useridEl.value;
    const userinfo = userData.filter((item) => {
      return item.userid.toString() === userid;
    })[0];
    const { qiniu_token, ali_token  } = userinfo;
    // TODO 传参测试
    // uploader.upload(fileEl.files[0], {
    //   bucket: 'static',
    //   qiniu: {
    //     bucket: qiniu_token.bucket_name,
    //     bucketUrl: qiniu_token.bucket_url,
    //     token: qiniu_token.token,
    //     fileName: fileEl.files[0].name,
    //     progress: (e) => { console.log('qiniu', e); },
    //   },
    //   ali: {
    //     bucketUrl: ali_token.bucket.url,
    //     bucket: ali_token.bucket.name,
    //     fileName: fileEl.files[0].name,
    //     stsToken: ali_token.credentials.SecurityToken,
    //     accessKeyId: ali_token.credentials.AccessKeyId,
    //     accessKeySecret: ali_token.credentials.AccessKeySecret,
    //     progress: (e) => { console.log('qiniu', e); },
    //   },
    // }).then((res) => {
    //   console.log(res);
    // }).catch((err) => {
    //   console.log(err);
    // });
  }
});

// uploadBackEl.addEventListener('click', () => {
//   if ((window as any).login) {
//     uploader.uploadBackup(fileEl.files[0], {
//       bucket:  'k12edu',
//       progress: (s) => { console.log('final', s); },
//     }).then((res) => {
//       console.log(res);
//     });
//   } else {
//     const userid = useridEl.value;
//     const userinfo = userData.filter((item) => {
//       return item.userid.toString() === userid;
//     })[0];
//     const { qiniu_token, ali_token  } = userinfo;
//     // uploader.uploadBackup(fileEl.files[0], {
//     //   bucket: 'static',
//     //   qiniu: {
//     //     bucket: qiniu_token.bucket_name,
//     //     bucketUrl: qiniu_token.bucket_url,
//     //     token: qiniu_token.token,
//     //     fileName: fileEl.files[0].name,
//     //   },
//     //   ali: {
//     //     bucketUrl: ali_token.bucket.url,
//     //     bucket: ali_token.bucket.name,
//     //     fileName: fileEl.files[0].name,
//     //     stsToken: ali_token.credentials.SecurityToken,
//     //     accessKeyId: ali_token.credentials.AccessKeyId,
//     //     accessKeySecret: ali_token.credentials.AccessKeySecret,
//     //   },
//     //   progress: (s) => { console.log('final', s); },
//     // }).then((res) => {
//     //   console.log(res);
//     // }).catch((err) => {
//     //   console.log(err);
//     // });
//   }
// });

// loginEl.addEventListener('click', () => {
//   const userid = useridEl.value;
//   const userinfo = userData.filter((item) => {
//     return item.userid.toString() === userid;
//   })[0];

//   const { username, password } = userinfo;

//   axios.post(configs.get().api + '/tiger/v3/web/accounts/login',
//   {
//     identity: username,
//     password: password,
//     pid: 'oiOsnNlR',
//   }).then((res) => {
//     console.log(res);
//     (window as any).login = true;
//     loginEl.innerHTML = '登陆成功';
//     loginEl.style.pointerEvents = 'none';
//   });
// });