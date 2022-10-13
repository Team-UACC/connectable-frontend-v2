import DotText from '~/components/Text/DotText';
import Paragraph from '~/components/Text/Paragraph';

export const AdditionalGuidance = () => {
  return (
    <>
      <Paragraph title="웰컴티켓 안내">
        <ul>
          <DotText>Connectable에 가입하신 분들을 위한 NFT 입니다.</DotText>
          <DotText>NFT 티켓 구매 절차를 체험할 수 있습니다.</DotText>
          <DotText>해당 NFT는 거래가 불가능하며 1인 1매만 구매 가능합니다.</DotText>
        </ul>
      </Paragraph>
      <Paragraph title="구매절차 안내">
        <ul>
          <DotText>Klip을 통해 Connectable에 로그인합니다.</DotText>
          <DotText>하단바의 {"'구매하기'"} 버튼을 클릭해 구매 폼을 제출합니다.</DotText>
          <DotText>티켓 구매 폼을 제출하시면 확인 후 NFT가 전송됩니다.</DotText>
          <DotText>구매한 티켓은 마이페이지에서 확인할 수 있습니다.</DotText>
        </ul>
      </Paragraph>
    </>
  );
};
