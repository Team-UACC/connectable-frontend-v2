import type { NextPage } from 'next';
import Image from 'next/image';

import CheckBox from '~/components/CheckBox';

const Home: NextPage = () => {
  return (
    <h1 className="font-bold font-montserrat">
      Montserrat
      <CheckBox label="123" id="123" shape="square" />
    </h1>
  );
};

export default Home;
