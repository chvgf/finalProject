import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import cart from "../../image/cart.png";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { getLoginUser } from '../../features/userInfoSlice';
import dog from "../../image/dog.png";
import { Table } from 'react-bootstrap';

const PurchaseWrap = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  
  
  h2 {
    padding: 10px 0;
    font-size: 30px;
    font-weight: bold;
    margin: 25px 0px;
  }
  .img {
    width: 150px;
    height: 150px;
  }
  tbody td {
    vertical-align: middle;
    /* background-color: #ececec; */
  }

  .total .total-price {
    font-weight: bold;
  }

  .empty-list {
    text-align: center;
    padding: 100px 0px;
  }
  .empty-list img {
    width: 200px;
    height: 200px;
    color: #68a6fe;
    /* border-radius: 10px; */
  }
  .shop-btn {
    background-color: #68a6fe;
    width: 150px;
    padding: 10px;
    border-radius: 31px;
    font-weight: bold;
    color: #fff;
    margin: 20px auto;
    transition: 0.3s;
    border: none;
    display: flex;
    justify-content: center;

  }
   .shop-btn:hover {
    background-color: #3e8bf7;
  }

  
`;

function Purchase(props) {
  const navigate = useNavigate();
  const [purchaseList, setPurchaseList] = useState([]);
  const loginUser = useSelector(getLoginUser);
  const formatter = new Intl.NumberFormat('ko-KR');


  useEffect(() => {
    const purchaseList = async () => {
      // { params: { userId: loginUser._id }}
      // console.log(loginUser._id);
      const result = await axios.get(`http://localhost:8888/shop/purchase/${loginUser._id}` );
      // console.log(result.data.list[0].list);
      if (result.data.list[0]?.list) {
        setPurchaseList(result.data.list[0].list);
      }
    }
    purchaseList();
  }, []);

  console.log(purchaseList);
  return (
    <PurchaseWrap>
      {
        loginUser._id && 
        <>
          <h2>주문 내역</h2>
          <Table className='table' hover>
            <thead>
              <tr>
                <th></th>
                <th>주문 상품</th>
                <th>수량</th>
                <th>총 금액</th>
              </tr>
            </thead>
            <tbody>
              { purchaseList.length > 0 ?
                purchaseList.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td><img src={dog} className='img' /></td>
                      <td>{item.title}</td>
                      <td>{item.count}</td>
                      <td>{formatter.format(item.price * item.count)}원</td>
                    </tr>
                  )})
                :
                <>
                  <tr className='empty-list'>
                    <td></td>
                    <td></td>
                    <td className=''>구매내역이 없습니다.</td>
                    <td></td>
                  </tr>
                  <button className='shop-btn cursor-pointer' onClick={() => {navigate('/shop')}}>쇼핑으로 이동</button>
                </>
              }
            </tbody>
          </Table>
        </>
        
      }
      
        
    </PurchaseWrap>
  );
}

export default Purchase;