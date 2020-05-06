import {RoleEnum} from '../../../common/enums/role.enum';

export default interface UserCreateModel {
  name: string;
  email: string;
  role: RoleEnum | string;
  password: string;
}
