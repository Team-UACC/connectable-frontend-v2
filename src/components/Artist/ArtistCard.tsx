import Image from 'next/image';

import { Artist } from '~/types/artistType';

const ArtistCard = ({ artist }: { artist: Artist }) => {
  const { image, name } = artist;

  return (
    <div className="w-[150px]">
      <Image src={image} alt="artist_image" width={150} height={150} className="rounded-full" />
      <div className="font-bold text-center text-gray6">{name}</div>
    </div>
  );
};

export default ArtistCard;
