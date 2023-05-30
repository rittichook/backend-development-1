import { EUserRole } from './userRole.type';

export interface IUserData {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  tel: string;
  avatar: string;
  role: EUserRole;
}
