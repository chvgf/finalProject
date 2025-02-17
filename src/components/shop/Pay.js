import React from "react";
import { Bootpay } from "@bootpay/client-js";

export const pay = async (product, productCount, totalprice, productNum) => {
  const { title, price } = product;

  try {
    const response = await Bootpay.requestPayment({
      application_id: "658bd091d25985001e0cf94b",
      price: Number(totalprice),
      order_name: !productNum ? `${title} ${productCount}개` : `${title} ${productCount}개 외 ${productNum}`,
      order_id: "TEST_ORDER_ID",
      pg: "케이씨피",
      method: ["가상계좌", "카드", "휴대폰", "카카오페이", "계좌이체", "네이버페이"],
      tax_free: 0,
      user: {
        id: "회원아이디",
        username: "회원이름",
        phone: "01000000000",
        email: "test@test.com",
      },
      items: [
        {
          id: "item_id",
          name: "테스트아이템",
          qty: 1,
          price: Number(totalprice),
        },
      ],
      extra: {
        open_type: "iframe",
        card_quota: "0,2,3",
        escrow: false,
      },
    });
    switch (response.event) {
      case "issued":
        // 가상계좌 입금 완료 처리
        return response;
      case "done":
        console.log(response);
        return response;
      case "confirm": //payload.extra.separately_confirmed = true; 일 경우 승인 전 해당 이벤트가 호출됨
        console.log(response.receipt_id);
        /**
         * 1. 클라이언트 승인을 하고자 할때
         * // validationQuantityFromServer(); //예시) 재고확인과 같은 내부 로직을 처리하기 한다.
         */
        const confirmedData = await Bootpay.confirm(); //결제를 승인한다
        if (confirmedData.event === "done") {
          //결제 성공
        }

        /**
         * 2. 서버 승인을 하고자 할때
         * // requestServerConfirm(); //예시) 서버 승인을 할 수 있도록  API를 호출한다. 서버에서는 재고확인과 로직 검증 후 서버승인을 요청한다.
         * Bootpay.destroy(); //결제창을 닫는다.
         */
        break;
    }
  } catch (e) {
    // 결제 진행중 오류 발생
    // e.error_code - 부트페이 오류 코드
    // e.pg_error_code - PG 오류 코드
    // e.message - 오류 내용
    console.log(e.message);
    switch (e.event) {
      case "cancel":
        // 사용자가 결제창을 닫을때 호출
        console.log(e.message);
        return e;
      case "error":
        // 결제 승인 중 오류 발생시 호출
        console.log(e.error_code);
        return e;
    }
  }
};
