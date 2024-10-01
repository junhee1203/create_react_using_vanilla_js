import { VirtualDOM, FunctionComponent } from '../types/ReactType';

export class React {
  static createElement(
    type: string | FunctionComponent,
    props?: { [key: string]: any },
    ...children: (VirtualDOM | string)[]
  ): VirtualDOM {
    if (typeof type == 'function') {
      return type();
    }

    return {
      type,
      props: props || {},
      children: children.flat(),
    };
  }

  static render(node: VirtualDOM, target: HTMLElement) {
    if (typeof node === 'string') {
      return document.createTextNode(node);
    }

    const $el = document.createElement(node.type as string);

    // props가 정의되어 있을 때만 속성 설정
    Object.entries(node.props || {})
      .filter(([attr, value]) => value)
      .forEach(([attr, value]) => {
        if (attr == 'className') {
          $el.setAttribute('class', value);
        } else if (attr.startsWith('on') && typeof value == 'function') {
          $el.addEventListener(attr.slice(2).toLowerCase(), value);
        } else {
          $el.setAttribute(attr, value);
        }
      });

    // children이 정의되어 있는 경우에만 재귀적으로 render 메서드 호출
    if (node.children) {
      node.children
        .map((child) => React.render(child as VirtualDOM, target))
        .forEach((child) => $el.appendChild(child));
    }

    target.appendChild($el);

    return $el;
  }
}
