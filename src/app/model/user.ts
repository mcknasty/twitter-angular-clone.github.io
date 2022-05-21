import { BasicRecord, BasicRecordSchema } from './BasicRecord';
import { UserAccount } from './userAccount';

export interface UserBasic {
  name: string;
  handle: string;
  userName: string;
  plainPass: string;
  email: string;
  ProfileImage?: File;
  BackgroundImage?: File;
  password?: string;
}

export class User implements BasicRecordSchema {
  id = '';
  created = 0;
  updated = 0;
  name = '';
  handle = '';
  userName = '';
  email = '';
  plainPass = '';
  token = '';
  password = '';
  lastLogin = 0;
}
