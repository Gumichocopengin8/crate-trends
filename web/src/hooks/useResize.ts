import { RefObject, useLayoutEffect, useState } from 'react';

const useResize = (ref: RefObject<HTMLElement>): [number, number] => {
  const [height, setHeight] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);

  useLayoutEffect(() => {
    setWidth(ref.current.offsetWidth);
    setHeight(ref.current.offsetHeight);
  }, [ref]);

  return [height, width];
};

export default useResize;
