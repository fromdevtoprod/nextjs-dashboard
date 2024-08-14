export default function LeftArrow() {
  return (
    <button
      aria-label="calendar backward"
      className="text-gray-800 hover:text-gray-400 focus:text-gray-400 dark:text-gray-100"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-chevron-left"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <polyline points="15 6 9 12 15 18" />
      </svg>
    </button>
  );
}
