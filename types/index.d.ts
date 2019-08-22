export type AuthType = 1 | 2 | 3;
export interface ConfigType {
  env:string;
  api:string;
  pid:string;
  time:string;
  qiniuToken:string;
  aliyunToken:string;
}
export type EnvType = 'dev'|'staging'|'prod'|'test';

export declare class RxModel {
}

export default RxModel;