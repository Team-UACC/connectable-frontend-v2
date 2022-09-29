import { ButtonHTMLAttributes, forwardRef, Ref } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color: 'black' | 'white' | 'pink';
  fullWidth?: boolean;
}

const Button = forwardRef(function Button(props: ButtonProps, forwardRef: Ref<HTMLButtonElement>) {
  const { fullWidth = true, color, children, className, ...rest } = props;

  const widthClassName = (fullWidth ? `w-full` : `w-auto px-4`) + ' ';
  const colorClassName = () => {
    if (color === 'black') {
      return 'bg-black text-white disabled:bg-gray2 disabled:text-gray4';
    } else if (color === 'white') {
      return 'bg-white text-black border-black border-[1px] disabled:bg-background1 disabled:text-gray5 disabled:border-gray6';
    } else if (color === 'pink') {
      return 'bg-brand-pink text-white disabled:bg-brand-pink-third disabled:text-gray4';
    }
  };

  return (
    <button
      ref={forwardRef}
      className={[
        widthClassName,
        colorClassName(),
        'rounded-[0.4rem] leading-[1.4rem] h-[3.5rem] font-semibold',
        className,
      ].join(' ')}
      {...rest}
    >
      <span>{children}</span>
    </button>
  );
});

export default Button;
