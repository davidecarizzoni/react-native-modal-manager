import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import {
  ModalHideParams,
  ModalProps,
  ModalRef,
  ModalShowParams,
} from './types';
import { useModal } from './hook/useModal.ts';
import { ModalUI } from './components/ModalUI.tsx';

const ModalRoot = forwardRef((props: ModalProps, ref) => {
  const { config, ...defaultOptions } = props;
  const { show, hide, isVisible, options, onHide, data } = useModal({
    defaultOptions,
  });

  // This must use useCallback to ensure the ref doesn't get set to null and then a new ref every render.
  useImperativeHandle(
    ref,
    useCallback(
      () => ({
        show,
        hide,
      }),
      [hide, show],
    ),
  );

  return (
    <ModalUI
      isVisible={isVisible}
      options={options}
      data={data}
      hide={hide}
      onHide={onHide}
      show={show}
      config={config}
    />
  );
});

type ModalRefObj = {
  current: ModalRef | null;
};

let refs: ModalRefObj[] = [];

/**
 * Adds a ref to the end of the array, which will be used to show the toasts until its ref becomes null.
 *
 * @param newRef the new ref, which must be stable for the life of the Toast instance.
 */
function addNewRef(newRef: ModalRef) {
  refs.push({
    current: newRef,
  });
}

/**
 * Removes the passed in ref from the file-level refs array using a strict equality check.
 *
 * @param oldRef the exact ref object to remove from the refs array.
 */
function removeOldRef(oldRef: ModalRef | null) {
  refs = refs.filter(r => r.current !== oldRef);
}

export function Modal(props: ModalProps) {
  const ModalRef = useRef<ModalRef | null>(null);

  /*
    This must use `useCallback` to ensure the ref doesn't get set to null and then a new ref every render.
    Failure to do so will cause whichever Toast *renders or re-renders* last to be the instance that is used,
    rather than being the Toast that was *mounted* last.
  */
  const setRef = useCallback((ref: ModalRef | null) => {
    // Since we know there's a ref, we'll update `refs` to use it.
    if (ref) {
      // store the ref in this toast instance to be able to remove it from the array later when the ref becomes null.
      ModalRef.current = ref;
      addNewRef(ref);
    } else {
      // remove the this toast's ref, wherever it is in the array.
      removeOldRef(ModalRef.current);
    }
  }, []);

  return <ModalRoot ref={setRef} {...props} />;
}

function getRef() {
  const reversePriority = [...refs].reverse();
  const activeRef = reversePriority.find(ref => ref?.current !== null);
  if (!activeRef) {
    return null;
  }
  return activeRef.current;
}

Modal.show = (params: ModalShowParams) => {
  getRef()?.show(params);
};

Modal.hide = (params?: ModalHideParams) => {
  getRef()?.hide(params);
};
