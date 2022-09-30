interface Props {
  title: string;
  color: 'pink' | 'white' | 'blue';
}

const Label = ({ title, color }: Props) => {
  const colorClassName =
    color === 'pink'
      ? `bg-brand-pink text-white`
      : color === 'white'
      ? `bg-white text-black border-[1px] border-gray6`
      : `bg-[rgba(61,174,255,0.7)] text-white`;
  return (
    <div className={['w-max px-4 py-2 font-montserrat font-black rounded-[1rem] shadow-md', colorClassName].join(' ')}>
      {title}
    </div>
  );
};

export default Label;
