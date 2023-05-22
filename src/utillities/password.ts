import { compare, genSalt, hash } from 'bcrypt';
export const hashPassword = async (password: string): Promise<string> => {
  const salt = await genSalt(8);
  return hash(password, salt);
};

export const matchPassword = async (oldPassword: string, password: string): Promise<boolean> => {
  return compare(password, oldPassword);
};
