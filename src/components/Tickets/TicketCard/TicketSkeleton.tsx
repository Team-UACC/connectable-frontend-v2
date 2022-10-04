const TicketSkeleton = () => {
  return (
    <div
      role="status"
      className="flex items-center justify-between w-full px-8 py-4 bg-white max-w-layout animate-pulse"
    >
      <div className="flex items-center justify-center min-w-[100px] h-[100px] bg-gray6 rounded"></div>
      <div className="w-2/3">
        <div className="h-2 bg-gray6 rounded-full w-[50px] mb-2.5"></div>
        <div className="h-2 bg-gray6 rounded-full mb-2.5"></div>
        <div className="h-2 bg-gray6 rounded-full w-[150px] mb-2.5"></div>
        <div className="h-2 bg-gray6 rounded-full w-[100px] mb-2.5"></div>
        <div className="h-2 bg-gray6 rounded-full w-[120px]"></div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default TicketSkeleton;
