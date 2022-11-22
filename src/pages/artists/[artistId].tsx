import { GetStaticPropsContext } from 'next';
import Image from 'next/image';
import { ReactElement } from 'react';

import { fetchAllArtists, fetchArtistById } from '~/apis/artists';
import ArtistCommentsContainer from '~/components/Artist/ArtistCommentsContainer';
import ArtistEventsListContainer from '~/components/Artist/ArtistEventsListContainer';
import Tab from '~/components/Design/Tab';
import HeadMeta from '~/components/HeadMeta';
import Layout from '~/components/Layout';
import SNSLinkBox from '~/components/SNSLinkBox';
import * as seo from '~/constants/seo';
import { ArtistDetail } from '~/types/artistType';

export async function getStaticPaths() {
  const artistsList = await fetchAllArtists();

  const paths = artistsList.map(a => ({ params: { artistId: String(a.id) } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const { artistId } = params!;

  const artistDetail = await fetchArtistById(Number(artistId));

  return {
    props: { artistDetail },
  };
}

interface Props {
  artistDetail: ArtistDetail;
}

const ArtistDetailPage = ({ artistDetail }: Props) => {
  return (
    <>
      <HeadMeta
        title={`아티스트 | ${artistDetail.name}`}
        image={artistDetail.image}
        description={artistDetail.description}
        url={seo.data.url + `/events/${artistDetail.id}`}
        creator={artistDetail.name}
      />

      <div>
        <section className="relative w-full">
          <div className="absolute top-0 left-0 w-full overflow-hidden">
            <div className="relative blur-lg h-[140px]">
              <Image src={artistDetail.image} alt="artist-bg" layout="responsive" width={100} height={100} />
            </div>
          </div>
          <div className="flex pt-[90px] flex-col p-[18px] gap-[18px]">
            <div>
              <Image src={artistDetail.image} alt="artist-profile" width={100} height={100} className="rounded-full" />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-gray4">아티스트</div>
                <div className="text-2xl font-semibold text-gray1">{artistDetail.name}</div>
              </div>
              <SNSLinkBox
                twitterUrl={artistDetail.twitterUrl}
                instagramUrl={artistDetail.instagramUrl}
                websiteUrl={artistDetail.webpageUrl}
              />
            </div>

            {artistDetail?.notice?.contents && (
              <div className="rounded-[1px] bg-background1 border-gray6 border-[1px] p-4 text-gray1 text-sm">
                {artistDetail.notice.contents}
              </div>
            )}

            <div className="text-gray3">{artistDetail.description} </div>
          </div>
        </section>
        <section>
          <Tab titles={['이벤트', '방명록']}>
            <ArtistEventsListContainer id={artistDetail.id} />
            <ArtistCommentsContainer id={artistDetail.id} />
          </Tab>
        </section>
      </div>
    </>
  );
};

ArtistDetailPage.getLayout = (page: ReactElement) => (
  <Layout headerType="sub-white" headerName="아티스트 상세" selectedFooter={null} bgColor="white">
    {page}
  </Layout>
);

export default ArtistDetailPage;
