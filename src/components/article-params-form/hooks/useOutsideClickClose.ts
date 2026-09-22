import { useEffect } from 'react';

import type * as React from 'react';

type UseOutsideClickCloseProps = {
  isOpen: boolean;
  rootRef: React.RefObject<HTMLDivElement | null>;
  onChange: (newValue: boolean) => void;
};

export const useOutsideClickClose = ({
  isOpen,
  rootRef,
  onChange,
}: UseOutsideClickCloseProps): void => {
  useEffect(() => {
    const handleClick = (event: MouseEvent): void => {
      const { target } = event;

      if (isOpen && target instanceof Node && !rootRef.current?.contains(target)) {
        onChange(false);
      }
    };

    if (!isOpen) {
      return;
    }

    window.addEventListener('mousedown', handleClick);

    return (): void => {
      window.removeEventListener('mousedown', handleClick);
    };
  }, [isOpen, onChange, rootRef]);
};
