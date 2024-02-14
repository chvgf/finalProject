import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ToktokDetailCommentItem from "./ToktokDetailCommentItem";
import styled from "styled-components";
import axios from "axios";
import { useSelector } from "react-redux";
import { getLoginUser } from "../../../features/userInfoSlice";

const ToktokDetailWrapper = styled.div`
  margin: 30px 100px;
  padding: 20px 40px;
  border: 1px solid #8c8c8c;
  button {
    border: 1px solid #8c8c8c;
  }
  .titleContent {
    h4 {
      text-align: center;
      padding: 30px 0;
      font-size: 30px;
      border-bottom: 1px solid #000;
    }
    h5 {
      padding: 20px 0;
      text-align: end;
      color: #8c8c8c;
      padding-bottom: 5px;
    }
    p {
      padding: 30px 0;
    }
    img {
      width: 500px;
      height: 300px;
    }
  }
  .addCommentBtn {
    margin-left: 10px;
  }
`;

function ToktokDetail(props) {
  const { _id } = useParams();
  const navigate = useNavigate();

  const [commentValue, setCommentValue] = useState();
  const [getDetailList, setGetDetailList] = useState();
  const [getDetailCommentList, setGetDetailCommentList] = useState();

  const 로그인중 = useSelector(getLoginUser); // 현재 로그인중 유저 정보

  useEffect(() => {
    const commentListGet = async () => {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/community/toktok/detail/${_id}`, { withCredentials: true });
      setGetDetailCommentList(response.data.commentData);
      setGetDetailList(response.data.postData);
    };
    commentListGet();
  }, []);

  const changeComment = (e) => {
    setCommentValue(e.target.value);
  };
  const handleComment = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_SERVER_DOMAIN}/community/toktok/comment/${_id}`,
        { comment: commentValue, postId: _id, user: 로그인중 },
        { withCredentials: true }
      );
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };
  const handleDel = async () => {
    try {
      const del = window.confirm("정말 삭제하시겠습니까?");
      if (del === false) return;
      window.alert("삭제되었습니다.");
      await axios.delete(`${process.env.REACT_APP_SERVER_DOMAIN}/community/toktok/delete/${_id}`, { withCredentials: true });
      navigate("/community/Toktok");
    } catch (error) {
      console.error(error);
    }
  };

  const date = new Date(getDetailList?.date);

  return (
    <ToktokDetailWrapper>
      <div className="titleContent">
        <h4>{getDetailList?.title}</h4>
        <h5>
          {getDetailList?.user.signDogName} | {getDetailList?.user.signDogType}/{getDetailList?.user.signDogAge}살
        </h5>
        <h5>{date?.toString().slice(0, 21)}</h5>
        <p>{getDetailList?.content}</p>
        {<img src={getDetailList ? `${getDetailList?.imgUrl}` : ""} />}
      </div>

      <hr />
      <br />

      {getDetailCommentList?.map((testlistMap) => {
        return (
          <ToktokDetailCommentItem
            key={testlistMap._id}
            commentId={testlistMap._id}
            comment={testlistMap.comment}
            user={testlistMap.user}
            date={testlistMap.date}
          />
        );
      })}
      <button onClick={handleDel}>글삭제</button>
      <br />
      <br />
      <div>
        <label htmlFor="commentInput" />
        <input name="commentInput" className="c" value={commentValue} onChange={changeComment} />
        <button className="addCommentBtn" onClick={handleComment}>
          댓글입력
        </button>
      </div>
    </ToktokDetailWrapper>
  );
}

export default ToktokDetail;
