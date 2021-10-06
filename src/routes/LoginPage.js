const LoginPage = () => {
  return (
    <>
      <a href="http://localhost:8080/oauth2/authorization/google">
        임시 구글로그인 (localhost:8080으로...)
      </a>
      <a href="http://localhost:8080/oauth2/authorization/kakao">
        임시 카카오 로그인 (localhost:8080으로...)
      </a>
      <a href="http://localhost:8080/oauth2/authorization/naver">
        임시 네이버 로그인 (localhost:8080으로...)
      </a>
    </>
  );
};

export default LoginPage;
