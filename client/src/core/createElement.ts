interface VirtualDomNode {
  type: string | Function;
  props?: any;
  children: VirtualDomNode[];
}

export function createElement(
  type: string | Function,
  props: any,
  ...children: any[]
): VirtualDomNode {
  return { type, props: props || {}, children };
}
