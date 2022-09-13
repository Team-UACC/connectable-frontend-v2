import Image from 'next/image';

import Badge from '../Design/Badge';
import BodyText from '../Design/BodyText';

import styles from './EventCard.module.css';

interface Props {
  title: string;
  description?: string;
  image: string;
  saleStatus?: '판매중' | '매진' | '판매종료';
  overlap: boolean;
  isFull?: boolean;
}

const EventCard = ({ title, description, image, saleStatus, overlap, isFull }: Props) => {
  if (overlap) {
    const maxWidth = isFull ? 432 : 400;

    return (
      <article className="relative w-full text-start">
        <Image src={image} alt={title} width={maxWidth} height={maxWidth} className={isFull ? '' : 'rounded-xl'} />
        <div
          className={[
            styles.background,
            `absolute w-full max-w-[${maxWidth}px] h-full max-h-[${maxWidth}px] top-0 ${isFull ? '' : 'rounded-xl'}`,
          ].join(' ')}
        />
        <section className="absolute z-10 flex flex-col gap-2 text-white bottom-4 left-4">
          {saleStatus && <Badge name={saleStatus} size="lg" color="white" />}
          <h1 className={isFull ? 'font-gmarket text-2xl font-bold' : 'text-lg font-bold'}>{title}</h1>
          {description && <BodyText className="text-sm">{description}</BodyText>}
        </section>
      </article>
    );
  }

  return (
    <article className="relative w-full max-w-[200px] text-start">
      <Image src={image} alt={title} width={200} height={200} className="rounded" />
      <section className="flex flex-col gap-1 mt-2 text-white">
        {saleStatus && <Badge name={saleStatus} color="white" opacity={saleStatus !== '판매중'} />}
        <h1 className="font-bold ">{title}</h1>
        <BodyText className="text-xs text-gray5">{description}</BodyText>
      </section>
    </article>
  );
};

export default EventCard;
