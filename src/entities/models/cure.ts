import { z } from 'zod';

export const selectCureSchema = z
  .object({
    care_1_id: z.string().min(1, { message: 'One minimal care is required' }),
    care_1_session_number: z.coerce
      .number()
      .gt(0, { message: 'Please enter a session number greater than 0.' }),
    care_2_id: z.string().nullable(),
    care_2_session_number: z.coerce.number(),
    product_amount: z.coerce
      .number()
      .gt(0, { message: 'Please enter an amount greater than 0.' }),
    product_id: z.string(),
    product_name: z.string().min(1, { message: 'Name is required' }),
  })
  .omit({ product_id: true });

export type Cure = z.infer<typeof selectCureSchema>;
