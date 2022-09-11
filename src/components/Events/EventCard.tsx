import Image from 'next/image';

import Badge from '../Design/Badge';
import BodyText from '../Design/BodyText';

import styles from './EventCard.module.css';

interface Props {
  title: string;
  description?: string;
  image: string;
  saleStatus: '판매중' | '매진' | '판매종료';
  overlap: boolean;
}

const EventCard = ({ title, description, image, saleStatus, overlap }: Props) => {
  if (overlap) {
    return (
      <article className="relative w-full max-w-[400px] text-start">
        <Image src={image} alt={title} width={400} height={400} className="rounded-xl" />
        <div
          className={[styles.background, 'absolute w-full max-w-[400px] h-full max-h-[400px] top-0 rounded-xl'].join(
            ' '
          )}
        />
        <section className="absolute z-10 flex flex-col gap-2 text-white bottom-4 left-4">
          <Badge name={saleStatus} size="lg" color="white" />
          <h1 className="text-lg font-bold">{title}</h1>
          {description && <BodyText className="text-sm">{description}</BodyText>}
        </section>
      </article>
    );
  }

  return (
    <article className="relative w-full max-w-[200px] text-start">
      <Image src={image} alt={title} width={200} height={200} className="rounded" />
      <section className="flex flex-col gap-1 mt-2 text-white">
        <Badge name={saleStatus} color="white" opacity={saleStatus !== '판매중'} />
        <h1 className="font-bold ">{title}</h1>
        <BodyText className="text-xs text-gray5">{description}</BodyText>
      </section>
    </article>
  );
};

export default EventCard;
