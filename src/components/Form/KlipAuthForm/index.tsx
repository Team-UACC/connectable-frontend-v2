import LoadingSpinner from '~/components/Design/LoadingSpinner';
import KlipQR from '~/components/KlipQR';
import { useKlipLogin } from '~/hooks/useAuth';

export default function KlipAuth() {
  const [method, qrvalue] = useKlipLogin();

  if (method === 'QR')
    return (
      <div className="text-center mt-[128px]">
        {qrvalue === 'DEFAULT' ? <LoadingSpinner /> : <KlipQR qrvalue={qrvalue} />}
        <br />
        <br />
        <a
          className="font-bold text-blue-500 underline "
          href="https://klipwallet.com/"
          target="_blank"
          rel="noreferrer"
        >
          Klip이란?
        </a>
      </div>
    );
  else return <div className="font-bold text-center mt-[256px]">카카오톡으로 이동해서 로그인을 완료하세요.</div>;
}
