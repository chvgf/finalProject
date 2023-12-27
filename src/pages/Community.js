import React from 'react';
import CommunitySlide from '../components/community/communityHome/CommunitySlide';
import { FaChevronRight } from "react-icons/fa";
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import NewToktok from '../components/community/communityHome/NewToktok';

const CommunityHomeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;

  .communityHomeContent {
    margin-top: 60px;

    h2 {
      font-size: 20px;
      font-weight: bold;

      button {
        cursor: pointer;
        border: none;
        background: none;

      }
    }
  }
`;

function Community(props) {
  const navigate = useNavigate();

  return (
    <>
      <CommunitySlide />
      <CommunityHomeContainer>
        <div className='communityHomeContent'>
          <h2>
            땡땡이의 맞춤 이야기
            <button><FaChevronRight /></button>
          </h2>
        </div>
        <div className='communityHomeContent'>
          <h2>
            육아톡톡 최근 게시글
            <button onClick={() => navigate('/community/Toktok')}><FaChevronRight /></button>
          </h2>
            <NewToktok />
        </div>
        <div className='communityHomeContent'>
          <h2>
            꿀팁 대방출
            <button><FaChevronRight /></button>
          </h2>
        </div>
        <div>
          <img src='./images/app.jpg' alt='app'></img>
        </div>
      </CommunityHomeContainer>


    </>
  );
}

export default Community;