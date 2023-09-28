import { useEffect, useId, useRef } from "react";
import type { ReactNode } from "react";

import { createPortal } from "react-dom";

type Props = {
  children: ReactNode;
  domNode?: Element;
};

const useA11y = (refModal: any) => {
  const idModal = useId();

  refModal.current.id = idModal;

  const activeTabAccessibility = () => {
    const modal = refModal.current;
    const focusableElementsString =
      'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [tabindex="-1"], [contenteditable]';
    let focusableElements = modal.querySelectorAll(focusableElementsString);
    // Convert NodeList to Array
    focusableElements = Array.prototype.slice.call(focusableElements);

    if (!focusableElements.length) return;

    // The first focusable element within the modal window
    const firstTabStop = focusableElements[0];
    // The last focusable element within the modal window
    const lastTabStop = focusableElements[focusableElements.length - 1];
    // Focus the window
    firstTabStop.focus();
    // Add keydown event
    modal.addEventListener("keydown", function (e: KeyboardEvent) {
      // Listen for the Tab key
      if (e.key === "Tab") {
        // If Shift + Tab
        if (e.shiftKey) {
          // If the current element in focus is the first focusable element within the modal window...
          if (document.activeElement === firstTabStop) {
            e.preventDefault();
            // ...jump to the last focusable element
            lastTabStop.focus();
          }
          // if Tab
        } else {
          // If the current element in focus is the last focusable element within the modal window...
          if (document.activeElement === lastTabStop) {
            e.preventDefault();
            // ...jump to the first focusable element
            firstTabStop.focus();
          }
        }
      }
    });
  };

  useEffect(() => {
    // @TODO: Fix this
    // refModal.current.focus();
    activeTabAccessibility();
  }, []);
};

export function Portal({ children, domNode = document.body }: Props) {
  const refModal = useRef<any>(document.createElement("div"));

  useEffect(() => {
    domNode.append(refModal.current);
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
      domNode.removeChild(refModal.current);
    };
  }, []);

  useA11y(refModal);
  return createPortal(children, refModal.current as HTMLElement);
}
