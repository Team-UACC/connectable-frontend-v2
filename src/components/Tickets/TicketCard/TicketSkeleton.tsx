import SkeletonBox from '~/components/Design/SkeletonBox';

const TicketSkeleton = () => {
  return (
    <div role="status" className="flex items-center justify-between w-full px-8 py-4 bg-white max-w-layout">
      <SkeletonBox width={100} height={100} className="mb-2.5" />
      <div className="w-2/3">
        <SkeletonBox width={50} height={8} className="mb-2.5" />
        <SkeletonBox width={150} height={8} className="mb-2.5" />
        <SkeletonBox width={150} height={8} className="mb-2.5" />
        <SkeletonBox width={100} height={8} className="mb-2.5" />
        <SkeletonBox width={120} height={8} className="mb-2.5" />
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default TicketSkeleton;
