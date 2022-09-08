import type { NextPage } from 'next';
import Image from 'next/image';

const Home: NextPage = () => {
  return (
    <h1 className="font-bold font-montserrat">
      Montserrat
      <Image src={`/icons/Connectable_sg2_w.png`} alt="logo" width={170} height={36} />
    </h1>
  );
};

export default Home;
