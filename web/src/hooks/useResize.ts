/**
 * Copyright (c) 2020-Present, Keita Nonaka
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { RefObject, useCallback, useEffect, useState } from 'react';

const useResize = (ref: RefObject<HTMLElement>): [width: number, height: number] => {
  const [height, setHeight] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);

  const handleResize = useCallback((entries: ResizeObserverEntry[]) => {
    if (!Array.isArray(entries)) {
      return;
    }

    const entry = entries[0];
    if (entry) {
      setWidth(entry.contentRect.width);
      setHeight(entry.contentRect.height);
    }
  }, []);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const resizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => handleResize(entries));
    resizeObserver.observe(ref.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [handleResize, ref]);

  return [width, height];
};

export default useResize;
