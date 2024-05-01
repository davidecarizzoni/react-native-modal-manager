import { useCallback, useState } from 'react';
import { ModalData, ModalOptions, ModalProps, ModalShowParams } from '../types';
import { mergeIfDefined } from '../utils/obj.ts';

export type UseModalParams = {
  defaultOptions: Omit<ModalProps, 'config'>;
};

const DEFAULT_OPTIONS: ModalOptions = {
  dismissable: true,
  position: 'center',
};

export const useModal = ({ defaultOptions }: UseModalParams) => {
  const [isVisible, setIsVisible] = useState(false);
  const [data, setData] = useState<ModalData>({
    children: null,
  });

  const initialOptions = mergeIfDefined(
    DEFAULT_OPTIONS,
    defaultOptions,
  ) as Required<ModalOptions>;

  const [options, setOptions] = useState<ModalOptions>(initialOptions);

  const show = useCallback(
    (params: ModalShowParams) => {
      setData({
        children: params.children ?? null,
      });
      setOptions({
        dismissable: params.dismissable ?? initialOptions.dismissable,
        position: params.position ?? initialOptions.position,
        animated: params.animated,
      });
      setIsVisible(true);
    },
    [initialOptions],
  );

  const hide = useCallback(() => {
    setIsVisible(false);
  }, [initialOptions]);

  const onHide = useCallback(() => {
    setData({
      children: null,
    });
    setOptions(initialOptions);
  }, [initialOptions]);

  return {
    isVisible,
    show,
    hide,
    data,
    options,
    onHide,
  };
};
