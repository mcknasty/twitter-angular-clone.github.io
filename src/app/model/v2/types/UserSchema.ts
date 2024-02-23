import { BasicRecordSchema } from './BasicRecordSchema'

interface UserPartialSchema {
  name: string | null;
  handle: string | null;
  userName: string | null;
  email: string | null;
  plainPass: string | null;
  token: string | null;
  password: string | null;
  lastLogin: number;
}

type UserSchema = UserPartialSchema & BasicRecordSchema;

export { UserSchema, UserPartialSchema }
