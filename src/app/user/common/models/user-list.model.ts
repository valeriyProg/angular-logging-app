import UserModel from './user.model';

export default interface UserListModel {
  current_page: number;
  data: [UserModel];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string;
  path: string;
  per_page: string;
  prev_page_url: string;
  to: number;
  total: number;
}
