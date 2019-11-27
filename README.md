推荐使用[redux-toolkit](https://github.com/reduxjs/redux-toolkit)
# rdx-model
  由于reducer和action写法很多重复的变量，此库整合了相关的写法以model形式输出。有成型的typescript声明文件，对于ts项目比较友好，内置了redux-actions。
  
  具体安装和引入步骤如下：

### 安装
1.安装依赖
```
yarn add rdx-model
```
或者
```
npm install rdx-model
```

### 使用
```
import { createModel, Raw, Action } from 'rdx-model';
// 生成reducer
export type UserInfo = {
  id:number,
  username:string,
};
export const user = createModel({
  state: {
    id: 0,
    username: '',
  },
  reducers:{
    'user/update': {
      name: Raw('put_user'),
      reducer: (state:UserInfo, action:Action<Partial<UserInfo>>) : UserInfo => {
        return Object.assign({}, state, action.payload);
      },
    },
    'user/get': { // 没有reducer的情况用于类似于saga等中间件处理
      name:Raw('get_user'),
    }
  },
});

// combineReducers
export const root_reducer = combineReducers<ReduxState>({
  user_info: user.reducer,
});

// 导出actions
export const { put_user } = user.actions;

// 导出action的keys
export const { put_user } = user.keys;
```
#### 如有问题请提issue
