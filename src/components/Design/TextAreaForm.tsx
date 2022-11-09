import Image from 'next/image';
import { FormEvent, forwardRef, InputHTMLAttributes, Ref } from 'react';

import { SEND_ICON } from '~/constants/images';

interface Props extends InputHTMLAttributes<HTMLTextAreaElement> {
  handleSubmit: (e: FormEvent) => void;
}

const InputForm = forwardRef(function Input(props: Props, forwardRef: Ref<HTMLTextAreaElement>) {
  const { placeholder = '내용을 입력해주세요.', handleSubmit, ...rest } = props;

  return (
    <form
      className="relative"
      onSubmit={e => {
        e.preventDefault();

        handleSubmit(e);
      }}
    >
      <textarea
        className={
          'border-gray6 focus:border-black border-[1px] rounded-lg p-4 w-full outline-none  caret-brand-pink disabled:border-none disabled:text-gray5 pr-10 resize-none'
        }
        ref={forwardRef}
        spellCheck={false}
        placeholder={placeholder}
        {...rest}
      />
      <button className="absolute -translate-y-1/2 right-3 top-1/2">
        <Image src={SEND_ICON} alt="submit_icon" width={24} height={24} />
      </button>
    </form>
  );
});

export default InputForm;
