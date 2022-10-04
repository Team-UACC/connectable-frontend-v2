import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';

import { ACCOUNT } from '~/constants/company';
import { IMAGE_BLUR_DATA_URL } from '~/constants/contents';
import { ORDER_STATUS_MESSAGE } from '~/constants/message';
import { OrderStatus, TicketOrderStatusType } from '~/types/orderType';
import { dayjsKO } from '~/utils/day';

import LinkToKlaytnScope from '../Text/LinkToKlaytnScope';

interface Props {
  orderData: TicketOrderStatusType;
  className?: string;
}

const UserOrderStatusCard = ({ orderData, className }: Props) => {
  return (
    <article className={'relative w-full p-6 ' + className}>
      <div className="relative flex">
        <div className="w-[6px] h-[6px] bg-black mt-1 mr-[18px] rounded-[100%]" />
        <div className="relative flex justify-between w-full">
          <div className="flex flex-col w-[calc(100%-80px)] pr-4">
            <span className="text-xs text-gray4">
              {dayjsKO(orderData.modifiedDate).format('YYYY-MM-DD (ddd) HH:mm')}
            </span>
            <Link href={`/tickets/${orderData.eventId}/${orderData.ticketId}`}>
              <a className="mt-2 text-sm font-bold">{orderData.ticketMetadata.name}</a>
            </Link>
            <OrderStatusText orderStatus={orderData.orderStatus} price={orderData.price} txHash={orderData.txHash} />
          </div>
          <div>
            <Image
              src={orderData.ticketMetadata.image}
              alt="티켓 이미지"
              width={80}
              height={80}
              layout="fixed"
              placeholder="blur"
              blurDataURL={IMAGE_BLUR_DATA_URL}
            />
          </div>
        </div>
      </div>
    </article>
  );
};

const OrderStatusText = ({
  orderStatus,
  price,
  txHash,
}: {
  orderStatus: OrderStatus;
  price: number;
  txHash: string;
}) => {
  return (
    <>
      <span className={`text-sm mt-1`}>{ORDER_STATUS_MESSAGE[orderStatus].message}</span>
      {orderStatus === 'REQUESTED' && (
        <>
          <div className="pb-[80px]" />
          <div className="absolute bottom-0 w-full p-3 text-sm top- text-brand-pink bg-brand-pink-third">
            <span
              className="underline cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(`${ACCOUNT.FLAT_NUMBER} ${ACCOUNT.BANK}`);
                toast.success('클립보드에 복사되었습니다.');
              }}
            >
              {ACCOUNT.BANK} {ACCOUNT.NUMBERL} ({ACCOUNT.OWNER})
            </span>{' '}
            으로
            <br />
            {price.toLocaleString('ko-KR')}원을 입금해주세요.
          </div>
        </>
      )}
      {orderStatus === 'TRANSFER_SUCCESS' && (
        <>
          <div className="pb-[96px]" />
          <div className="absolute bottom-0 w-full p-3 text-sm top- text-brand-pink bg-brand-pink-third">
            <span className="text-sm font-bold">TX_Hash</span>
            <div className="relative w-full mt-4">
              <LinkToKlaytnScope type="tx" tx_hash={txHash}>
                {txHash}
              </LinkToKlaytnScope>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UserOrderStatusCard;
