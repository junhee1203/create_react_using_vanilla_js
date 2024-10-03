type Props = { [key: string]: any };

type VNode =
  | string
  | { type: string; props: Props; children: VNode[] }
  | JSX.Element;

type DiffResult =
  | { type: 'CREATE' | 'REPLACE'; newNode: VNode }
  | { type: 'REMOVE' }
  | { type: 'UPDATE'; props: Props | null; children: ChildDiff[] };

type ChildDiff = DiffResult & { index: number };

interface Container extends HTMLElement {
  __virtualDOM?: VNode;
}

export type { Props, VNode, DiffResult, ChildDiff, Container };
