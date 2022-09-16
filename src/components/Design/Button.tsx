import { ButtonHTMLAttributes, forwardRef, Ref } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  color: 'black' | 'white';
  fullWidth?: boolean;
}

const Button = forwardRef(function Button(props: Props, forwardRef: Ref<HTMLButtonElement>) {
  const { fullWidth = true, color, children, ...rest } = props;

  const widthClassName = (fullWidth ? `w-full` : `w-auto px-4`) + ' ';
  const colorClassName =
    (color === 'black'
      ? 'bg-black text-white disabled:bg-gray2 disabled:text-gray4'
      : 'bg-white text-black border-black border-[1px] disabled:bg-background1 disabled:text-gray5 disabled:border-gray6') +
    ' ';

  return (
    <button
      ref={forwardRef}
      className={widthClassName + colorClassName + 'rounded-[0.4rem] leading-[1.4rem] h-[3.5rem] font-bold'}
      {...rest}
    >
      <span>{children}</span>
    </button>
  );
});

export default Button;
