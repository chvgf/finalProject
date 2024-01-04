import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { AiFillEdit } from "react-icons/ai";
import axios from 'axios';
import { Button, Modal } from 'bootstrap';


const Container = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  .box {
    max-width: 800px;
    background-color: antiquewhite;
    margin: 0 auto;
    padding: 30px;
    h1 {
      font-size: 34px;
      font-weight: bold;
      color: #332b2b;
      margin-bottom: 50px;
      text-align: center;
    }
    .inner {
      display: flex;
      justify-content: center;
      margin: 26px 10px;
      position: relative;
      line-height: 30px;
      input, select {
        width: 50%;
        height: 2rem;
        border-radius: 10px;
        text-align: center;
        margin-left: 70px;
      }
      .name {
        margin-left: 124px;
      }
      .email {
        margin-left: 107px;
      }
      .nick {
        margin-left: 107px;
      }
      button, .button, .inputBtn {
        width: 30%;
        height: 3rem;
        border: none;
        border-radius: 15px;
        background-color: #538ac9;
        color: #fff;
        font-weight: bold;
        margin-top: 20px;
        margin-left: 20px;
      }
      /* button + button {
        margin-left: 20px;
      } */
      button:hover, .inputBtn:hover {
        background-color: #2c619e;
      }
      .editBtn {
        font-size: 20px;
        position: absolute;
        right: 60%;
        cursor: pointer;
      }
    }
  }
`;


function Mypage(props) {
  // const user = useSelector();
  const [ OnInput, setOnInput ] = useState({
    nick: '',
    dogtype: '',
    dogname: '',
    dogage: '',
    editNickname: true,
    editDogtype: true,
    editDogName: true,
    editDogAge: true,
  });
  const { nick, dogtype, dogname, dogage, editNickname, editDogtype, editDogName, editDogAge } = OnInput;

  const [ showModal, setShowModal ] = useState(false);

  const spacies = [ '말티즈', '푸들', '치와와', '포메라니안',
    '시츄', '스파니엘', '닥스훈트', '보더콜리', '리트리버', '비글', 
    '진돗개', '웰시코기', '도베르만', '불독', '사모예드', '시바견',
    '퍼그', '셰퍼드', '달마시안'];

  const handleEditNickname = () => {
    setOnInput(prev => ({ ...prev, editNickname: false }));
  };
  const handleEditDogType = () => {
    setOnInput(prev => ({ ...prev, editDogtype: false }));
  };
  const handleEditDogName = () => {
    setOnInput(prev => ({ ...prev, editDogName: false }));
  };
  const handleEditDogAge = () => {
    setOnInput(prev => ({ ...prev, editDogAge: false }));
  };
  const handleChange = (e) => {
    setOnInput({
      ...OnInput,
      [e.target.name] : e.target.value,
    })
  };
  const handleSave = async () => {
    if ((editNickname && editDogtype && editDogName && editDogAge)) alert('변경사항이 없습니다.');
    
    const result = await axios.post('http://localhost:8888/editPersonalInfo', {nick, dogtype, dogname, dogage}, {withCredentials: true});
    if (result.data.flag) alert('저장되었습니다!');
  };

  const handleChangePw = async () => {

  };
  const handleQuit = async () => {
    setShowModal(true);
    // const result = await axios.get('http://localhost:8888/accountQuit', {withCredentials:true});
    // if (result.data.flag) 
  };

  return (
    <Container>
      <div className='box'>
        <h1>내 정보</h1>
        <div className='inner'>이름<input type='text' className='name' value='qwer' disabled/></div>
        <div className='inner'>이메일<input type='text' className='email' value='qwer' disabled/></div>
        <div className='inner'>닉네임 
          <input type='text' className='nick' name='nick' onChange={handleChange} disabled={editNickname}/>
          <div className='editBtn' id='editNickname' onClick={handleEditNickname}>
            <AiFillEdit />
          </div>
        </div>
        <div className='inner'>강아지 종류 
          <select type='text' className='input' name='dogtype' onChange={handleChange} disabled={editDogtype}>
            {spacies.map((item, index) => <option key={index}>{item}</option>)}
          </select>
          <div className='editBtn' id='editDogtype' onClick={handleEditDogType}>
            <AiFillEdit />
          </div>
        </div>
        <div className='inner'>강아지 이름 
          <input type='text' className='input' name='dogname' onChange={handleChange} disabled={editDogName} />
          <div className='editBtn' id='editDogName' onClick={handleEditDogName}>
            <AiFillEdit />
          </div>
        </div>
        <div className='inner'>강아지 나이 
          <input type='text' className='input' name='dogage' onChange={handleChange} disabled={editDogAge} />
          <div className='editBtn' id='editDogAge' onClick={handleEditDogAge}>
            <AiFillEdit />
          </div>
        </div>
        
        <div className='inner'>
          <input type='button' className='inputBtn' onClick={handleSave} value='변경사항 저장' />
          {/* <button type='button' className='botton' onClick={handleChangePw}>비밀번호 변경</button> */}
          <button type='button' className='button' onClick={handleQuit}>회원 탈퇴</button>
      </div>
      {/* <Modal show={showModal}>
        <Modal.Header closeButton>
          <Modal.Title>알림🛑</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          회원 탈퇴 시 다시 가입할 수 없습니다.<br />
          정말 탈퇴하시겠습니까?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">
            취소
          </Button>
          <Button variant="primary" onClick={undefined}>
            확인
          </Button>
        </Modal.Footer>
      </Modal> */}
    </div>
    </Container>
  );
}

export default Mypage;