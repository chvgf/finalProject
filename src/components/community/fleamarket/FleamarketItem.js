import React from 'react';
import styled from 'styled-components';
import Col from 'react-bootstrap/Col';
import testImage from '../../../images/app.jpg'
import { useNavigate } from 'react-router';

const StyledCol = styled(Col)`
  cursor: pointer;
  border: 1px solid black;
`; 

const ItemImage = styled.img`
  width: 100%;
`;

function FleamarketItem(props) {
  const { item: { id, title, price, place } } = props;

  const navigate = useNavigate();

  return (
    <StyledCol md={2} onClick={() => navigate(`/community/fleamarket/${id}`)}>
      <ItemImage src={testImage} />
      <h2>수정</h2>
      <h2>삭제</h2>
      <h2>{title}</h2>
      <h3>{price}</h3>
      <h4>{place}</h4>
    </StyledCol>
  );
}

export default FleamarketItem;