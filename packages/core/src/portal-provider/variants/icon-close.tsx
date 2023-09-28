import { memo } from "react";

type Props = {
    width?: number;
    height?: number;
    stroke?: string;
    strokeWidth?: number;
    [x: string]: any;
};

const Close = ({
    width = 24,
    height = 24,
    stroke = "rgb(72, 72, 72)",
    strokeWidth = 2.6,
    ...props
}: Props) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            strokeWidth="2.6"
            viewBox="0 0 32.985 32.985"
            width={width}
            height={width}
            {...props}
        >
            <path
                d="M1.414 1.414L31.57 31.57M31.57 1.414L1.414 31.57"
                fill={"none"}
                stroke={stroke}
                strokeLinecap={"round"}
                strokeLinejoin={"round"}
                strokeWidth={strokeWidth}
            ></path>
            <path
                d="M1.414 1.414L31.57 31.57M31.57 1.414L1.414 31.57"
                fill={"none"}
                stroke={stroke}
                strokeLinecap={"round"}
                strokeLinejoin={"round"}
                strokeWidth={strokeWidth}
            ></path>
        </svg>
    );
};

export const IconClose = memo(Close);
