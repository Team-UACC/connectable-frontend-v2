import Lottie from 'react-lottie';

import animationData from '~/assets/lotties/spinner.json';
import KlipQR from '~/components/KlipQR';
import { useKlipLogin } from '~/hooks/useAuth';

export default function KlipAuth() {
  const [method, qrvalue] = useKlipLogin();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  if (method === 'QR')
    return (
      <div>
        {qrvalue === 'DEFAULT' ? (
          <Lottie options={defaultOptions} height={256} width={256} />
        ) : (
          <KlipQR qrvalue={qrvalue} />
        )}
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
  else return <div className="font-bold">카카오톡으로 이동해서 로그인을 완료하세요.</div>;
}
