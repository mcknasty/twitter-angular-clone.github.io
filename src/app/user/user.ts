import { BasicRecord } from '../BasicRecord';
import { UserBasic } from './userBasic';
import { UserAccount } from './userAccount';

export type User = UserBasic & UserAccount & BasicRecord;
