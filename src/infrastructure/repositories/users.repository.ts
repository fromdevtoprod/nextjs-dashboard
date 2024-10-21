import { prisma } from '@/prisma';
import { IUsersRepository } from '@/src/application/repositories/users.repository.interface';

export class UsersRepository implements IUsersRepository {
  public async getUserId(userEmail: string): Promise<string | undefined> {
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    return user?.id;
  }
}
