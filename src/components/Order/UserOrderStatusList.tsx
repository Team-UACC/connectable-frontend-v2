import { useQuery } from 'react-query';

import { fetchOrderStatusList } from '~/apis/orders';

import OrderStatusCard from './UserOrderStatusCard';

const UserOrderStatusList = () => {
  const { data: orderList, isLoading } = useQuery(['userOrderStatusList'], fetchOrderStatusList, {
    cacheTime: 10 * 1000,
    staleTime: 10 * 1000,
  });

  if (isLoading) return <div>loading...</div>;

  return (
    <ul className="w-full">
      {orderList?.map(orderData => (
        <OrderStatusCard key={orderData.orderDetailId} orderData={orderData} />
      ))}
    </ul>
  );
};

export default UserOrderStatusList;
