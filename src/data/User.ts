import { User as FirebaseUserInfo } from 'firebase/auth';

import { Settings } from './Settings';

export interface AbstractUser {
  readonly settings: Settings;
}

export interface LocalUser {
  readonly type: 'local';
}

export interface FirebaseUser {
  readonly type: 'firebase';
  readonly info: FirebaseUserInfo;
}

export type User = AbstractUser & (LocalUser | FirebaseUser);
