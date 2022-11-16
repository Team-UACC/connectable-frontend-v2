import Image from 'next/image';

interface Props {
  profileImage: string;
  userName: string;
  contents: string;
  writtenAt: string;
  additional?: string;
}

const Comment = ({ profileImage, userName, contents, writtenAt, additional = '' }: Props) => {
  return (
    <div className="relative flex w-full bg-transparent">
      <div className="mr-2 shrink-0">
        <Image src={profileImage} alt="profile_image" width={36} height={36} />
      </div>
      <div className="flex flex-col gap-[2px]">
        <div className="flex text-xs font-bold ">
          <div className="text-gray3">{userName}</div>
          {additional ? <div className="ml-1 text-brand-skyblue">{additional}</div> : undefined}
        </div>
        <div className="text-gray1">{contents}</div>
        <div className="flex text-xs">
          <div className="text-gray4">{writtenAt}</div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
