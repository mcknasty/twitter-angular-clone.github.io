import { BasicRecord } from '../BasicRecord';
import { UserBasic } from './userBasic';
import { UserAccount } from './userAccount';

export class User implements UserBasic, UserAccount, BasicRecord {
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
