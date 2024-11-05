import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

/**
 * Hashes a password using bcrypt.
 * @param password The plain text password to hash.
 * @returns The hashed password.
 */
export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

/**
 * Compares a plain text password with a hashed password.
 * @param password The plain text password.
 * @param hashedPassword The hashed password.
 * @returns A boolean indicating if the passwords match.
 */
export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};
