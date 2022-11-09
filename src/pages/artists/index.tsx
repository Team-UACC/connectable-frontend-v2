import { ReactElement } from 'react';

import { fetchAllArtists } from '~/apis/artists';
import ArtistCardList from '~/components/Artist/ArtistCardsList';
import Label from '~/components/Design/Label';
import Layout from '~/components/Layout';
import { Artist } from '~/types/artistType';

export async function getStaticProps() {
  const artistsList = await fetchAllArtists();

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
      <ArtistCardList artists={artistsList} />
    </div>
  );
};

ArtistPage.getLayout = (page: ReactElement) => (
  <Layout headerType="home" selectedFooter="artists" bgColor="black">
    {page}
  </Layout>
);
export default ArtistPage;
