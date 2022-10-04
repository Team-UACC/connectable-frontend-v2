import Link from 'next/link';

import { BUSINESS } from '~/constants/company';
import { DOCS_PATH } from '~/constants/path';

const CompanyFooter = () => {
  return (
    <footer className="px-4 py-8 bg-gray1">
      <ul className="flex w-full gap-4 text-xs font-bold text-gray4">
        <li>
          <Link href={DOCS_PATH.TERMS_OF_SERVICE} passHref>
            <a>이용약관</a>
          </Link>
        </li>
        <li>
          <Link href={DOCS_PATH.PRIVACY_POLICY} passHref>
            <a>개인정보처리방침</a>
          </Link>
        </li>
      </ul>

      <ul className="flex flex-col w-full gap-2 mt-4 text-xs text-gray3">
        <li>
          ©2022. {BUSINESS.NAME_ENG} {BUSINESS.NAME}
        </li>
        <li>사업자등록번호: {BUSINESS.REFISTRATION_NUMBER}</li>
        <li>
          대표: {BUSINESS.REPRESENTATIVE} | 주소: {BUSINESS.ADDRESS}
        </li>
        <li>이메일 문의: {BUSINESS.EMAIL}</li>
        <li>전화 문의: {BUSINESS.PHONE}</li>
      </ul>
    </footer>
  );
};

export default CompanyFooter;
