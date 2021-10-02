import { Route, Switch } from 'react-router-dom';
import Contents from 'routes/Contents';
import Home from 'routes/Home';
import Login from 'routes/Login';
import ScrollToTop from './ScrollToTop';
import Messages from 'routes/Messages';
import WritePost from 'routes/WritePost';
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
        <Route path="/messages" component={Messages} />
        <Route path="/myprofile" component={Myprofile} />
        <Route path="/mypage" component={Mypage} />
      </Switch>
    </>
  );
};

export default AppRouter;
