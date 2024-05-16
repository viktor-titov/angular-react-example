import * as React from 'react';
import { FunctionComponent, useEffect, useRef, useState } from 'react';

export const Counter: FunctionComponent = () => {

  const counter = useRef<number | null>(null)
  const [count, setCount] = useState(0);

  useEffect(() => {
    counter.current = +setInterval(() => {
      setCount(count + 1);
    }, 3000);

    return () => {
      if (counter.current) {
        clearInterval(counter.current);
        counter.current = null;
      }
    };
  });

  return (
    <div>
        <h3>React component "Counter"</h3>
        <div>State counter: {count}</div>
    </div>
  );
};