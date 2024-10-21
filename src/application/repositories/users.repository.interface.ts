export interface IUsersRepository {
  getUserId(userEmail: string): Promise<string | undefined>;
}
