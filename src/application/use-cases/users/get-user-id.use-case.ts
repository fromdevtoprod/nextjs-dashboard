import { UsersRepository } from '@/src/infrastructure/repositories/users.repository';

export async function getUserIdUseCase(userEmail: string) {
  const userId = await new UsersRepository().getUserId(userEmail);
  if (!userId) {
    throw new Error('User not found');
  }
  return userId;
}
