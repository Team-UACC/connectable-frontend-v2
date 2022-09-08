import { ForwardedRef, forwardRef, InputHTMLAttributes } from 'react';

import styles from './CheckBox.module.css';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  shape: 'circle' | 'square';
}

const CheckBox = forwardRef(function CheckBox(props: Props, forwardRef: ForwardedRef<HTMLInputElement>) {
  const { label, id, shape, ...rest } = props;

  return (
    <label className={[styles.checkbox, 'flex h-5 items-center'].join(' ')}>
      <input id={id} type="checkbox" ref={forwardRef} {...rest} />
      <span className={[styles.checkbox_icon, shape === 'circle' ? 'rounded-full' : ''].join(' ')}></span>
      <span className="ml-2 text-sm font-bold cursor-pointer">{label}</span>
    </label>
  );
});

export default CheckBox;
