import Lottie from 'react-lottie';

import animationData from '~/assets/lotties/spinner.json';

interface Props {
  size?: number;
}

const LoadingSpinner = ({ size }: Props) => {
  return (
    <Lottie
      options={{
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice',
        },
      }}
      height={size ?? 256}
      width={size ?? 256}
    />
  );
};

export default LoadingSpinner;
