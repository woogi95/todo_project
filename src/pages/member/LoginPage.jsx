import styled from "@emotion/styled";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getSession, loginMember, setSession } from "../../apis/member";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import SubpageVisual from "../../components/subpageVisual/SubpageVisual";

//세션 생성
const LOGIN_SESSION_KEY = "login_session";

const LoginWrap = styled.div`
  .loginForm {
    max-width: 600px;
    margin: 0px auto;
    padding: 0px 50px;
  }
  .loginForm .inputBox {
    display: block;
    margin-bottom: 5px;
    padding: 0px;
    border: none;
  }
  .loginForm .inputBox label {
    display: inline-block;
    margin: 10px 0px;
  }
  .loginForm .inputBox input {
    width: 100%;
  }
  .loginForm button {
    width: 100%;
    margin: 0px;
  }
`;

const ErrorMessage = styled.p`
  margin-bottom: 10px;
  color: #55ad9b;
  font-size: 13px;
`;

const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0px;
  a {
    color: #666;
  }
  span {
    padding: 0px 10px;
    color: #666;
    font-size: 13px;
  }
`;

//yup 관련 설정
const schema = yup.object({
  userId: yup
    .string()
    .required("이메일을 입력해 주세요.")
    .email("올바른 이메일 형식이 아닙니다.")
    .matches(
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
      "올바른 이메일 형식이 아닙니다.",
    ),
  upw: yup
    .string()
    .required("비밀번호를 입력해 주세요.")
    .min("8", "비밀번호는 최소 8자리 이상 입력하셔야 합니다."),
});

function LoginPage() {
  const navigate = useNavigate();
  const sessionData = getSession(LOGIN_SESSION_KEY);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userId: "",
      upw: "",
    },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = async data => {
    try {
      const result = await loginMember(data); //axios 전송하기
      //console.log(result.data);

      if (result.resultData.userId) {
        setSession(LOGIN_SESSION_KEY, result.resultData); //session
        navigate("/"); //홈으로 이동
      } else {
        alert(result.resultMsg);
      }
    } catch (error) {
      console.log("로그인 실패:", error);
    }
  };

  useEffect(() => {
    if (sessionData) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <SubpageVisual></SubpageVisual>

      <LoginWrap>
        <h1 className="subTitle">회원 로그인</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="loginForm">
            <div className="inputBox">
              <label htmlFor="email">이메일 아이디</label>
              <input
                type="text"
                id="email"
                placeholder="이메일 아이디 입력"
                maxLength={30}
                {...register("userId")}
              />
            </div>
            {/* 에러내용 출력 */}
            {errors.userId && (
              <ErrorMessage>({errors.userId?.message})</ErrorMessage>
            )}

            <div className="inputBox">
              <label htmlFor="password">비밀번호</label>
              <input
                type="password"
                id="password"
                placeholder="비밀번호 입력"
                {...register("upw")}
              />
            </div>

            {errors.upw && <ErrorMessage>({errors.upw?.message})</ErrorMessage>}

            <ButtonWrap>
              <Link to={"/join"}>회원가입</Link>
              <span>/</span>
              <Link to={"/change"}>비밀번호 찾기</Link>
            </ButtonWrap>

            <div>
              <button type="submit" className="btnColor">
                로그인
              </button>
            </div>
          </div>
        </form>
      </LoginWrap>
    </>
  );
}
export default LoginPage;
