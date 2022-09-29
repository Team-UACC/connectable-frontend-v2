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
          <span className="font-black font-montserrat">CONNECTABLE</span>에 오신 걸 환영합니다.
        </div>

        <div />

        <Input
          name="username"
          label="닉네임"
          description={
            validationNickName === 'OVERLAP'
              ? '중복된 닉네임입니다.'
              : validationNickName === false
              ? '닉네임은 영어 / 한글 / 숫자 / 2~20자 사이로 작성해주세요.'
              : ''
          }
          isError={(userNameRef.current?.value.length ?? 0) > 0 && validationNickName !== true}
          type="text"
          placeholder="닉네임을 입력해주세요"
          onChange={handleChangeNickNameInput}
          autoComplete="off"
          spellCheck="false"
          ref={userNameRef}
        />

        <MoreDescription type="UserName" />

        <div className="relative">
          <Input
            name="phonenumber"
            label="전화번호"
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
              : '인증하기'}
          </Button>
        </div>
        {certifiedPhoneNumberStep !== 'Start' && (
          <Input
            name="certificationNumber"
            type="text"
            placeholder="인증번호를 입력해주세요"
            onChange={() => {
              if ((certificationKeyRef.current?.value.length ?? 0) < 6) {
                setCertifiedPhoneNumberStep('InProgress');
              } else {
                debouncedPhoneNumberCertification(certificationKeyRef.current?.value as string);
              }
            }}
            description={
              certifiedPhoneNumberStep === 'InProgress'
                ? '문자로 전송된 인증번호를 입력해주세요.'
                : certifiedPhoneNumberStep === 'Fail'
                ? '인증번호가 일치하지 않습니다.'
                : certifiedPhoneNumberStep === 'Success'
                ? '인증되었습니다.'
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
              label="[필수] Connectable 이용약관 >"
              shape="square"
            />
            <a
              href="docs/terms-of-service"
              target="_blank"
              className="text-sm font-semibold underline underline-offset-2"
            >{`확인하기`}</a>
          </div>
          <CheckBox
            ref={termOfPrivacyRef}
            handleChange={handleChangeTermsCheckBox}
            id={'privacy_agreement'}
            label="[필수] 개인정보 수집동의"
            shape="square"
          />

          <p className="text-xs font-semibold text-start text-gray2">
            개인정보 수집 이용 및 목적
            <br />
            {'>'} 공연 예매자 확인 및 관련 업무 수행 시 이용
            <br />
            <br />
            수집 항목
            <br />
            {'>'} 휴대폰번호, Klip 주소
            <br />
            <br />
            보유기간
            <br />
            {'>'} 서비스 종료 또는 회원 탈퇴 시 파기
            <br />
            <br />
            동의를 거부할 수 있으며 동의 거부 시 서비스 이용이 불가합니다.
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
          회원가입 완료하기
        </Button>

        <MoreDescription type="Finish" />
      </div>
    </form>
  );
}
