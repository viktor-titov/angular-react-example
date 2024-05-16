import * as React from 'react';
import { FunctionComponent, useEffect, useRef, useState } from 'react';

export interface CounterProps {
  counter: number;
  onClick?: () => void;
}

export const Counter: FunctionComponent<CounterProps> = (props: CounterProps) => {
  const {counter, onClick} = props;
  const counterInner = useRef<ReturnType<typeof setInterval> | null>(null)
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(':::useEffect:props', counter, onClick);
    counterInner.current = setInterval(() => {
      setCount(count + 1);
    }, 1000);

    return () => {
      if (counterInner.current) {
        clearInterval(counterInner.current);
        counterInner.current = null;
      }
    };
  });

  const handleClick = () => {
    console.log('react handleClick');

    if (onClick) {
      onClick()
    }
  }

  return (
    <div>
        <h3>React component "Counter"</h3>
        <div>State counterInner: {count}</div>
        <div>Props counter: {counter}</div>
        <div>
          <button type="button" onClick={handleClick}>click to increase</button>
        </div>
    </div>
  );
};