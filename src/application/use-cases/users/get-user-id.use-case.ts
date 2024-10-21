import { UsersRepository } from '@/src/infrastructure/repositories/users.repository';

export function getUserIdUseCase(userEmail: string) {
  return new UsersRepository().getUserId(userEmail);
}
