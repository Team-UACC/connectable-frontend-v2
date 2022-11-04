import { ReactElement } from 'react';

import { fetchAllArtists } from '~/apis/artists';
import ArtistCardList from '~/components/Artist/ArtistCardList';
import Label from '~/components/Design/Label';
import Layout from '~/components/Layout';
import { Artist } from '~/types/artistType';

export async function getStaticProps() {
  // const artistsList = await fetchAllArtists();
  // 임시 데이터

  const artistsList = [
    {
      artistName: 'Connectable',
      artistImage: 'https://connectable-events.s3.ap-northeast-2.amazonaws.com/welcome-ticket/welcome-ticket.png',
    },
    {
      artistName: '렛츠락 페스티벌',
      artistImage: 'https://connectable-events.s3.ap-northeast-2.amazonaws.com/lets-rock-festival/image.jpeg',
    },
  ];

  return {
    props: { artistsList },
  };
}

interface Props {
  artistsList: Array<Artist>;
}

const ArtistPage = ({ artistsList }: Props) => {
  return (
    <div className="px-[18px] py-[40px] flex flex-col items-center">
      <Label title="ARTISTS" color="blue" />
      <div className="mt-4 text-sm leading-6 text-center text-gray4">
        오직 커넥터블에서만!
        <br />
        당신의 아티스트를 만나보세요
      </div>
      <ArtistCardList artistsList={artistsList} />
    </div>
  );
};

ArtistPage.getLayout = (page: ReactElement) => (
  <Layout headerType="home" selectedFooter="artists" bgColor="black">
    {page}
  </Layout>
);
export default ArtistPage;
