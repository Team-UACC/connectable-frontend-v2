import { forwardRef, InputHTMLAttributes, Ref } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  description?: string;
  isError?: boolean;
}

const Input = forwardRef(function Input(props: Props, forwardRef: Ref<HTMLInputElement>) {
  const { label, name, description, isError = false, ...rest } = props;

  const borderClassName = isError ? 'border-error focus:border-error' : 'border-gray6 focus:border-black';

  return (
    <div>
      {label && (
        <label className="ml-1 text-sm font-bold" htmlFor={name}>
          {label}
        </label>
      )}
      <input
        className={[
          borderClassName,
          label ? 'mt-1' : '',
          'border-[1px] rounded-lg p-4 w-full outline-none  caret-brand-pink disabled:border-none disabled:text-gray5',
        ].join(' ')}
        ref={forwardRef}
        id={name}
        {...rest}
      />
      {description && (
        <span className={['ml-1 text-xs', isError ? 'text-error' : 'text-gray3'].join(' ')}>{description}</span>
      )}
    </div>
  );
});

export default Input;
