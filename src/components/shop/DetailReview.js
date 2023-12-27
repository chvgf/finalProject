import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MdDelete } from "react-icons/md";
import { dateFormat } from '../../util';

const ReviewContainer = styled.div`
  margin: 0 auto;
  width: 83%;

  .review-wrap h3 {
    font-size: 30px;
    font-weight: bold;
    color: #68a6fe;
    margin-top: 20px;
  }
  p.title-sub {
    margin: 10px 0px;
  }
  .wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;
  }
  .review-wrap {
    width: 50%;
    display: flex;
    flex-direction: column;
  }
  .review-wrap p {
    margin-top: 10px;
  }
  
  button.review-btn  {
    height: 50px;
    font-size: 18px;
    font-weight: bold;
    color: #fff;
    background-color: #68a6fe;
    border: none;
    border-radius: 10px;
  }
  .review-wrap button:active {
    background-color: #4290fc;
  }
  hr {
  }
  .list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    background-color: #ececec;
    padding: 5px 10px;
    border-radius: 10px;
  }
  .list div:nth-child(1) {
    margin-bottom: 5px;
  }
  .list .delete-btn {
    border: none;
    background-color: #b4bdff;
    color: #fff;
    border-radius: 10px;
    font-size: 18px;
    padding: 0px 10px;
    text-align: center;
  }
  .list .userId {
    font-size: 20px;
    font-weight: bold;
    color: #666;
    margin-bottom: 5px;
  }
  .list span.date {
    font-size: 16px;
    font-weight: 400;
    margin-left: 20px;

  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
    textarea {
      width: 100%;
      height: 55%;
      margin: 20px 0px 10px;
      outline: none;
      resize: none;
      font-size: 18px;
      border-radius: 10px;

    }
    button {
    width: 48%;
    margin: 20px 0;
    font-size: 20px;
    font-weight: bold;
    color: #fff;
    background-color: #68a6fe;
    border: none;
    padding: 10px 0px;
    border-radius: 10px;
    }
    button:active {
      background-color: #4290fc;
    }
    .modal-wrap {
      position: absolute;
      width: 50%;
      margin: 0 auto;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%); 

    }
    .modal-wrap form {
      width: 600px;
      height: 700px;
      padding: 40px;
      margin: 0 auto;
      background-color: #ececec;
      border-radius: 15px;
      box-sizing: border-box;
    }
    .modal-wrap div {
      margin-bottom: 10px;
      display: flex;
    }
    .modal-wrap input {
      width: 70%;
    }
    .modal-wrap form h3 {
      font-size: 25px;
      font-weight: bold;
      margin-bottom: 20px;
      text-align: center;
    }
    .modal-wrap p {
      /* text-align: center; */
      margin-bottom: 10px;
    }
    .modal-wrap p {
      /* text-align: center; */
      font-weight: bold;
      color: #555;
      font-size: 18px;
    }
    .modal-wrap .filebox {
      display: flex;
      justify-content: space-between;
    }
    .modal-wrap .filebox .upload-name {
      outline: none;
      border: 1px solid #777;
      padding: 5px;
      width: 75%;
      border-radius: 10px;
    }
    .modal-wrap input[type="file"] {
      display: none;
    }
    .modal-wrap .btn-img {
      background-color: #68a6fe;
      color: #fff;
      background-color: #68a6fe;
      padding: 7px 5px;
      width: 23%;
      border-radius: 10px;
      text-align: center;
      font-weight: bold;
    }
    .modal-wrap .btn-wrap {
      display: flex;
      justify-content: space-between;
    }
    .modal-wrap .btn-wrap button.close {
      border: 1px solid #68a6fe;
      background-color: #fff;
      color: #333;
    }
`;

const review1 = [
  {
    id: 'haeun',
    date: new Date(),
    content: '강아지가 잘 먹어요 ㅎㅎ'
  },
  {
    id: 'haeun2',
    date: new Date(),
    content: '맛있네요 '
  },
  {
    id: 'haeun3',
    date: new Date(),
    content: '비숑 사료 굿!'
  },
];

function DetailReview(props) {
  const [review, setReview] = useState('');
  const [reviewList, setReviewList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);


  useEffect(() => {
    const list = async () => {
      try {
        const result = await axios.get('라우터 주소', );
        setReviewList(result.data);
      } catch (err) {
        console.error(err);
      }
    }
  }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!review) {
        alert('내용을 입력해주세요!');
      }
      const formData = new FormData();
      const fileList = e.target.image.files[0];
      for (const file of fileList) {
        formData.append('image', file);
      }
      await axios.post('라우터 주소', { review, formData });
      const result = await axios.get('라우터 주소', );
      setReviewList(result.data);
    } catch (err) {
      console.error(err);
    }
    setReview('');
    setModalOpen(false);
  };

  const openModal = () => {
    // if (!review1.id) {
    //   alert('로그인이 필요합니다!')
    // }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // const handleChange = () => {
  //   const imgText = document.getElementById('file_upload');
  //   imgText.addEventListener('change', async (e) => {
  //   let fileName = imgText.files[0].name;
  //   let label = document.getElementById('file_upload');
  //   label.textContent = fileName;
  //   });
  // };
  
  return (
    <>
      <ReviewContainer>
        <div className='wrap'>
          <div className='review-wrap'>
            <h3 className='review-title'>상품 리뷰📦</h3>
            <p className='title-sub'>다양한 리뷰를 확인해보세요!</p>       
          </div>
          <button type='button' className='cursor-pointer review-btn' onClick={openModal} >리뷰 작성</button>
        </div>
        
        <hr />
        
        { review1.length > 0 && (
          review1 && review1.map((item, index) => {
            return (
              <div className='list' key={index}>
                <div>
                  <p className='userId'>{item.id}<span className='date'>{dateFormat(item.date)}</span></p>
                  <p>{item.content}</p>
                </div>
                <div>
                  <button className='delete-btn cursor-pointer'><MdDelete /></button>
                </div>
              </div>
            )
          })
        )}
      </ReviewContainer>
      {modalOpen && 
        <Modal review={review} setReview={setReview}>
          <div className='modal-wrap'>
            <form>
              <h3>리뷰 작성📝</h3>
              <div>
                <label name='brand'>브랜드명:</label>
                <input type='text' name='brand' disabled />
                {/* {result.data.브랜드명} */}
              </div>
              <div>
                <label>상품명:</label>
                <input type='text' name='brand' disabled />
                {/* 퍼펙션 패드 소형 베이비파우더향 30매 */}
                {/* {result.data.상품명} */}
              </div>
              
              <textarea 
                spellcheck="false" 
                placeholder='리뷰를 작성해주세요 :)'
                value={review}
                onChange={(e) => {setReview(e.target.value)}}
              />
              <div className='filebox'>
                <input name='image' class="upload-name" value="첨부파일" id='img-text' spellcheck="false"></input>
                <label type='file' htmlFor="file_upload" className='cursor-pointer btn-img' >이미지 업로드</label>
                <input type='file' name="image" id='file_upload' multiple/>
              </div>
              
              <div className='btn-wrap'>
                <button type='submit' className='cursor-pointer' onClick={handleSubmit} >리뷰 등록</button>
                <button type='button' className='close cursor-pointer' onClick={closeModal} >취소</button>
              </div>
            </form>
          </div> 
        </Modal>
      }
    </>
    

  );
}

export default DetailReview;