interface Props {
  size?: number;
}

const WebsiteLogoSVG = ({ size = 24 }: Props) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_103_199)">
        <path
          d="M23 12C23 14.9174 21.8411 17.7153 19.7782 19.7782C17.7153 21.8411 14.9174 23 12 23M23 12C23 9.08262 21.8411 6.28473 19.7782 4.22183C17.7153 2.15893 14.9174 1 12 1M23 12H1M12 23C9.08262 23 6.28473 21.8411 4.22183 19.7782C2.15893 17.7153 1 14.9174 1 12M12 23C14.0252 23 15.6667 18.0744 15.6667 12C15.6667 5.92556 14.0252 1 12 1M12 23C9.97478 23 8.33333 18.0744 8.33333 12C8.33333 5.92556 9.97478 1 12 1M1 12C1 9.08262 2.15893 6.28473 4.22183 4.22183C6.28473 2.15893 9.08262 1 12 1"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_103_199">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default WebsiteLogoSVG;
