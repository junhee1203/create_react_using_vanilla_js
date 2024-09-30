type Props = Record<string, any>;

interface FunctionComponent {
  (): VirtualDOM;
}

interface VirtualDOM {
  type: string | FunctionComponent;
  props?: Props;
  children?: (VirtualDOM | string)[];
}

export type {Props, FunctionComponent, VirtualDOM}