import { useMemo } from 'react';

interface Props {
  id: any;
  cutout?: 'right' | 'left';
  borderColor?: 'none' | 'pink';
  shadowColor?: 'black' | 'pink';
}

const TicketCardBackground = ({ id, cutout = 'left', borderColor = 'none', shadowColor = 'black' }: Props) => {
  const cutoutDrawnAttribute = useMemo(
    () =>
      cutout === 'left'
        ? 'M22 16C18.6863 16 16 18.6863 16 22V80C21.9585 80.0001 26.7887 84.0295 26.7887 89C26.7887 93.9705 21.9585 97.9999 16 98V156C16 159.314 18.6863 162 22 162H402C405.314 162 408 159.314 408 156V22C408 18.6863 405.314 16 402 16H22Z'
        : 'M402 16.0001C405.314 16.0001 408 18.6864 408 22.0001V80.0001C402.042 80.0002 397.211 84.0296 397.211 89.0001C397.211 93.9706 402.042 97.9999 408 98.0001V156C408 159.314 405.314 162 402 162L22 162C18.6863 162 16 159.314 16 156V22.0001C16 18.6864 18.6863 16.0001 22 16.0001L402 16.0001Z',
    [cutout]
  );

  return (
    <svg className="w-full max-w-[464px] " viewBox="0 0 426 182" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter={`url(#filter0_d_${id})`}>
        <mask id={`path-1-inside-1_${id}`} fill="white">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M22 16C18.6863 16 16 18.6863 16 22V80C21.9585 80.0001 26.7887 84.0295 26.7887 89C26.7887 93.9705 21.9585 97.9999 16 98V156C16 159.314 18.6863 162 22 162H402C405.314 162 408 159.314 408 156V22C408 18.6863 405.314 16 402 16H22Z"
          />
        </mask>
        <path fillRule="evenodd" clipRule="evenodd" d={cutoutDrawnAttribute} fill="white" />
        {borderColor === 'pink' && (
          <path
            d="M16 80H15V81L16 81L16 80ZM16 98L16 97L15 97V98H16ZM17 22C17 19.2386 19.2386 17 22 17V15C18.134 15 15 18.134 15 22H17ZM17 80V22H15V80H17ZM16 81C21.5836 81.0001 25.7887 84.7439 25.7887 89H27.7887C27.7887 83.3151 22.3333 79.0001 16 79L16 81ZM25.7887 89C25.7887 93.2561 21.5836 96.9999 16 97L16 99C22.3333 98.9999 27.7887 94.6849 27.7887 89H25.7887ZM17 156V98H15V156H17ZM22 161C19.2386 161 17 158.761 17 156H15C15 159.866 18.134 163 22 163V161ZM402 161H22V163H402V161ZM407 156C407 158.761 404.761 161 402 161V163C405.866 163 409 159.866 409 156H407ZM407 22V156H409V22H407ZM402 17C404.761 17 407 19.2386 407 22H409C409 18.134 405.866 15 402 15V17ZM22 17H402V15H22V17Z"
            fill="#FFBAE0"
            mask={`url(#path-1-inside-1_${id})`}
          />
        )}
      </g>
      <defs>
        <filter
          id={`filter0_d_${id}`}
          x="0"
          y="0"
          width="428"
          height="182"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="2" dy="2" />
          <feGaussianBlur stdDeviation="9" />
          <feComposite in2="hardAlpha" operator="out" />
          {shadowColor === 'black' ? (
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0" />
          ) : (
            <feColorMatrix type="matrix" values="0 0 0 0 0.996078 0 0 0 0 0.321569 0 0 0 0 0.690196 0 0 0 0.12 0" />
          )}
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_168_2506" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_168_2506" result="shape" />
        </filter>
      </defs>
    </svg>
  );
};

export default TicketCardBackground;
