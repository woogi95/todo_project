import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { FaFacebookF, FaRegShareFromSquare, FaXTwitter } from "react-icons/fa6";
import { SiNaver } from "react-icons/si";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { getSession } from "../../apis/member";
import {
  getMandalartData,
  addLikeIt,
  deleteComment,
  deleteLikeIt,
  deleteShare,
  editComment,
  getComment,
  postComment,
  postCopy,
} from "../../apis/share";
import PopupLayout from "../../components/PopupLayout";
import GridLevel0View from "../mandalartview/GridLevel0View";

const LOGIN_SESSION_KEY = "login_session";

const MandalartDetailView = styled.div`
  .detailWrap {
    max-width: 1200px;
    margin: 0 auto;
  }
  .detailWrap .borderNone {
    border-bottom: none !important;
  }
  .detailWrap .share {
    margin-left: 10px;
    color: #55ad9b;
    font-weight: 500;
  }
  .detailWrap .inputBox {
    display: flex;
    align-items: center;
    padding: 15px 0px;
    border-bottom: 1px solid #eee;
  }
  .detailWrap .inputBox label {
    display: inline-block;
    min-width: 200px;
  }
  .detailWrap .viewType {
    display: flex;
  }
  .detailWrap .writeComment {
    gap: 0px;
    padding-top: 30px;
    padding-bottom: 0px;
  }
  .detailWrap .writeComment input {
    width: 100%;
  }
  .detailWrap .writeComment button {
    width: 150px;
  }
  .detailWrap .commentList {
    color: #666;
  }
  .detailWrap .commentList li {
    padding: 10px 10px;
    border-bottom: 1px solid #eee;
  }
  .detailWrap .commentList li:last-child {
    border-bottom: none;
  }
  .detailWrap .commentList .date {
    margin-bottom: 5px;
    color: #aaa;
    font-size: 13px;
  }
  .detailWrap .commentList .date button {
    padding: 0px 5px;
    border: none;
    background: none;
    color: #aaa;
    cursor: pointer;
  }
  .snsShareWrap {
    position: relative;
    right: 0px;
    button {
      margin-right: 10px;
      border: none;
      background: none;
      font-size: 20px;
      cursor: pointer;
    }
    .shareBox {
      position: absolute;
      top: -17px;
      right: 42px;
      width: 240px;
      padding: 15px;
      border: 1px solid #666;
      border-radius: 10px;
      background: #fff;
    }
    .shareBox h4 {
      margin-bottom: 10px;
      padding: 5px 0px;
      background-color: #f0f0f0;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 400;
      text-align: center;
    }
    .shareBox div {
      display: flex;
      justify-content: space-between;
      gap: 0px;
    }
    .shareBox button {
      width: 80px;
      margin: 0px;
      padding: 10px 5px;
      border-radius: 10px;
      font-size: 15px;
      cursor: pointer;
    }
    .shareBox button:hover {
      background: #f5f5f5;
    }
    .shareBox button span {
      display: flex;
      font-size: 10px;
      justify-content: center;
      align-items: center;
      color: #666;
    }
  }

  .noMember {
    display: flex;
    align-items: center;
    width: 100%;
    height: 50px;
    padding-left: 10px;
    background: #f0f0f0;
    color: #999;
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-top: 40px;
  border-top: 1px solid #eee;
`;

//yup 관련 설정
//1. schema를 먼저 설정한다.
const schema = yup.object({
  content: yup.string().required("한줄 댓글 내용은 필수입니다."),
});

const schemaEdit = yup.object({
  content: yup.string().required("한줄 댓글 내용은 필수입니다."),
});

function ViewMandalart() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const projectId = searchParams.get("projectId"); //개별 데이터로 뜯기
  const sessionData = getSession(LOGIN_SESSION_KEY);

  const [toggleSns, setToggleSns] = useState(false);
  const [commentList, setCommentList] = useState([]); //댓글 목록
  const [isLikeIt, setIsLikeIt] = useState(false);
  const [infoMandalart, setInfoMandalart] = useState([]); //만다라트 정보
  const [isCopyVisible, setIsCopyVisible] = useState(false); //게시물 복사하기 팝업
  const [isDeleteVisible, setIsDeleteVisible] = useState(false); //게시물 삭제하기 팝업
  const [isDeleteCommentVisible, setIsDeleteCommentVisible] = useState(""); //댓글 삭제하기 팝업
  const [isEditCommentVisible, setIsEditCommentVisible] = useState(false); //댓글 수정하기 내용

  const closeModal = () => {
    setIsCopyVisible(false);
  };

  //만다라트 정보 호출
  const getMandalartInfo = async () => {
    try {
      const result = await getMandalartData(projectId, sessionData?.userId); //axios
      //console.log("만다라트 정보 호출 : ", result.resultData);
      setInfoMandalart(result.resultData); //불러온 만다라트 정보 담기
      //console.log(result.resultData);

      if (result.resultData.likeFg === 1) {
        setIsLikeIt(true);
      }
    } catch (error) {
      console.log("검색 실패:", error);
    }
  };

  //댓글 작성
  const {
    register: registerComment,
    handleSubmit: handleSubmitComment,
    setValue: setValueComment,
    formState: { errors: errorsComment },
  } = useForm({
    defaultValues: {
      userId: "",
      content: "",
    },
    mode: "all",
    resolver: yupResolver(schema),
  });

  //댓글 수정
  const {
    register: registerEdit,
    handleSubmit: handleEditCommentSubmit,
    setValue: setValueEdit,
    formState: { errors: errorsEdit },
  } = useForm({
    defaultValues: {
      commentId: "",
      userId: "",
      content: "",
    },
    mode: "all",
    resolver: yupResolver(schemaEdit),
  });

  //댓글가져오기
  const getSharedComment = async () => {
    try {
      const result = await getComment({
        projectId: projectId,
      }); //axios
      //console.log(result.resultData);
      setCommentList(result.resultData.contentList);
    } catch (error) {
      console.log(error);
    }
  };

  //댓글 작성
  const onSubmitComment = async data => {
    try {
      const result = await postComment(data); //axios(등록)
      if (result.resultData === 1) {
        alert("한줄 댓글 등록이 완료되었습니다.");
        getSharedComment(); //댓글 가져오기
        setValueComment("content", "");
      } else {
        //회원정보 수정 실패
        alert("한줄 댓글 작성이 실패되었습니다.\n다시 시도해 주세요.");
      }
    } catch (error) {
      console.log("한줄 댓글 작성 실패:", error);
    }
  };

  //댓글 수정
  const onEditComment = async data => {
    try {
      const result = await editComment(data); //axios(등록)
      if (result.resultData === 1) {
        alert("한줄 댓글 수정이 완료되었습니다.");
        getSharedComment(); //댓글 가져오기
        setIsEditCommentVisible(false);
      } else {
        //회원정보 수정 실패
        alert("한줄 댓글 수정이 실패되었습니다.\n다시 시도해 주세요.");
      }
    } catch (error) {
      console.log("한줄 댓글 수정 실패:", error);
    }
  };

  const snsSendProc = type => {
    let shareTitle = infoMandalart.title;
    let shareURL = `http://localhost:5173/share/view?projectId=${projectId}`;
    //let imagesrc = `http://112.222.157.156:5211/pic/project/${projectId}/${pic}`;
    let a;
    let href;

    switch (type) {
      case "FB":
        href =
          "http://www.facebook.com/sharer/sharer.php?u=" +
          encodeURIComponent(shareURL) +
          "&t=" +
          encodeURIComponent(shareTitle);
        a = window.open(href, "Facebook", "");
        if (a) {
          a.focus();
        }
        break;

      case "TW":
        href =
          "http://twitter.com/share?text=" +
          encodeURIComponent(shareTitle) +
          " " +
          encodeURIComponent(shareURL);
        a = window.open(href, "Twitter", "");
        if (a) {
          a.focus();
        }
        break;

      case "NB":
        href =
          "https://share.naver.com/web/shareView.nhn?url=" +
          encodeURIComponent(shareURL) +
          "&title=" +
          encodeURIComponent(shareTitle);
        a = window.open(href, "NaverBlog", "");

        if (a) {
          a.focus();
        }
        break;
    }
  };

  const handleCopySubmit = async data => {
    data.preventDefault(); //submit 동작 방지

    try {
      const result = await postCopy({
        copyProjectId: projectId,
        userId: sessionData?.userId,
      }); //axios 전송하기(복사요청)
      if (result.data) {
        alert("만다라트 복제가 완료되었습니다.");
        navigate("/myplan");
      } else {
        alert("만다라트 복제가 실패되었습니다.\n다시 시도해 주세요.");
      }
    } catch (error) {
      console.log("만다라트 복제 실패:", error);
    }
  };

  const handleDeleteSubmit = async e => {
    e.preventDefault(); //submit 동작 방지

    try {
      const result = await deleteShare({
        projectId: projectId,
        userId: sessionData?.userId,
      }); //axios(삭제)
      if (result.resultData === 1) {
        alert("공유 만다라트를 삭제하였습니다.");
        navigate("/share");
      } else {
        alert("공유 만다라트 삭제가 실패되었습니다.\n다시 시도해 주세요.");
      }
    } catch (error) {
      console.log("공유 만다라트 삭제 실패:", error);
    }
  };

  //한줄 댓글 기존정보 수정폼으로 전달
  const selectCommentInfo = (id, content) => {
    setIsEditCommentVisible(true);
    setValueEdit("commentId", id);
    setValueEdit("userId", sessionData.userId);
    setValueEdit("content", content);
  };

  //한줄 댓글 삭제
  const handleDeleteCommentSubmit = async data => {
    data.preventDefault(); //submit 동작 방지

    try {
      const result = await deleteComment({
        commentId: isDeleteCommentVisible,
        userId: sessionData.userId,
      }); //axios(삭제)
      if (result.resultData === 1) {
        alert("공유 만다라트 댓글을 삭제하였습니다.");
        getSharedComment(); //댓글 가져오기
        setIsDeleteCommentVisible(); //팝업창 닫기
      } else {
        alert("공유 만다라트 댓글 삭제가 실패되었습니다.\n다시 시도해 주세요.");
      }
    } catch (error) {
      console.log("공유 만다라트 댓글 삭제 실패:", error);
    }
  };

  //좋아요
  const likeIt = async () => {
    try {
      const result = await addLikeIt({
        projectId: projectId,
        userId: sessionData?.userId,
      }); //axios(수정/삭제)
      if (result.resultData === 1) {
        alert("좋아요에 등록되었습니다.");
        setIsLikeIt(true);
      } else {
        alert("좋아요에 등록 실패하였습니다.\n다시 시도해 주세요.");
        setIsLikeIt(false);
      }
    } catch (error) {
      console.log("좋아요에 등록 실패:", error);
      setIsLikeIt(false);
    }
  };

  //좋아요 해제
  const likeItDelete = async () => {
    try {
      const result = await deleteLikeIt({
        projectId: projectId,
        userId: sessionData?.userId,
      }); //axios(수정/삭제)
      if (result.resultData === 1) {
        alert("좋아요 삭제하였습니다.");
        setIsLikeIt(false);
      } else {
        alert("좋아요 삭제가 실패되었습니다.\n다시 시도해 주세요.");
        setIsLikeIt(true);
      }
    } catch (error) {
      console.log("좋아요 삭제 실패:", error);
      setIsLikeIt(true);
    }
  };

  useEffect(() => {
    getMandalartInfo(); //만다라트 가져오기
    getSharedComment(); //댓글 가져오기
  }, []);

  useEffect(() => {
    setValueComment("userId", sessionData?.userId);
    setValueComment("projectId", projectId);
    return () => {};
  });

  return (
    <MandalartDetailView>
      <h1 className="subTitle">만다라트 공유 상세보기</h1>
      <div className="detailWrap">
        <div className="inputBox" style={{ justifyContent: "space-between" }}>
          <div>
            <label>제목</label>
            <span>{infoMandalart.title}</span>
          </div>

          <div className="snsShareWrap">
            <button
              onClick={() => setToggleSns(toggleSns === true ? false : true)}
            >
              <FaRegShareFromSquare />
            </button>
            {toggleSns === true ? (
              <div className="shareBox">
                <h4>공유하기</h4>
                <div>
                  <button onClick={() => snsSendProc("FB")}>
                    <FaFacebookF /> <span>페이스북</span>
                  </button>
                  <button onClick={() => snsSendProc("TW")}>
                    <FaXTwitter /> <span>X (트위터)</span>
                  </button>
                  <button onClick={() => snsSendProc("NB")}>
                    <SiNaver />
                    <span>네이버 블로그</span>
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className="inputBox">
          <label>작성자/작성일</label>
          <span>
            {infoMandalart.nickName} / {infoMandalart.createdAt}
          </span>
        </div>

        <div
          className="inputBox borderNone"
          style={{ alignItems: "flex-start" }}
        >
          <label style={{ marginTop: "15px" }}>계획표 보기</label>
          <div>
            <div>
              {/* 만다라트 계획표 출력 */}
              <GridLevel0View projectId={projectId} />
            </div>

            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(infoMandalart.content),
              }}
            ></div>
          </div>
        </div>

        {sessionData?.userId ? (
          <div
            className="inputBox"
            style={{ paddingBottom: "50px", justifyContent: "center" }}
          >
            <label></label>
            {isLikeIt === false ? (
              <button className="btnLine" onClick={() => likeIt()}>
                좋아요 👍
              </button>
            ) : (
              <button className="btnColor" onClick={() => likeItDelete()}>
                좋아요 👍
              </button>
            )}
          </div>
        ) : (
          <div className="inputBox"></div>
        )}

        <form onSubmit={handleSubmitComment(onSubmitComment)}>
          <input type="hidden" {...registerComment("userId")} />
          <input type="hidden" {...registerComment("projectId")} />
          <div className="inputBox writeComment borderNone">
            <label>한줄 댓글 작성하기</label>
            {sessionData?.userId ? (
              <>
                <input
                  type="text"
                  placeholder={
                    errorsComment.content
                      ? errorsComment.content.message
                      : "한줄 댓글 내용을 입력하세요."
                  }
                  {...registerComment("content")}
                />
                <button type="submit" className="btnLine">
                  등록하기
                </button>
              </>
            ) : (
              <>
                <div className="noMember">
                  한줄 댓글은 회원만 작성하실 수 있습니다.
                </div>
                <button type="button" className="btnLine">
                  등록하기
                </button>
              </>
            )}
          </div>
        </form>

        <div className="inputBox borderNone">
          <label></label>
          <ul className="commentList" style={{ width: "100%" }}>
            {commentList?.length === 0 && <li>등록된 댓글이 없습니다.</li>}

            {commentList?.map(item => (
              <li key={item.commentId}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div className="date">
                    {item.nickName === sessionData?.nickName ? (
                      <span style={{ color: "#55ad9b", fontWeight: "600" }}>
                        {item.nickName}
                      </span>
                    ) : (
                      item.nickName
                    )}{" "}
                    / {item.createdAt}
                  </div>
                  {item.nickName === sessionData?.nickName && (
                    <div className="date">
                      <button
                        type="button"
                        onClick={() =>
                          selectCommentInfo(item.commentId, item.content)
                        }
                      >
                        수정
                      </button>{" "}
                      /{" "}
                      <button
                        type="button"
                        onClick={() =>
                          setIsDeleteCommentVisible(item.commentId)
                        }
                      >
                        삭제
                      </button>
                    </div>
                  )}
                </div>
                <p>{item.content}</p>
              </li>
            ))}
          </ul>
        </div>

        <ButtonWrap>
          {sessionData?.userId && (
            <>
              {infoMandalart.nickName !== sessionData?.nickName && (
                <button
                  className="btnLine"
                  onClick={() => setIsCopyVisible(true)}
                >
                  복사하기
                </button>
              )}

              {infoMandalart.nickName === sessionData?.nickName && (
                <>
                  <button
                    className="btnLine"
                    onClick={() => setIsDeleteVisible(true)}
                  >
                    삭제하기
                  </button>
                  <Link
                    to={`/share/edit?projectId=${projectId}`}
                    className="btnLine"
                  >
                    수정하기
                  </Link>
                </>
              )}
            </>
          )}
          <Link to={"/share"} className="btnColor">
            목록으로
          </Link>
        </ButtonWrap>
      </div>

      {isCopyVisible && (
        <PopupLayout
          isVisible={isCopyVisible}
          onClose={closeModal}
          title={"만다라트 복사하기"}
        >
          <form onSubmit={e => handleCopySubmit(e)}>
            <div className="guideText inputBox">
              해당 만다라트 계획표를 나의 만다라트로 복사하시겠습니까?
            </div>
            <div className="buttonWrap">
              <button
                type="button"
                className="btnPopLine"
                onClick={() => setIsCopyVisible(false)}
              >
                취소하기
              </button>
              <button type="submit" className="btnPupColor">
                복사하기
              </button>
            </div>
          </form>
        </PopupLayout>
      )}

      {isDeleteVisible && (
        <PopupLayout
          isVisible={isDeleteVisible}
          onClose={closeModal}
          title={"만다라트 삭제하기"}
        >
          <form onSubmit={e => handleDeleteSubmit(e)}>
            <div className="guideText inputBox">
              만다라트 공유글을 삭제하시겠습니까?
            </div>
            <div className="buttonWrap">
              <button
                type="button"
                className="btnPopLine"
                onClick={() => setIsDeleteVisible(false)}
              >
                취소하기
              </button>
              <button type="submit" className="btnPupColor">
                삭제하기
              </button>
            </div>
          </form>
        </PopupLayout>
      )}

      {isDeleteCommentVisible !== "" && (
        <PopupLayout
          isVisible={isDeleteCommentVisible}
          onClose={closeModal}
          title={"한줄 댓글 삭제하기"}
        >
          <form onSubmit={e => handleDeleteCommentSubmit(e)}>
            <div className="guideText inputBox">
              삭제하신 댓글은 복구가 불가능합니다.
              <br />
              작성하신 한줄 댓글을 삭제하시겠습니까?
            </div>
            <div className="buttonWrap">
              <button
                type="button"
                className="btnPopLine"
                onClick={() => setIsDeleteCommentVisible()}
              >
                취소하기
              </button>
              <button type="submit" className="btnPupColor">
                삭제하기
              </button>
            </div>
          </form>
        </PopupLayout>
      )}

      {isEditCommentVisible && (
        <PopupLayout
          isVisible={isEditCommentVisible}
          onClose={closeModal}
          title={"한줄 댓글 수정하기"}
        >
          <form onSubmit={handleEditCommentSubmit(onEditComment)}>
            <input type="hidden" {...registerEdit("commentId")} />
            <input type="hidden" {...registerEdit("userId")} />
            <div className="guideText inputBox">
              <textarea
                placeholder={
                  errorsEdit.content
                    ? errorsEdit.content.message
                    : "한줄 댓글을 작성"
                }
                {...registerEdit("content")}
              ></textarea>
            </div>
            <div className="buttonWrap">
              <button
                type="button"
                className="btnPopLine"
                onClick={() => setIsEditCommentVisible(false)}
              >
                취소하기
              </button>
              <button type="submit" className="btnPupColor">
                수정하기
              </button>
            </div>
          </form>
        </PopupLayout>
      )}
    </MandalartDetailView>
  );
}

export default ViewMandalart;
