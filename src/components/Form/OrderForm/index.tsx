import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';

import Button from '~/components/Design/Button';
import CheckBox from '~/components/Design/CheckBox';
import Input from '~/components/Design/Input';
import useOrderForm from '~/hooks/useOrderForm';

import FormPageContainer from '../FormPageContainer';

import MoreDescription from './MoreDescription';

export type OrderFormPageType = 'OnBoarding' | 'Agreement' | 'UserInfo' | 'DepositCheck' | 'Finish';

interface Props {
  amount: number;
  ticketIdList: Array<number>;
  eventId: number;
}

export default function OrderForm({ amount, ticketIdList, eventId }: Props) {
  const [page, setPage] = useState<OrderFormPageType>('OnBoarding');
  const [isDisabledMoveToAgreemetnPage] = useState(false);
  const [isDisabledUserInfoPage, setIsDisabledUserInfoPage] = useState(true);
  const [isDisabledMoveToFinishPage, setIsDisabledMoveToFinishPage] = useState(true);
  const [isDisabledSubmit, setIsDisabledSubmit] = useState(true);

  const userNameRef = useRef<HTMLInputElement>(null);
  const depositCheckRef = useRef<HTMLInputElement>(null);

  const isSubmitRef = useRef(false);

  const handleChangeTermsCheckBox = (e: ChangeEvent<HTMLInputElement>) => {
    setIsDisabledUserInfoPage(!e.currentTarget.checked ?? false);
  };

  const handleChangeSubmitTerms = (e: ChangeEvent<HTMLInputElement>) => {
    setIsDisabledSubmit(!e.currentTarget.checked ?? false);
  };

  const [handleClickSubmitButton] = useOrderForm({
    userNameRef,
    ticketIdList,
    eventId,
  });

  const handleChangeUserNameInput = (e: ChangeEvent<HTMLInputElement>) =>
    setIsDisabledMoveToFinishPage(e.currentTarget.value === '');

  const handleCheckEnter = (e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      document.activeElement?.id !== 'username' && e.preventDefault();
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      if (page === 'OnBoarding') !isDisabledMoveToAgreemetnPage && setPage('Agreement');
      else if (page === 'Agreement') !isDisabledUserInfoPage && setPage('UserInfo');
      else if (page === 'UserInfo') !isDisabledMoveToFinishPage && setPage('Finish');
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (page === 'UserInfo') {
        userNameRef.current?.focus();
      }
      if (page === 'DepositCheck') depositCheckRef.current?.focus();
    }, 550);
  }, [page]);

  return (
    <div className="relative w-full h-full px-[18px] overflow-x-hidden">
      <form
        className={`flex ${page === 'Agreement' && '-translate-x-[25%]'}  
         ${page === 'UserInfo' && '-translate-x-[50%]'} ${
          page === 'Finish' && '-translate-x-[75%]'
        } w-[400%] bg-transparent rounded transition-all ease-in-out duration-[0.5s]`}
        onKeyDown={handleCheckEnter}
      >
        <FormPageContainer>
          <p className="font-semibold text-center">
            {`?????? ${ticketIdList.length}???, ??? ${amount.toLocaleString('ko-KR')}????????????.`}
            <br />
            <br />
            ?????? ????????? ?????? ??????????????????.
          </p>
          <Button
            color="black"
            onClick={e => {
              e.preventDefault();
              setPage('Agreement');
            }}
            disabled={isDisabledMoveToAgreemetnPage}
          >
            ??????
          </Button>
        </FormPageContainer>
        <FormPageContainer>
          <CheckBox
            handleChange={handleChangeTermsCheckBox}
            id={'privacy_agreement'}
            label="[??????] ???????????? ????????????"
            shape="square"
          />

          <MoreDescription page="Agreement" amount={amount} />

          <br />

          <div className="flex gap-4 min-w-2/3 ">
            <Button
              color="black"
              onClick={e => {
                e.preventDefault();
                setPage('OnBoarding');
              }}
              disabled={false}
            >
              ??????
            </Button>
            <Button
              color="black"
              onClick={e => {
                e.preventDefault();
                setPage('UserInfo');
              }}
              disabled={isDisabledUserInfoPage}
            >
              ??????
            </Button>
          </div>
        </FormPageContainer>
        <FormPageContainer>
          <Input
            name="username"
            label="????????? ??????"
            type="text"
            placeholder="????????? ??????????????????"
            onChange={handleChangeUserNameInput}
            autoComplete="off"
            spellCheck={false}
            ref={userNameRef}
          />
          <MoreDescription page="UserName" amount={amount} />

          <div className="flex gap-4 min-w-2/3 ">
            <Button
              color="black"
              onClick={e => {
                e.preventDefault();
                setPage('Agreement');
              }}
              disabled={false}
            >
              ??????
            </Button>
            <Button
              color="black"
              onClick={e => {
                e.preventDefault();
                setPage('Finish');
              }}
              disabled={isDisabledMoveToFinishPage}
            >
              ??????
            </Button>
          </div>
        </FormPageContainer>

        <FormPageContainer>
          <MoreDescription page="DepositCheck" amount={amount} />
          <div className="py-4 m-auto">
            <CheckBox
              handleChange={handleChangeSubmitTerms}
              id={'final_agreement'}
              label="[??????] ??? ????????? ??????????????????."
              shape="square"
            />
          </div>

          <div className="relative flex flex-col w-2/3 gap-4 m-auto">
            <Button
              color="black"
              onClick={e => {
                e.preventDefault();
                setPage('UserInfo');
              }}
              disabled={false}
            >
              ??????
            </Button>
            <Button
              color="black"
              onClick={e => {
                e.preventDefault();
                handleClickSubmitButton(e);
                isSubmitRef.current = true;
              }}
              disabled={isDisabledSubmit}
            >
              ?????? ??? ????????????
            </Button>
          </div>

          <MoreDescription page="Finish" amount={amount} />
        </FormPageContainer>
      </form>
    </div>
  );
}
