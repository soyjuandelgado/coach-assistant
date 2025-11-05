import { User } from 'src/features/users/user.entity';

export type ValidatedUser = Omit<
  User,
  'password' | 'created_at' | 'updated_at' | 'deleted_at'
>;
