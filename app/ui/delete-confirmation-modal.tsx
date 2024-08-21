import Modal from './modal';

export default function DeleteConfirmationModal({
  item,
  onConfirmation,
  onCancel,
}: {
  item: 'appointment' | 'care' | 'cure' | 'customer' | 'order';
  onConfirmation: () => void;
  onCancel: () => void;
}) {
  return (
    <Modal
      message={`Are you sure you want to remove this ${item} ? This action cannot be undone.`}
      actionLabel="Delete"
      title={`Deleting ${item}`}
      onAction={onConfirmation}
      onCancel={onCancel}
    />
  );
}
