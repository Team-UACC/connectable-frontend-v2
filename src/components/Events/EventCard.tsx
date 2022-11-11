import Image from 'next/image';

import { IMAGE_BLUR_DATA_URL } from '~/constants/contents';

import Badge from '../Design/Badge';
import BodyText from '../Design/BodyText';

import styles from './EventCard.module.css';

interface Props {
  title: string;
  description?: string;
  image: string;
  saleStatus?: '판매중' | '매진' | '판매종료';
  overlap: boolean;
  titleColor?: 'white' | 'black';
  isFull?: boolean;
}

const EventCard = ({ title, description, image, saleStatus, overlap, isFull, titleColor = 'white' }: Props) => {
  const titleColorClassName = titleColor === 'white' ? 'text-white' : 'text-gray1';
  if (overlap) {
    const maxWidth = isFull ? 432 : 400;

    return (
      <article className="relative w-full text-start">
        <Image
          src={image}
          alt={title}
          width={maxWidth}
          height={maxWidth}
          className={isFull ? '' : 'rounded-xl'}
          placeholder="blur"
          blurDataURL={IMAGE_BLUR_DATA_URL}
        />
        <div
          className={[
            styles.background,
            `absolute w-full max-w-[${maxWidth}px] h-full max-h-[${maxWidth}px] top-0 ${isFull ? '' : 'rounded-xl'}`,
          ].join(' ')}
        />
        <section className={['absolute z-10 flex flex-col w-full gap-2 px-4 bottom-4', titleColorClassName].join(' ')}>
          {saleStatus && <Badge name={saleStatus} size="lg" color={titleColor} />}
          <h1 className={isFull ? 'font-gmarket text-2xl font-bold' : 'text-lg font-bold'}>{title}</h1>
          {description && (
            <BodyText className="w-full overflow-hidden text-sm text-ellipsis whitespace-nowrap">
              {description}
            </BodyText>
          )}
        </section>
      </article>
    );
  }

  return (
    <article className="relative w-full max-w-[200px] text-start">
      <Image
        src={image}
        alt={title}
        width={200}
        height={200}
        className="rounded"
        placeholder="blur"
        blurDataURL={IMAGE_BLUR_DATA_URL}
      />
      <section className={['flex flex-col gap-1 mt-2', titleColorClassName].join(' ')}>
        {saleStatus && <Badge name={saleStatus} color={titleColor} opacity={saleStatus !== '판매중'} />}
        <h1 className="font-bold ">{title}</h1>
        {description && (
          <BodyText className="text-xs text-gray5">
            {description.slice(0, 25) + (description.length > 25 ? '...' : '')}
          </BodyText>
        )}
      </section>
    </article>
  );
};

export default EventCard;
