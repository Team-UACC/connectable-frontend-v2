import Link from 'next/link';
import { useMemo } from 'react';

import { Artist } from '~/types/artistType';

import ArtistCard from './ArtistCard';

const ArtistCardList = ({ artists }: { artists: Array<Artist> }) => {
  const length = useMemo(() => artists.length, [artists]);

  return (
    <div className="flex flex-wrap justify-around mt-[36px] w-full">
      {artists.map(artist => (
        <Link href={`/artists/${artist.id}`} key={artist.name}>
          <a className="hover:pointer-cursor mb-[18px]">
            <ArtistCard artist={artist} />
          </a>
        </Link>
      ))}
      {length % 2 === 1 && <div className=" basis-[150px] " />}
    </div>
  );
};

export default ArtistCardList;
