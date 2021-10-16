import 'routes/LoginPage.css';

const LoginPage = () => {
  return (
    <>
      {/*<a href="https://www.healthtogether.kro.kr/oauth2/authorization/google">
        임시 구글로그인
      </a>
      <a href="http://ec2-54-180-175-20.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/google">
        임시 구글로그인 2
  </a>*/}

      {/* <a href="http://localhost:8080/oauth2/authorization/kakao">
        임시 카카오 로그인 (localhost:8080으로...)
      </a>
      <a href="http://localhost:8080/oauth2/authorization/naver">
        임시 네이버 로그인 (localhost:8080으로...)
      </a> */}

      <div className="loginPage">
        <div className="loginButtonWrap">
          <div className="loginHeader">
            <h1>로그인</h1>
          </div>

          <div className="loginButton">
            <img src="loginButton/google.png" alt="google" />
          </div>

          <div className="loginButton">
            <img src="loginButton/kakao.png" alt="kakao" />
          </div>

          <div className="loginButton">
            <img src="loginButton/naver.png" alt="naver" />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
