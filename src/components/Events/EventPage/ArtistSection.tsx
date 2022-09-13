import Image from 'next/image';
import Link from 'next/link';

interface ArtistSectionProps {
  artistImage: string;
  artistName: string;
}

const ArtistSection = ({ artistImage, artistName }: ArtistSectionProps) => {
  return (
    <section className="relative w-full px-4 py-6 border-b-[12px] border-[#F5F5F5] flex items-center justify-between">
      <div className="flex items-center">
        <Image src={artistImage} alt={artistName} width={64} height={64} className="rounded-full" />
        <div className="flex flex-col ml-4">
          <span className="text-sm font-semibold text-gray4">아티스트</span>
          <span className="text-base font-bold ">{artistName}</span>
        </div>
      </div>
      <Link href={`/artists/${artistName}`}>
        <a>
          <Image src={'/icons/icon_chevron_right_32.svg'} alt=">" width={32} height={32} />
        </a>
      </Link>
    </section>
  );
};

export default ArtistSection;
