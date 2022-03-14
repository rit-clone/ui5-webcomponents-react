import { Children, Fragment, ReactNode } from 'react';

export function flattenFragments(children: ReactNode | ReactNode[], depth = 1): ReactNode[] {
  const flatChildren = [];
  if (Array.isArray(children)) {
    return children;
  }
  const removeFragments = (element, level = 0) => {
    if (!element) {
      return;
    }
    if (element.type === Fragment && level <= depth) {
      Children.toArray(element.props?.children).forEach((item) => {
        removeFragments(item, level + 1);
      });
    } else {
      flatChildren.push(element);
    }
  };
  removeFragments(children);

  return flatChildren;
}

export const getRandomId = () => {
  if ('randomUUID' in crypto) {
    // @ts-ignore
    return crypto.randomUUID();
  }
  const uint32 = window.crypto.getRandomValues(new Uint32Array(1))[0];
  return uint32.toString(16);
};
