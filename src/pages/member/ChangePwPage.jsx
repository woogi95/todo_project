import styled from "@emotion/styled";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { changePassword } from "../../apis/member";
import SubpageVisual from "../../components/subpageVisual/SubpageVisual";

const FindPwWrap = styled.div`
  .findPwForm {
    max-width: 600px;
    margin: 0px auto;
    padding: 0px 50px;
  }
  .findPwForm .inputBox {
    display: block;
    margin-bottom: 5px;
    padding: 0px;
    border: none;
  }
  .findPwForm .inputBox label {
    display: inline-block;
    margin: 10px 0px;
  }
  .findPwForm .inputBox input {
    width: 100%;
  }
  .findPwForm button {
    width: 100%;
    margin: 0px;
  }
  .guideText {
    margin-bottom: 20px;
    color: #666;
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
  //upw: yup.string().required("비밀번호를 입력해 주세요."),
});

function ChangePwPage() {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userId: "",
    },
    mode: "all",
    resolver: yupResolver(schema),
  });

  const onSubmit = async data => {
    try {
      const result = await changePassword(data); //axios 전송하기

      if (result.resultData === 1) {
        alert("임시 비밀번호가 이메일로 발송되었습니다.");
        //navigate("/login"); //로그인 페이지로 이동
      } else {
        alert("회원정보가 잘못되었습니다.\n다시 확인해 주세요.");
      }
    } catch (error) {
      console.log("이메일 발송 실패:", error);
    }
  };

  return (
    <>
      <SubpageVisual></SubpageVisual>

      <FindPwWrap>
        <h1 className="subTitle">비밀번호 찾기</h1>
        <div className="findPwForm">
          <p className="guideText">
            이메일로 안내된 임시 비밀번호로 회원 로그인 후 [회원정보 수정]을
            통해
            <br />
            비밀번호를 반드시 재설정해 주시기 바랍니다.
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
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

            <ButtonWrap>
              <Link to={"/login"}>로그인</Link>
              <span>/</span>
              <Link to={"/join"}>회원가입</Link>
            </ButtonWrap>

            <div>
              <button type="submit" className="btnColor">
                임시 비밀번호 이메일 발송
              </button>
            </div>
          </form>
        </div>
      </FindPwWrap>
    </>
  );
}

export default ChangePwPage;
