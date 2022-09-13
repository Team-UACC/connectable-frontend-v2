import Image from 'next/image';
import { ReactNode } from 'react';

interface NFTCollectionInfoSectionProps {
  contractAddress: string;
  openseaUrl: string;
}

const NFTCollectionInfoSection = ({ contractAddress, openseaUrl }: NFTCollectionInfoSectionProps) => {
  return (
    <section className="relative px-4 py-6 border-b-[12px] border-[#F5F5F5]">
      <div>
        <h2 className="text-lg font-bold">NFT 컬렉션 상세</h2>
        <div className="flex flex-col gap-2 mt-4">
          <TextInfo term="Contract Address" content={contractAddress} newTabLink={'https://scope.klaytn.com'} />
          <TextInfo term="Token Standard" content={'KIP-17'} />
          <TextInfo term="BlockChain" content={'Klaytn'} />
          <TextInfo term="OpenSea" content={'오픈씨에서 확인하기'} newTabLink={openseaUrl} />
        </div>
      </div>
    </section>
  );
};

interface TextInfoProps {
  term: string;
  content: ReactNode;
  newTabLink?: string;
}

const TextInfo = ({ term, content, newTabLink }: TextInfoProps) => {
  return (
    <div className="relative flex w-full">
      <h3 className="w-[40%] text-sm font-bold text-gray2">{term}</h3>
      <div className="relative max-w-[50%] w-max text-sm text-brand-pink overflow-hidden text-ellipsis whitespace-nowrap">
        {content}
      </div>
      {newTabLink && (
        <button className="ml-2">
          <Image src={'/icons/icon_open_in_new_18.svg'} alt="open_new" width={18} height={18} />
        </button>
      )}
    </div>
  );
};

export default NFTCollectionInfoSection;
