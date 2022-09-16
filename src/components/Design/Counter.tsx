import { ForwardedRef, forwardRef, useCallback, useEffect, useMemo, useState } from 'react';

interface Props {
  deafultValue?: number;
  max?: number;
  min?: number;
  handleChangeCount?: (count: number) => void;
}

const Counter = forwardRef(function Counter(props: Props, forwardRef: ForwardedRef<HTMLDivElement>) {
  const { deafultValue = 0, max = Infinity, min = 0, handleChangeCount } = props;

  const [count, setCount] = useState(deafultValue);

  const BoxClassName = useMemo(() => 'w-[2rem] text-center border-[1px] border-gray6', []);

  const handleClickMinusButton = useCallback(() => {
    setCount(now => Math.max(min, now - 1));
  }, [min]);

  const handleClickPlusButton = useCallback(() => {
    setCount(now => Math.min(max, now + 1));
  }, [max]);

  useEffect(() => {
    handleChangeCount && handleChangeCount(count);
  }, [count, handleChangeCount]);

  return (
    <div className="w-[6rem] h-[2rem] flex font-bold text-sm leading-[2rem]">
      <button
        className={[BoxClassName, 'disabled:opacity-30'].join(' ')}
        disabled={count === min}
        onClick={handleClickMinusButton}
      >
        -
      </button>
      <div ref={forwardRef} className={BoxClassName}>
        {count}
      </div>
      <button
        className={[BoxClassName, 'disabled:opacity-30'].join(' ')}
        disabled={count === max}
        onClick={handleClickPlusButton}
      >
        +
      </button>
    </div>
  );
});

export default Counter;
