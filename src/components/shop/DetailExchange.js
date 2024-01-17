import React from 'react';
import styled from 'styled-components';

const ExchanBox = styled.div`
  margin: 0 auto;
  width: 83%;

  h1 {
    margin: 30px 0;
    font-size: 30px;
    font-weight: bold;
    color: #68a6fe;
    span {
      color: #bbb;
      font-size: 14px;
    }
  }
  div {
    margin: 30px 0 20px 0;
    font-weight: bold;
  }
  p {
    margin: 10px 0;
  }

`;

function DetailExchange(props) {
  return (
    <ExchanBox>
      <h1>반품/교환 안내📢 <span>교환/반품에 관한 일반적인 사항은 판매자가 제시사항보다 관계법령이 우선합니다.</span></h1>

      <div>-반품/교환 사유에 따른 요청 가능 기간</div>
      <p>반품/교환 시 먼저 판매자와 연락하여 합의 후 반품접수를 해주셔야 하며, 반품접수 없이 임의로 보낼 경우 환불이 불가할 수 있으니 유의하시기 바랍니다</p>
      <p>▪ 구매자 단순 변심은 상품 수령 후 7일 이내(구매자 반품배송비 부담)</p>
      <p>▪ 표시/광고와 상이, 상품하자의 경우 상품 수령 후 3개월 이내 혹은 표시/광고와 다른 사실을 안 날로부터 30일 이내(둘 중 하나 경과 시 반품/교환 불가)</p>

      <div>-반품/교환 제한사항</div>
      <p>▪ 주문/제작 상품의 경우, 상품의 제작이 이미 진행된 경우</p>
      <p>▪ 상품 포장을 개봉하여 사용 또는 설치 완료되어 상품의 가치가 훼손된 경우(단, 내용 확인을 위한 포장 개봉의 경우는 예외)</p>
      <p>▪ 고객의 사용, 시간경과, 일부 소비에 의하여 상품의 가치가 현저히 감소한 경우</p>
      <p>▪ 세트상품 일부 사용, 구성품을 분실하였거나 취급 부주의로 인한 파손/고장/오염으로 재판매 불가한 경우</p>
      <p>▪ 모니터 해상도의 차이로 인해 색상인 이미지가 실제와 달라, 고객이 단순 변심으로 교환/반품을 무료 요청하는 경우</p>
      <p>▪ 제조사의 사정 (신모델 출시 등) 및 부품 가격 변동 등에 의해 무료 교환/반품으로 요청하는 경우</p>
    </ExchanBox>
  );
}

export default DetailExchange;