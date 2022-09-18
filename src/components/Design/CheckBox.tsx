import { ForwardedRef, forwardRef, InputHTMLAttributes } from 'react';

import styles from './CheckBox.module.css';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  shape: 'circle' | 'square';
  direction?: 'row' | 'col';
}

const CheckBox = forwardRef(function CheckBox(props: Props, forwardRef: ForwardedRef<HTMLInputElement>) {
  const { label, id, shape, direction = 'row', ...rest } = props;

  return (
    <label className={[styles.checkbox, 'flex w-max items-center', direction === 'col' ? 'flex-col' : ''].join(' ')}>
      <input id={id} type="checkbox" ref={forwardRef} {...rest} />
      <span className={[styles.checkbox_icon, shape === 'circle' ? 'rounded-full' : ''].join(' ')}></span>
      <div className={['text-sm font-bold cursor-pointer', direction === 'col' ? 'mt-2' : 'ml-2 '].join(' ')}>
        {label}
      </div>
    </label>
  );
});

export default CheckBox;
