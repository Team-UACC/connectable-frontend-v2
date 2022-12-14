import _ from 'lodash';
import { KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';

import { requestSMSCertificationKey, verifyCertificationKey } from '~/apis/auth';
import Button from '~/components/Design/Button';
import CheckBox from '~/components/Design/CheckBox';
import Input from '~/components/Design/Input';
import useUserInfoForm from '~/hooks/useUserInfoForm';
import { timeFormatterForMinute } from '~/utils/day';

import MoreDescription from './MoreDescription';

export type SignUpFormPage = 'Terms' | 'UserInfo' | 'Finish';
type CertifiedPhoneNumberStep = 'Start' | 'InProgress' | 'Fail' | 'Success';

const CERTICIFICATION_DURATION = 180;

export default function SignUpForm() {
  const [page, setPage] = useState<SignUpFormPage>('Terms');
  const [certifiedPhoneNumberStep, setCertifiedPhoneNumberStep] = useState<CertifiedPhoneNumberStep>('Start');
  const [certificationRemainTime, setCertificationRemainTime] = useState(CERTICIFICATION_DURATION);

  const userNameRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const certificationKeyRef = useRef<HTMLInputElement>(null);

  const termOfServiceRef = useRef<HTMLInputElement>(null);
  const termOfPrivacyRef = useRef<HTMLInputElement>(null);

  const {
    handleChangePhoneNumberInput,
    handleClickSubmitButton,
    handleChangeNickNameInput,
    validationNickName,
    validationPhoneNumber,
  } = useUserInfoForm({
    userNameRef,
    phoneNumberRef,
  });

  const [validationTerms, setValidationTerms] = useState(false);

  const handleChangeTermsCheckBox = () => {
    setValidationTerms((termOfServiceRef.current?.checked && termOfPrivacyRef.current?.checked) ?? false);
  };

  const handleCheckKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      document.activeElement?.id !== 'username' && e.preventDefault();
    }
    if (e.key === 'Enter') {
      if (page === 'Terms') validationTerms === true && setPage('UserInfo');
      else if (page === 'UserInfo')
        validationNickName === true && certifiedPhoneNumberStep === 'Success' && setPage('Finish');
      else handleClickSubmitButton();
    }
  };

  const handleClickCertificatePhoneNumber = useCallback(() => {
    setCertifiedPhoneNumberStep('InProgress');
    requestSMSCertificationKey(phoneNumberRef.current?.value as string, CERTICIFICATION_DURATION / 60);
    setCertificationRemainTime(CERTICIFICATION_DURATION);
  }, []);

  const debouncedPhoneNumberCertification = _.debounce(async (certificationKey: string) => {
    verifyCertificationKey(phoneNumberRef.current?.value as string, certificationKey).then(res => {
      if (res) setCertifiedPhoneNumberStep('Success');
      else setCertifiedPhoneNumberStep('Fail');
    });
  }, 100);

  useEffect(() => {
    let id: NodeJS.Timer;
    if (certifiedPhoneNumberStep !== 'Start') {
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
  }, [certifiedPhoneNumberStep]);

  useEffect(() => {
    setTimeout(() => {
      if (page === 'UserInfo') userNameRef.current?.focus();
    }, 550);
  }, [page]);

  return (
    <form onKeyDown={handleCheckKeyDown}>
      <div className="p-[18px] flex flex-col gap-4">
        <div />
        <div className="text-center">
          <span className="font-black font-montserrat">CONNECTABLE</span>??? ?????? ??? ???????????????.
        </div>

        <div />

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
          isError={(userNameRef.current?.value.length ?? 0) > 0 && validationNickName !== true}
          type="text"
          placeholder="???????????? ??????????????????"
          onChange={handleChangeNickNameInput}
          autoComplete="off"
          spellCheck="false"
          ref={userNameRef}
        />

        <MoreDescription type="UserName" />

        <div className="relative">
          <Input
            name="phonenumber"
            label="????????????"
            type="tel"
            placeholder="010-0000-0000"
            maxLength={13}
            onChange={e => {
              handleChangePhoneNumberInput(e);
            }}
            autoComplete="off"
            spellCheck={false}
            ref={phoneNumberRef}
          />
          <Button
            color="black"
            className="absolute top-[29px] right-0 px-3 text-sm w-max min-w-[5rem]"
            disabled={validationPhoneNumber !== true || certifiedPhoneNumberStep !== 'Start'}
            onClick={handleClickCertificatePhoneNumber}
          >
            {validationPhoneNumber && certifiedPhoneNumberStep !== 'Start'
              ? timeFormatterForMinute(certificationRemainTime * 1000)
              : '????????????'}
          </Button>
        </div>
        {certifiedPhoneNumberStep !== 'Start' && (
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

        <MoreDescription type="PhoneNumber" />
        <div />
        <div />
        <div className="relative flex flex-col w-full gap-6 ">
          <div className="flex items-end w-full gap-2">
            <CheckBox
              ref={termOfServiceRef}
              handleChange={handleChangeTermsCheckBox}
              id={'service_agreement'}
              label="[??????] Connectable ???????????? >"
              shape="square"
            />
            <a
              href="/docs/terms-of-service"
              target="_blank"
              className="text-sm font-semibold underline underline-offset-2"
            >{`????????????`}</a>
          </div>
          <CheckBox
            ref={termOfPrivacyRef}
            handleChange={handleChangeTermsCheckBox}
            id={'privacy_agreement'}
            label="[??????] ???????????? ????????????"
            shape="square"
          />

          <p className="text-xs font-semibold text-start text-gray2">
            ???????????? ?????? ?????? ??? ??????
            <br />
            {'>'} ?????? ????????? ?????? ??? ?????? ?????? ?????? ??? ??????
            <br />
            <br />
            ?????? ??????
            <br />
            {'>'} ???????????????, Klip ??????
            <br />
            <br />
            ????????????
            <br />
            {'>'} ????????? ?????? ?????? ?????? ?????? ??? ??????
            <br />
            <br />
            ????????? ????????? ??? ????????? ?????? ?????? ??? ????????? ????????? ???????????????.
            <br />
          </p>
        </div>

        <Button
          color="black"
          onClick={e => {
            e.preventDefault();
            handleClickSubmitButton();
          }}
          disabled={
            validationNickName === false ||
            validationPhoneNumber === false ||
            termOfServiceRef.current?.checked === false ||
            termOfPrivacyRef.current?.checked === false
          }
        >
          ???????????? ????????????
        </Button>

        <MoreDescription type="Finish" />
      </div>
    </form>
  );
}
