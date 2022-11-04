import { ParsedUrlQuery } from 'querystring';

import { GetStaticPropsContext } from 'next';
import { ReactElement } from 'react';

import { fetchAllArtists } from '~/apis/artists';
import Layout from '~/components/Layout';

export async function getStaticPaths() {
  // const artistsList = await fetchAllArtists();
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
  const paths = artistsList.map(a => ({ params: { artistName: a.artistName } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  return {
    props: { params },
  };
}

interface Props {
  params: ParsedUrlQuery;
}

const ArtistDetailPage = ({ params }: Props) => {
  return (
    <section className="absolute text-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 min-w-[320px]">
      <h1 className=" m-auto text-[3rem] font-bold text-gray1">{params.artistName}</h1>
      <div className="leading-8 whitespace-pre-line text-gray2">
        아티스트 상세 페이지는 준비중입니다.
        <br />
        11 / 9 (수) 오픈 예정
      </div>
    </section>
  );
};

ArtistDetailPage.getLayout = (page: ReactElement) => (
  <Layout headerType="sub-white" headerName="아티스트 상세" selectedFooter={null} bgColor="white">
    {page}
  </Layout>
);

export default ArtistDetailPage;
