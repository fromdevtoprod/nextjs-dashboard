import { describe, expect, it } from 'vitest';
import { PackageFindByIdUseCase } from '@/src/application/use-cases/packages/find-package-by-id.use-case';
import { PackagesRepositoryMock } from './packages.repository.mock';

const packageFindByIdUseCase = new PackageFindByIdUseCase(
  new PackagesRepositoryMock(),
);

describe('Testing PackageFindByIdUseCase', () => {
  it('should find a package by id', async () => {
    const packageModel = await packageFindByIdUseCase.find('1');
    expect(packageModel).toBeDefined();
    expect(packageModel?.getId()).toBe('1');
  });

  it('should not find a package by id', async () => {
    const packageModel = await packageFindByIdUseCase.find('2');
    expect(packageModel).toBeNull();
  });
});
