import { ChangeEvent, useRef, useState } from 'react';

import Button from '~/components/Design/Button';
import Input from '~/components/Design/Input';
import KlipQR from '~/components/KlipQR';
import useTicketByIdsQuery from '~/hooks/apis/useTicketByIdsQuery';
import useKlip from '~/hooks/useKlip';
import { useModalStore } from '~/stores/modal';
import { useUserStore } from '~/stores/user';
import { isAdrress } from '~/utils/index';
import { getSafeTransferFromRequestKey } from '~/utils/klip';

import FormPageContainer from '../FormPageContainer';

interface Props {
  blockchain: 'Klaytn';
  eventId: number;
  ticketId: number;
}

export default function NFTTransferForm({ blockchain, eventId, ticketId }: Props) {
  const { klaytnAddress } = useUserStore();
  const { hideModal } = useModalStore();

  const [qrvalue, setQrvalue] = useState('DEFAULT');
  const [isEmpty, setIsEmpty] = useState(true);
  const [isAddress, setIsAddress] = useState(false);

  const { requestKlipTransaction } = useKlip({
    onSettled: () => {
      hideModal();
    },
  });

  const { data: ticketDetail } = useTicketByIdsQuery(Number(eventId), Number(ticketId));

  const transferToAddressInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setIsEmpty(value.length === 0);
    setIsAddress(isAdrress(value));
  };

  const handleSubmit = async () => {
    const requestKey = await getSafeTransferFromRequestKey({
      from: klaytnAddress,
      to: transferToAddressInputRef.current?.value as string,
      tokenId: ticketDetail?.tokenId as number,
      contractAddress: ticketDetail?.contractAddress as string,
    });

    requestKlipTransaction({ requestKey, setQrvalue });
  };

  if (qrvalue !== 'DEFAULT') {
    return (
      <div className="w-full m-auto mt-[4rem] text-center">
        <KlipQR qrvalue={qrvalue} />
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden">
      <form
        className={`flex w-full bg-transparent `}
        onSubmit={e => {
          e.preventDefault();
        }}
      >
        <FormPageContainer>
          <Input
            name="transferToAddress"
            label="????????? ?????????????"
            description={
              isAddress
                ? `??? Klaytn ????????? ???????????????.`
                : isEmpty
                ? `${blockchain} ???????????? ?????? ??? ????????????.`
                : '????????? ???????????? ????????????.'
            }
            isError={!isEmpty && !isAddress}
            type="text"
            placeholder="?????? ??????????????????"
            autoComplete="off"
            spellCheck="false"
            onChange={handleChange}
            ref={transferToAddressInputRef}
          />
          <Button color="black" onClick={handleSubmit} disabled={isAddress === false}>
            ????????????
          </Button>
        </FormPageContainer>
      </form>
    </div>
  );
}
