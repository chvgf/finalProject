import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getLoginUser } from "../../../features/userInfoSlice";

const ToktokItemWrapper = styled.div`
  height: 130px;
  padding: 10px;
  margin: 30px 0;
  border: 2px solid #ccc;
  display: flex;
  justify-content: space-between;
  box-shadow: 1px 1px 1px 1px #8c8c8c;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    border: 2px solid #000;
    transform: scale(1.01);
  }
  .title {
    font-size: 16px;
    font-weight: 700;
    padding: 0 7px;
    margin-bottom: 15px;
  }
  .content {
    padding: 0 7px;
    font-size: 14px;
  }
  .toktokColumn {
    display: flex;
    flex-flow: column;
    justify-content: space-between;
  }
  .likeCommentView {
    font-size: 12px;
    color: #8c8c8c;
    span {
      padding: 0 7px;
    }
    .expiredDate {
      color: #68a6fe;
    }
  }
  .material-symbols-outlined {
    // 구글 머터리얼 아이콘
    background-color: #fff;
    border: none;
    font-size: 18px;
    color: #8c8c8c;
    &:hover {
      color: blue;
    }
  }
  .googlered {
    color: red;
    font-weight: bold;
  }
  .toktokColumn {
    span {
      font-size: 14px;
      color: #8c8c8c;
    }
    img {
      width: 130px;
      height: 80px;
    }
  }
`;

function ToktokItem(props) {
  const navigate = useNavigate();

  const [likeNum, setLikeNum] = useState();
  const [test, setTest] = useState();

  const 로그인중 = useSelector(getLoginUser); // 현재 로그인중 유저 정보

  const { like, view, _id, comment } = props;

  useEffect(() => {
    const likeState = async () => {
      await setLikeNum(like);
      await setTest(like);
    };
    likeState();
  }, [like]);

  const likeFilter = test?.filter((a) => {
    return a === 로그인중?._id;
  });

  const commentFilter = comment?.filter((commentFilter) => {
    return commentFilter?.postId === _id;
  });
  const handleLike = async () => {
    try {
      if (!로그인중) {
        alert("로그인 시 이용 가능");
      } else {
        const a = await axios.post(
          `${process.env.REACT_APP_SERVER_DOMAIN}/community/toktok/like`,
          { user: 로그인중, postId: _id },
          { withCredentials: true }
        );
        setLikeNum(a.data.data.like);
        setTest(a.data.data.like);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const addView = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/community/toktok/view`, { postId: _id }, { withCredentials: true });
    } catch (error) {
      console.error(error);
    }
  };

  function elapsedTime(date) {
    const start = new Date(date);
    const end = new Date();
    const diff = (end - start) / 1000;
    const times = [
      { name: "년", milliSeconds: 60 * 60 * 24 * 365 },
      { name: "개월", milliSeconds: 60 * 60 * 24 * 30 },
      { name: "일", milliSeconds: 60 * 60 * 24 },
      { name: "시간", milliSeconds: 60 * 60 },
      { name: "분", milliSeconds: 60 },
    ];
    for (const value of times) {
      const betweenTime = Math.floor(diff / value.milliSeconds);

      if (betweenTime > 0) {
        return `${betweenTime}${value.name} 전`;
      }
    }
    return "방금 전";
  }
  const 경과일 = elapsedTime(props.date);

  // const detailClick = () => {  // 서버 https 문제 때문에 유효성 검사 보류..
  //   if (로그인중) {
  //     navigate(`/community/Toktok/${props._id}`);
  //   } else {
  //     alert("로그인 시 이용 가능합니다.");
  //   }
  // };
  const detailClick = () => {
    navigate(`/community/Toktok/${props._id}`);
  };

  return (
    <ToktokItemWrapper
      onClick={() => {
        detailClick();
      }}
    >
      <div className="toktokColumn">
        <div
          onClick={() => {
            addView();
          }}
        >
          <h5 className="title">{props.title.length > 20 ? props.title.slice(0, 20) + "..." : props.title}</h5>
          <span className="content">{props.content.length > 35 ? props.content.slice(0, 35) + "..." : props.content}</span>
        </div>
        <div className="likeCommentView">
          <button
            className={`${likeFilter?.length ? "material-symbols-outlined googlered" : "material-symbols-outlined"}`}
            onClick={handleLike}
          >
            {" "}
            favorite
          </button>
          <span>{likeNum ? likeNum.length : 0}</span>
          <span className="material-symbols-outlined">mode_comment</span>
          <span>{commentFilter ? commentFilter.length : 0}</span>
          <span className="material-symbols-outlined">visibility</span>
          <span>{view ? view?.length : 0}</span>
          <span className="expiredDate">{경과일}</span>
        </div>
      </div>
      <div className="toktokColumn">
        <span>{props.user.signUserNicname} Lv.1</span>
        <img src={props.imgUrl} alt="" />
      </div>
    </ToktokItemWrapper>
  );
}

export default ToktokItem;
