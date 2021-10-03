import { Route, Switch } from 'react-router-dom';
import Contents from 'routes/Contents';
import Home from 'routes/Home';
import Login from 'routes/Login';
import ScrollToTop from './ScrollToTop';
import Messages from 'routes/Messages';
import WritePost from 'routes/WritePost';
import Post from 'routes/Post';
import Myprofile from 'components/LayoutComponents/Myprofile';
import Mypage from 'components/LayoutComponents/Mypage';

const AppRouter = () => {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route exact path="/contents" component={Contents} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/writepost" component={WritePost} />
        <Route exact path="/messages" component={Messages} />
        <Route exact path="/myprofile" component={Myprofile} />
        <Route exact path="/mypage" component={Mypage} />
        <Route exact path="/post/:idx" component={Post} />
      </Switch>
    </>
  );
};

export default AppRouter;
