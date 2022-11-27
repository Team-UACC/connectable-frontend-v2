import { data } from '~/constants/seo';

import HeadMeta from '../HeadMeta';

const HomeHeadMeta = () => (
  <HeadMeta
    title={data.title}
    image={data.images.logo}
    description={data.description}
    url={data.url}
    creator={data.creator}
  />
);

export default HomeHeadMeta;
