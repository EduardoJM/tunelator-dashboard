import { Flex, useBreakpointValue } from '@chakra-ui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useLatestSocialContents } from '@/services/queries';
import { SocialContentCard } from '@/components/Features';
import 'swiper/css';

const SocialContents = () => {
  const { data } = useLatestSocialContents();
  const slidesPerView = useBreakpointValue({ base: 1.2, md: 1.7, lg: 2.5 });

  return (
    <Flex mb="40px">
      <Swiper spaceBetween={20} slidesPerView={slidesPerView}>
        {data?.map(item => (
          <SwiperSlide key={item.id}>
            <SocialContentCard content={item} height={300} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Flex>
  );
};

export default SocialContents;
