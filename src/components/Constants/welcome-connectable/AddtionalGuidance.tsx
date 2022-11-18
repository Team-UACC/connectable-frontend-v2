import DotText from '~/components/Text/DotText';
import Paragraph from '~/components/Text/Paragraph';

export const AdditionalGuidance = () => {
  return (
    <>
      <Paragraph title="웰컴티켓 안내">
        <ul>
          <DotText>Connectable에 가입하신 분들을 위한 NFT 입니다.</DotText>
          <DotText>NFT 티켓 구매 절차를 체험할 수 있습니다.</DotText>
          <DotText>1회 최대 4매까지 구매할 수 있습니다..</DotText>
        </ul>
      </Paragraph>
      <Paragraph title="구매절차 안내">
        <ul>
          <DotText>Klip을 통해 Connectable에 로그인합니다.</DotText>
          <DotText>하단의 {"'바로 구매하기'"} 버튼을 클릭해 구매 폼을 제출합니다.</DotText>
          <DotText>하단의 {"'티켓 목록 확인하기'"} NFT Token Id 별로 티켓을 선택할 수 있습니다.</DotText>
          <DotText>티켓 구매 폼을 제출하시면 확인 후 NFT가 전송됩니다.</DotText>
          <DotText>구매한 티켓과 결제 검토 과정은 마이페이지에서 확인할 수 있습니다.</DotText>
        </ul>
      </Paragraph>
    </>
  );
};
