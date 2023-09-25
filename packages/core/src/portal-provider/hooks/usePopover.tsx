import type { ReactNode } from "react";
import { useCallback } from "react";
import type { IPropsPortal } from "../portal-provider.type";
import { MaskPopover, type TPopoverMaskProps } from "../variants/mask-popover";
import { usePortalContext } from "../portal-provider";

type TPopoverParams = IPropsPortal & TPopoverMaskProps;

export const usePopover = () => {
    const {
        openPortal,
        closePortal: close,
        destroyPortal: destroy,
    } = usePortalContext();

    const open = useCallback((modal: ReactNode, props: TPopoverParams = {}) => {
        const { domNode, isNested, ...popoverProps } = props;
        openPortal(
            <MaskPopover {...popoverProps} domNode={domNode}>
                {modal}
            </MaskPopover>,
            {
                domNode,
                isNested,
            }
        );
    }, []);

    return {
        open,
        close,
        destroy,
    };
};
