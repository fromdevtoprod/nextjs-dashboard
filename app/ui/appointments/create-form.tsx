'use client';

// @ts-ignore
import { useActionState, useEffect, useState } from 'react';
import { createAppointment } from '@/app/lib/actions/appointments';
import { Care, Cure, CustomerField } from '@/app/lib/definitions';
import { Button } from '../button';
import CancelButton from '../cancel-button';
import FormErrorMessage from '../form-error-message';
import TimeInput from '../time-input';
import SelectProductType from '../select-product-type';
import SelectProduct from '../select-product';

const initialState = { message: null, error: {} };

export default function Form({
  cares,
  cures,
  customer,
  date,
}: {
  cares: Care[];
  cures: Cure[];
  customer: CustomerField;
  date: string;
}) {
  const [state, formAction] = useActionState(createAppointment, initialState);
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [selectedProductType, setSelectedProductType] = useState<
    'care' | 'cure'
  >();
  const [caresFromCure, setCaresFromCure] = useState([]);
  const [careId, setCareId] = useState('');

  useEffect(() => {
    if (selectedProductId && selectedProductType === 'cure') {
      fetch(`/api/cares?product_id=${selectedProductId}&product_type=cure`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setCaresFromCure(data);
          if (data.length === 1) {
            return setCareId(data[0].product_id);
          }
          setCareId('');
        });
    }
    if (selectedProductId && selectedProductType === 'care') {
      setCareId(selectedProductId);
    }
  }, [selectedProductId]);

  const careDuration =
    (careId && cares.find((care) => care.product_id === careId)?.duration) || 0;

  console.log('careDuration', careDuration);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-5 text-sm text-gray-500">
          Customer id : {customer.id} & name : {customer.name}
        </div>
        <SelectProductType
          errors={state.errors?.product_type || []}
          onProductTypeSelect={(productType: 'care' | 'cure') => {
            setCareId('');
            setSelectedProductType(productType);
          }}
        />
        {selectedProductType && (
          <SelectProduct
            productType={selectedProductType}
            products={selectedProductType === 'care' ? cares : cures}
            errors={state.errors?.product || []}
            onProductSelect={setSelectedProductId}
          />
        )}
        {caresFromCure.length > 1 && (
          <SelectProduct
            productType="care"
            products={caresFromCure}
            errors={state.errors?.product || []}
            onProductSelect={setCareId}
          />
        )}
        {careId && (
          <TimeInput
            errors={state.errors?.time || []}
            careDuration={careDuration}
          />
        )}
        <FormErrorMessage message={state.message} />

        <input type="hidden" name="date" value={date} />
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <CancelButton url="/dashboard/appointments" />
        <Button type="submit">Book Appointment</Button>
      </div>
    </form>
  );
}
