import Image from 'next/image';
import React, { HTMLAttributes } from 'react';
import { Pagination, Navigation, Autoplay } from 'swiper';
// eslint-disable-next-line import/order
import { Swiper, SwiperSlide } from 'swiper/react';

interface Props extends HTMLAttributes<HTMLDivElement> {}

const MySwiper = (props: Props) => {
  const { className } = props;

  return (
    <div className={['relative w-full max-w-[428px]', className].join(' ')}>
      <Swiper
        slidesPerView={1.4}
        spaceBetween={30}
        centeredSlides={true}
        loopAdditionalSlides={2}
        grabCursor={true}
        slidesOffsetBefore={1}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        speed={800}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation, Autoplay]}
      >
        <SwiperSlide>
          <Image
            src="https://connectable-events.s3.ap-northeast-2.amazonaws.com/lets-rock-festival/image.jpeg"
            alt="poster1"
            width={400}
            height={400}
            className="rounded-xl "
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="https://connectable-events.s3.ap-northeast-2.amazonaws.com/lets-rock-festival/image.jpeg"
            alt="poster1"
            width={400}
            height={400}
            className="rounded-xl "
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="https://connectable-events.s3.ap-northeast-2.amazonaws.com/lets-rock-festival/image.jpeg"
            alt="poster1"
            width={400}
            height={400}
            className="rounded-xl "
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="https://connectable-events.s3.ap-northeast-2.amazonaws.com/lets-rock-festival/image.jpeg"
            alt="poster1"
            width={400}
            height={400}
            className="rounded-xl "
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default MySwiper;
