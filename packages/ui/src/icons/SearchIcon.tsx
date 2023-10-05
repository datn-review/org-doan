import { memo } from "react";

type Props = {
  width?: number;
  height?: number;
  stroke?: string;
  strokeWidth?: number;
  [x: string]: any;
};

const Search = () => {
  return (
    <svg
      data-v-1e273420=""
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
      className="v-icon notranslate v-theme--light iconify iconify--tabler"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      style={{ fontSize: "26px" }}
    >
      <path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
        d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0-14 0m18 11l-6-6"
      ></path>
    </svg>
  );
};

export const IconSearch = memo(Search);
