import axios from "axios";
import React, { useEffect } from "react";
import styled from "styled-components";

const ToktokDetailCommentItemWrapper = styled.div`
  .dateDel {
    display: flex;
    justify-content: end;
    .date {
      font-size: 12px;
      color: #0f0f10;
    }
    .del {
      cursor: pointer;
      margin-right: 15px;
      padding-bottom: 2px;
      border-bottom: 1px solid #0f0f01;
      &:hover {
        background-color: aliceblue;
      }
    }
  }
`;

function ToktokDetailCommentItem(props) {
  const { commentId } = props;

  useEffect(() => {}, []);

  const date = new Date(props.date);

  const hendleDel = async () => {
    try {
      const del = window.confirm("정말 삭제하시겠습니까?");
      if (del === false) return;
      window.alert("삭제되었습니다.");
      window.location.reload();
      await axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/community/toktok/ment/Del`, { commentId: commentId }, { withCredentials: true });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ToktokDetailCommentItemWrapper>
      <p className="b">작성자: {props.user?.signUserNicname}</p> <br />
      <span className="b">내용: {props.comment}</span>
      <div className="dateDel">
        <span
          className="del"
          onClick={() => {
            hendleDel();
          }}
        >
          🗑삭제
        </span>
        <span className="date">{date?.toString().slice(0, 21)} </span>
      </div>
      <hr />
    </ToktokDetailCommentItemWrapper>
  );
}

export default ToktokDetailCommentItem;
