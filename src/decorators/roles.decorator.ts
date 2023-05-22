/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { SetMetadata } from '@nestjs/common';
import { EUserRole } from 'src/type/userRole.type';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: EUserRole[]) => SetMetadata(ROLES_KEY, roles);
