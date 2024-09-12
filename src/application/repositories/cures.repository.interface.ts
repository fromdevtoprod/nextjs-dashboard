import { QueryResult } from '@vercel/postgres';
import { Cure } from '@/app/lib/definitions';

export interface ICureRepository {
  getCureById(id: string): Promise<QueryResult<Cure>>;
}
