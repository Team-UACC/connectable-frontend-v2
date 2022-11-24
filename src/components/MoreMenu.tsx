import Link from 'next/link';

import { useLogout } from '~/hooks/useAuth';
import useFullScreenModal from '~/hooks/useFullScreenModal';
import { useUserStore } from '~/stores/user';

export default function MoreMenu() {
  const { isLoggedIn } = useUserStore();
  const { showLoginModal, hideModal } = useFullScreenModal();
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
          showLoginModal();
        }
      },
    },
    // { name: '회원탈퇴', handleClick: () => {} },
  ];

  return (
    <section className="absolute top-[1rem] left-[2rem] text-base font-semibold text-start w-4/5 ">
      <ul>
        {MENU.map(term => {
          if (term.href === undefined) {
            return (
              <li
                key={term.name}
                className="w-full mb-2 leading-[3rem] cursor-pointer hover:font-bold hover:text-lg hover:leading-[3rem]"
              >
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
