import { MouseEvent, ReactNode } from 'react';

interface Props {
  title: string;
  description: string | ReactNode;
  cancleButtonName?: string;
  handleCancel?: (e: MouseEvent) => void;
  successButtonName: string;
  handleSuccess: (e: MouseEvent) => void;
}

const NotificationForm = ({
  title,
  description,
  cancleButtonName,
  handleCancel,
  successButtonName,
  handleSuccess,
}: Props) => {
  return (
    <div className="flex flex-col justify-between gap-4 p-4 ">
      <div className="text-lg font-bold text-gray1 ">{title}</div>
      <div className="text-sm text-gray2">{description}</div>
      <div className="flex justify-end gap-6">
        {cancleButtonName && handleCancel && (
          <button className="font-semibold text-gray3" onClick={handleCancel}>
            {cancleButtonName}
          </button>
        )}
        <button className="font-semibold text-gray1" onClick={handleSuccess}>
          {successButtonName}
        </button>
      </div>
    </div>
  );
};

export default NotificationForm;
