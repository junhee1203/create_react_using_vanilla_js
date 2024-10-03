/** @jsx React.createElement */
// @ts-nocheck
import {
  ChildDiff,
  Container,
  DiffResult,
  Props,
  VNode,
} from '../types/ReactType';

export class React {
  static createElement(
    type: string,
    props: Props | null,
    ...children: VNode[]
  ): JSX.Element {
    return {
      type,
      props: props || {},
      children: children.flat(),
    } as unknown as JSX.Element;
  }

  static render(node: VNode): Node {
    if (typeof node === 'string') {
      return document.createTextNode(node);
    }
    if ('type' in node && typeof node.type === 'string') {
      const $el = document.createElement(node.type);
      this.updateDOMProperties($el, {}, node.props);
      node.children.forEach((child) => $el.appendChild(this.render(child)));
      return $el;
    }
    // JSX.Element 처리
    return document.createTextNode(String(node));
  }

  static updateDOMProperties(
    $target: HTMLElement,
    oldProps: Props,
    newProps: Props
  ): void {
    // Remove old properties
    for (let key in oldProps) {
      if (!(key in newProps)) {
        if (key.startsWith('on')) {
          $target.removeEventListener(
            key.slice(2).toLowerCase(),
            oldProps[key] as EventListener
          );
        } else {
          $target.removeAttribute(key);
        }
      }
    }
    // Set new or changed properties
    for (let key in newProps) {
      if (oldProps[key] !== newProps[key]) {
        if (key.startsWith('on')) {
          $target.addEventListener(
            key.slice(2).toLowerCase(),
            newProps[key] as EventListener
          );
        } else if (key === 'className') {
          $target.setAttribute('class', newProps[key] as string);
        } else if (key === 'style' && typeof newProps[key] === 'object') {
          Object.assign($target.style, newProps[key] as CSSStyleDeclaration);
        } else {
          $target.setAttribute(key, newProps[key] as string);
        }
      }
    }
  }

  static diff(
    oldNode: VNode | undefined,
    newNode: VNode | undefined
  ): DiffResult | null {
    if (!oldNode) return { type: 'CREATE', newNode };
    if (!newNode) return { type: 'REMOVE' };
    if (
      typeof oldNode !== typeof newNode ||
      (typeof oldNode === 'string' && oldNode !== newNode) ||
      (typeof oldNode !== 'string' &&
        typeof newNode !== 'string' &&
        'type' in oldNode &&
        'type' in newNode &&
        oldNode.type !== newNode.type)
    ) {
      return { type: 'REPLACE', newNode };
    }
    if (typeof newNode === 'string' || !('type' in newNode)) return null;

    const propsDiff = this.diffProperties(
      typeof oldNode !== 'string' && 'props' in oldNode ? oldNode.props : {},
      newNode.props
    );
    const childrenDiff = this.diffChildren(
      typeof oldNode !== 'string' && 'children' in oldNode
        ? oldNode.children
        : [],
      newNode.children
    );

    if (propsDiff || childrenDiff.length > 0) {
      return { type: 'UPDATE', props: propsDiff, children: childrenDiff };
    }

    return null;
  }

  static diffProperties(oldProps: Props, newProps: Props): Props | null {
    const diff: Props = {};
    let hasDiff = false;

    for (const key in { ...oldProps, ...newProps }) {
      if (oldProps[key] !== newProps[key]) {
        diff[key] = newProps[key];
        hasDiff = true;
      }
    }

    return hasDiff ? diff : null;
  }

  static diffChildren(oldChildren: VNode[], newChildren: VNode[]): ChildDiff[] {
    const diffs: ChildDiff[] = [];
    const maxLength = Math.max(oldChildren.length, newChildren.length);

    for (let i = 0; i < maxLength; i++) {
      const diff = this.diff(oldChildren[i], newChildren[i]);
      if (diff) diffs.push({ index: i, ...diff });
    }

    return diffs;
  }

  static patch($parent: Node, diff: DiffResult, index: number = 0): void {
    if (!diff) return;

    const $target = $parent.childNodes[index];

    switch (diff.type) {
      case 'CREATE':
      case 'REPLACE':
        const $newNode = this.render(diff.newNode);
        if ($target) {
          $parent.replaceChild($newNode, $target);
        } else {
          $parent.appendChild($newNode);
        }
        break;
      case 'REMOVE':
        if ($target) {
          $parent.removeChild($target);
        }
        break;
      case 'UPDATE':
        if ($target && $target instanceof HTMLElement) {
          if (diff.props) {
            this.updateDOMProperties(
              $target,
              ($target as any).__oldProps || {},
              diff.props
            );
            ($target as any).__oldProps = {
              ...(($target as any).__oldProps || {}),
              ...diff.props,
            };
          }
          diff.children.forEach((childDiff) => {
            this.patch($target, childDiff, childDiff.index);
          });
        }
        break;
    }
  }
}
