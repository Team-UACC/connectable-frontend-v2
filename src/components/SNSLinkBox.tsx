import InstagramLogoSVG from '~/assets/svgs/icons/InstagramLogoSVG';
import TwitterLogoSVG from '~/assets/svgs/icons/TwitterLogoSVG';
import WebsiteLogoSVG from '~/assets/svgs/icons/WebstieLogoSVG';

const SNSLinkBox = ({
  twitterUrl,
  instagramUrl,
  websiteUrl,
}: {
  twitterUrl?: string;
  instagramUrl?: string;
  websiteUrl?: string;
}) => {
  return (
    <div className="flex gap-5">
      {twitterUrl && (
        <a href={twitterUrl} target="_blank" rel="noreferrer">
          <TwitterLogoSVG />
        </a>
      )}
      {instagramUrl && (
        <a href={instagramUrl} target="_blank" rel="noreferrer">
          <InstagramLogoSVG />
        </a>
      )}
      {websiteUrl && (
        <a href={websiteUrl} target="_blank" rel="noreferrer">
          <WebsiteLogoSVG />
        </a>
      )}
    </div>
  );
};

export default SNSLinkBox;
