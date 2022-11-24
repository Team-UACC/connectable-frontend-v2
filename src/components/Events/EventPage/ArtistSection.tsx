import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

import { CHEVRON_RIGHT_ICON } from '~/constants/images';

interface ArtistSectionProps {
  artistId: number;
  artistImage: string;
  artistName: string;
}

const LinkToArtistPage = ({ id, children }: { id: number; children: ReactNode }) => (
  <Link href={`/artists/${id}`}>
    <a>{children}</a>
  </Link>
);

const ArtistSection = ({ artistId, artistImage, artistName }: ArtistSectionProps) => {
  return (
    <section className="relative w-full px-4 py-6 border-b-[12px] border-[#F5F5F5] flex items-center justify-between">
      <div className="flex items-center">
        <LinkToArtistPage id={artistId}>
          <Image src={artistImage} alt={artistName} width={64} height={64} className="rounded-full" />
        </LinkToArtistPage>
        <div className="flex flex-col ml-4">
          <span className="text-sm font-semibold text-gray4">아티스트</span>
          <LinkToArtistPage id={artistId}>
            <span className="text-base font-bold ">{artistName}</span>
          </LinkToArtistPage>
        </div>
      </div>
      <LinkToArtistPage id={artistId}>
        <Image src={CHEVRON_RIGHT_ICON} alt=">" width={32} height={32} />
      </LinkToArtistPage>
    </section>
  );
};

export default ArtistSection;
