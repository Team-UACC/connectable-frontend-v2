import _ from 'lodash';
import Image from 'next/image';
import { ReactNode, useEffect, useRef, useState } from 'react';

import { requestSMSCertificationKey, verifyCertificationKey } from '~/apis/auth';
import Button from '~/components/Design/Button';
import Input from '~/components/Design/Input';
import { DEFAULT_PROFILE } from '~/constants/images';
import useUserInfoForm from '~/hooks/useUserInfoForm';
import { timeFormatterForMinute } from '~/utils/day';

interface Props {
  userName: string;
  phoneNumber: string;
}

type CertifiedPhoneNumberStep = 'Start' | 'InProgress' | 'Fail' | 'Success';
const CERTICIFICATION_DURATION = 180;

export default function ProfileEditForm({ userName, phoneNumber }: Props) {
  const [certifiedPhoneNumberStep, setCertifiedPhoneNumberStep] = useState<CertifiedPhoneNumberStep>('Success');
  const [certificationRemainTime, setCertificationRemainTime] = useState(CERTICIFICATION_DURATION);

  const userNameRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const certificationKeyRef = useRef<HTMLInputElement>(null);

  const {
    handleChangeNickNameInput,
    handleChangePhoneNumberInput,
    handleClickSubmitButton,
    validationNickName,
    validationPhoneNumber,
    setValidationNickName,
    setValidationPhoneNumber,
  } = useUserInfoForm({
    userNameRef,
    phoneNumberRef,
  });

  const handleClickCertificatePhoneNumber = () => {
    setCertifiedPhoneNumberStep('InProgress');
    requestSMSCertificationKey(phoneNumberRef.current?.value as string, CERTICIFICATION_DURATION / 60);
    setCertificationRemainTime(CERTICIFICATION_DURATION);
  };

  const debouncedPhoneNumberCertification = _.debounce(async (certificationKey: string) => {
    verifyCertificationKey(phoneNumberRef.current?.value as string, certificationKey).then(res => {
      if (res) setCertifiedPhoneNumberStep('Success');
      else setCertifiedPhoneNumberStep('Fail');
    });
  }, 100);

  useEffect(() => {
    let id: NodeJS.Timer;
    if (phoneNumberRef.current?.value !== phoneNumber && certifiedPhoneNumberStep !== 'Start') {
      id = setInterval(() => {
        setCertificationRemainTime(now => {
          if (now === 1) {
            setCertifiedPhoneNumberStep('Start');
            return CERTICIFICATION_DURATION;
          }

          return now - 1;
        });
      }, 1000);
    }
    return () => {
      clearInterval(id);
    };
  }, [certifiedPhoneNumberStep, phoneNumber]);

  useEffect(() => {
    userNameRef.current?.focus();
    setValidationNickName(true);
    setValidationPhoneNumber(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (userNameRef.current?.value === userName) {
      setValidationNickName(true);
    }
  }, [setValidationNickName, userName, validationNickName]);

  return (
    <div className="relative w-full px-[18px]">
      <form className={`flex w-full bg-transparent `}>
        <FormPageContainer>
          <Image src={DEFAULT_PROFILE} alt="profile" width={100} height={100} style={{ borderRadius: '50%' }} />
          <Input
            name="username"
            label="?????????"
            description={
              validationNickName === 'OVERLAP'
                ? '????????? ??????????????????.'
                : validationNickName === false
                ? '???????????? ?????? / ?????? / ?????? / 2~20??? ????????? ??????????????????.'
                : ''
            }
            isError={validationNickName !== true}
            type="text"
            placeholder="???????????? ??????????????????"
            defaultValue={userName}
            onChange={handleChangeNickNameInput}
            autoComplete="off"
            spellCheck="false"
            ref={userNameRef}
          />
          <div className="relative">
            <Input
              name="phonenumber"
              label="????????????"
              type="tel"
              placeholder="010-0000-0000"
              maxLength={13}
              onChange={e => {
                handleChangePhoneNumberInput(e);

                setCertifiedPhoneNumberStep(e.currentTarget.value === phoneNumber ? 'Success' : 'Start');
              }}
              defaultValue={phoneNumber}
              autoComplete="off"
              spellCheck={false}
              ref={phoneNumberRef}
            />
            <Button
              color="black"
              className="absolute top-[29px] right-0 px-3 text-sm w-max min-w-[5rem]"
              disabled={
                phoneNumberRef.current?.value === phoneNumber ||
                validationPhoneNumber !== true ||
                certifiedPhoneNumberStep !== 'Start'
              }
              onClick={handleClickCertificatePhoneNumber}
            >
              {validationPhoneNumber &&
              phoneNumberRef.current?.value !== phoneNumber &&
              certifiedPhoneNumberStep !== 'Start'
                ? timeFormatterForMinute(certificationRemainTime * 1000)
                : '????????????'}
            </Button>
          </div>
          {phoneNumberRef.current?.value !== phoneNumber && certifiedPhoneNumberStep !== 'Start' && (
            <Input
              name="certificationNumber"
              type="text"
              placeholder="??????????????? ??????????????????"
              onChange={() => {
                if ((certificationKeyRef.current?.value.length ?? 0) < 6) {
                  setCertifiedPhoneNumberStep('InProgress');
                } else {
                  debouncedPhoneNumberCertification(certificationKeyRef.current?.value as string);
                }
              }}
              description={
                certifiedPhoneNumberStep === 'InProgress'
                  ? '????????? ????????? ??????????????? ??????????????????.'
                  : certifiedPhoneNumberStep === 'Fail'
                  ? '??????????????? ???????????? ????????????.'
                  : certifiedPhoneNumberStep === 'Success'
                  ? '?????????????????????.'
                  : undefined
              }
              isError={certifiedPhoneNumberStep === 'Fail'}
              autoComplete="off"
              spellCheck={false}
              ref={certificationKeyRef}
            />
          )}
          <footer className="sticky bottom-0 z-10 w-full mt-4 bg-white max-w-layout">
            <Button
              color="black"
              onClick={e => {
                e.preventDefault();
                handleClickSubmitButton();
              }}
              disabled={validationNickName !== true || certifiedPhoneNumberStep !== 'Success'}
            >
              ????????????
            </Button>
          </footer>
        </FormPageContainer>
      </form>
    </div>
  );
}

const FormPageContainer = ({ children }: { children: ReactNode }) => (
  <div className="relative flex flex-col w-full gap-4 m-auto mt-10">{children}</div>
);
