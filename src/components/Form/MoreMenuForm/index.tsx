import Link from 'next/link';

import { useLogout } from '~/hooks/useAuth';
import { useModalStore } from '~/stores/modal';
import { useUserStore } from '~/stores/user';

import KlipAuth from '../KlipAuthForm';

export default function MoreMenu() {
  const { isLoggedIn } = useUserStore();
  const { showModal, hideModal } = useModalStore();
  const logOut = useLogout();

  const MENU: Array<{ name: string; href?: string; handleClick?: () => any }> = [
    { name: '1:1 문의하기', href: 'docs/chat' },
    { name: 'Connectable 안내서', href: 'docs/guide' },
    { name: '이용약관', href: 'docs/terms-of-service' },
    { name: '개인정보처리방침', href: 'docs/privacy-policy' },
    {
      name: isLoggedIn ? '로그아웃' : '로그인',
      handleClick: () => {
        if (isLoggedIn) {
          logOut();
          hideModal();
        } else {
          showModal('로그인', <KlipAuth />);
        }
      },
    },
    { name: '회원탈퇴', handleClick: () => {} },
  ];

  return (
    <section className="absolute top-[1rem] left-[2rem] text-base font-semibold text-start w-4/5 ">
      <ul>
        {MENU.map(term => {
          if (term.href === undefined) {
            return (
              <li className="w-full mb-2 leading-[3rem] cursor-pointer hover:font-bold hover:text-lg hover:leading-[3rem]">
                <button className="w-full text-start" onClick={term.handleClick}>
                  {term.name}
                </button>
              </li>
            );
          }
          return (
            <Link key={term.name} href={`/${term.href}`} passHref>
              <a>
                <li className="w-full mb-2 leading-[3rem] cursor-pointer hover:font-bold hover:text-lg hover:leading-[3rem]">
                  {term.name}
                </li>
              </a>
            </Link>
          );
        })}
      </ul>
    </section>
  );
}
