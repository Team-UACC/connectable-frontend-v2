import Image from 'next/image';

import { Artist } from '~/types/artistType';

const ArtistCard = ({ artist }: { artist: Artist }) => {
  const { artistImage, artistName } = artist;

  return (
    <div className="w-[150px]">
      <Image src={artistImage} alt="artist_image" width={150} height={150} className="rounded-full" />
      <div className="font-bold text-center text-gray6">{artistName}</div>
    </div>
  );
};

export default ArtistCard;
