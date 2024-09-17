import { z } from 'zod';

export const selectedCureSchema = z.object({
  id: z.string(),
  amount: z.number(),
  care_1_id: z.string(),
  care_1_session_number: z.number(),
  care_2_id: z.string().nullable(),
  care_2_session_number: z.number(),
  name: z.string(),
});

export const createdCureSchema = z.object({
  id: z.string(),
  amount: z.number(),
  care_1_id: z.string(),
  care_1_session_number: z.number(),
  care_2_id: z.string().nullable(),
  care_2_session_number: z.number(),
  name: z.string(),
});

export type SelectedCure = z.infer<typeof selectedCureSchema>;
export type CreatedCure = z.infer<typeof createdCureSchema>;

export class CureEntity {
  private id: string;
  private amount: number;
  private care1Id: string;
  private care1SessionNumber: number;
  private care2Id: string | null;
  private care2SessionNumber: number;
  private name: string;

  constructor(data: SelectedCure) {
    this.id = data.id;
    this.amount = data.amount;
    this.care1Id = data.care_1_id;
    this.care1SessionNumber = data.care_1_session_number;
    this.care2Id = data.care_2_id;
    this.care2SessionNumber = data.care_2_session_number;
    this.name = data.name;
  }

  public getAmount(): number {
    return this.amount;
  }

  public getCare1Id(): string {
    return this.care1Id;
  }

  public getCare1SessionNumber(): number {
    return this.care1SessionNumber;
  }

  public getCare2Id(): string | null {
    return this.care2Id;
  }

  public getCare2SessionNumber(): number {
    return this.care2SessionNumber;
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public isSingleCare(): boolean {
    return this.care2Id === null;
  }

  public isCompleted(appointmentIds: string[]): boolean {
    return (
      appointmentIds.length >=
      this.care1SessionNumber + (this.care2SessionNumber || 0)
    );
  }
}
