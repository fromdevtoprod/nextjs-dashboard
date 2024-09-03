export function BookButton({
  isDisabled,
  onClick,
}: {
  isDisabled?: boolean;
  onClick: () => void;
}) {
  let buttonClassName =
    'inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto';
  if (isDisabled) {
    buttonClassName += ' opacity-50 cursor-not-allowed';
  } else {
    buttonClassName += ' hover:bg-green-200';
  }
  return (
    <button
      type="button"
      onClick={onClick}
      className={buttonClassName}
      disabled={isDisabled}
    >
      Book Appointment
    </button>
  );
}
