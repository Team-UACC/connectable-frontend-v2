import { ReactNode } from 'react';

interface Props {
  title: string;
  children: ReactNode;
}

const Paragraph = ({ title, children }: Props) => {
  return (
    <div className="px-4 py-6">
      <h2 className="text-lg font-bold">{title}</h2>
      <div className="mt-4">
        <span className="leading-6 text-gray3">{children}</span>
      </div>
    </div>
  );
};

export default Paragraph;
