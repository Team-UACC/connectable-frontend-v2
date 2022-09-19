import { ChangeEventHandler, ForwardedRef, forwardRef, InputHTMLAttributes } from 'react';

import styles from './CheckBox.module.css';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  shape: 'circle' | 'square';
  direction?: 'row' | 'col';
  handleChange?: ChangeEventHandler<HTMLInputElement>;
}

const CheckBox = forwardRef(function CheckBox(props: Props, forwardRef: ForwardedRef<HTMLInputElement>) {
  const { label, id, shape, direction = 'row', handleChange, ...rest } = props;

  return (
    <label className={[styles.checkbox, 'flex w-max items-center', direction === 'col' ? 'flex-col' : ''].join(' ')}>
      <input id={id} type="checkbox" ref={forwardRef} {...rest} onChange={handleChange} />
      <span className={[styles.checkbox_icon, shape === 'circle' ? 'rounded-full' : ''].join(' ')}></span>
      <div className={['text-sm font-bold cursor-pointer', direction === 'col' ? 'pt-2' : 'pl-2 '].join(' ')}>
        {label}
      </div>
    </label>
  );
});

export default CheckBox;
