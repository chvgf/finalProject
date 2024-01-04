import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
// import io from "socket.io-client";

const ChattingContainer = styled.div`
  max-width: 1200px;
  height: 800px;
  margin: 70px auto;
  border: 1px solid #ccc;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  .inner {
    display: flex;
    height: 800px;

    .userinfo-box {
      flex-basis: 150px;
      border-right: 1px solid #ccc;
      overflow: auto;

      div {
        padding: 10px 0;
        display: flex;
        justify-content: center;
      }

      span {
        margin-left: 6px;
        font-weight: bold;
      };
    }

    .chattinglist-box {
      padding: 10px 0;
      flex-basis: 350px;
      border-right: 1px solid #ccc;
      overflow: auto;

      span {
        font-weight: bold;
      }

      .chattinglist-inner-box {
        display: flex;
        padding: 6px 10px;
        border-top: 1px solid #ccc;
      }

      .chattinglist-userinfo-box {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding: 0 6px;

        .sort {
          display: flex;
          justify-content: space-between;
        }
      }
    }
    
    .chatting-box {
      flex-basis: 700px;
      padding: 0 10px;
      display: flex;
      flex-direction: column;

      .sellerinfo-box {
        height: 100px;
      }

      .chatting-detail-box {
        height: 560px;
        overflow: auto;
        /* display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-end; */

        &::-webkit-scrollbar {
          display: none;
        }

        .message-box {
          max-width: 50%;
          margin-top: 10px;
          min-height: 36px;
          padding: 10px;
          background-color: #68a6fe;
          border-radius: 10px;
          clear: both;
          float: right;
        }

        .day {
          text-align: center;
        }
      }

      .chatting-input-box {
        margin: 10px 0;
        border: 1px solid #ccc;
        border-radius: 10px;
        padding: 10px;
        height: 140px;

        textarea {
          border: none;
          width: 100%;
          height: 90%;
          resize: none;

          &:focus {
            outline: none;
          }
        }
      }


    }
  }
`;

function Chatting(props) {
  const scrollRef = useRef();
  const [ chats, setChats ] = useState([]);
  const [ value, setValue ] = useState('');
  const [ room, setRoom ] = useState('');
  
  // const socket = io.connect("http://localhost:8000");

  const valueOnChange = (e) => {
    setValue(e.target.value);
  };
  
  const handleSubmitMessage = () => {
    setChats(prevChat => [...prevChat, value]);
    // socket.emit('send_message', { message: value });
    setValue('');
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  // useEffect(() => {
  //   socket.on("receive_message", data => {
  //     setChats(prevChat => [...prevChat, data.message]);
  //   });
  // }, [socket]);

  // io.on("connection", socket => {
  //   console.log(`User Connected: ${socket.id}`);
  //   socket.on("join_room", data => {
  //     socket.join(data);
  //   });
  //   socket.on("send_message", data => {
  //     console.log(data);
  //     socket.to(data.room).emit("receive_message", data);
  //   });
  // });
  
  // 전송 버튼에 넣고 조회 시 작성 자 정보의 아이디와 내 아이디를 합쳐서 뭔가를 만들면 될듯
  // const JoinRoom = (e) => {
  //   if (room !== "") {
  //     socket.emit("join_room", room);
  //   }
  // };

  const scrollToBottom = () => {
    if ((scrollRef.current)) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  let today = new Date();
  today = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;

  
  return (
    <ChattingContainer>
      <div className='inner'>
        <div className='userinfo-box'>
          <div>
            <img src='https://i.namu.wiki/i/Bge3xnYd4kRe_IKbm2uqxlhQJij2SngwNssjpjaOyOqoRhQlNwLrR2ZiK-JWJ2b99RGcSxDaZ2UCI7fiv4IDDQ.webp' />   
            <p><span>만식이</span></p>
          </div>
          <div>
            <img src='https://i.namu.wiki/i/Bge3xnYd4kRe_IKbm2uqxlhQJij2SngwNssjpjaOyOqoRhQlNwLrR2ZiK-JWJ2b99RGcSxDaZ2UCI7fiv4IDDQ.webp' />   
            <p><span>만식이</span></p>
          </div>
        </div>
        <div className='chattinglist-box'>
          <div className='chattinglist-inner-box'>
            <img src='https://i.namu.wiki/i/Bge3xnYd4kRe_IKbm2uqxlhQJij2SngwNssjpjaOyOqoRhQlNwLrR2ZiK-JWJ2b99RGcSxDaZ2UCI7fiv4IDDQ.webp' />
            <div className='chattinglist-userinfo-box'>
              <div className='sort'>
                <p><span>중식이</span></p>
                <p>어제</p>   
              </div>
              <p>대화내용</p>
            </div>
          </div>
        </div>
        <div className='chatting-box' >
          <div className='sellerinfo-box'>
            <p><span>중식이</span></p>
          </div>
          <div ref={scrollRef} className='chatting-detail-box'>
              {chats.map((item,index) =>
                ( 
                <React.Fragment key={index}>
                  {index === 0 && <p className='day'>{today}</p>}
                  <p className='message-box'>
                    {item}
                  </p>
                </React.Fragment>
              ))}
          </div>
          <div className='chatting-input-box' >
            <textarea
              value={value} 
              onChange={valueOnChange} 
              onKeyUp={(e) => { if (e.key === 'Enter') {handleSubmitMessage()} }}
              placeholder='메시지를 입력해주세요'
            />
            <button onClick={handleSubmitMessage}>전송</button>
          </div>
        </div>
      </div>
    </ChattingContainer>
  );
}

export default Chatting;