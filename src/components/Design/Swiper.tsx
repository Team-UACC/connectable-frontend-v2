import React, { Children, HTMLAttributes, useMemo } from 'react';
import { Pagination, Navigation, Autoplay } from 'swiper';
// eslint-disable-next-line import/order
import { Swiper, SwiperSlide } from 'swiper/react';

interface Props extends HTMLAttributes<HTMLDivElement> {}

const MySwiper = (props: Props) => {
  const { className, children } = props;
  const length = useMemo(() => Children.toArray(children).length, [children]);

  if (length === 0) {
    return null;
  }

  return (
    <div className={['relative w-full max-w-[428px]', className].join(' ')}>
      <Swiper
        slidesPerView={1.4}
        spaceBetween={30}
        centeredSlides={true}
        loopAdditionalSlides={2}
        grabCursor={true}
        slidesOffsetBefore={1}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        speed={1000}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation, Autoplay]}
      >
        {Children.toArray(children).map((child, idx) => (
          <SwiperSlide key={idx}>{child}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MySwiper;
