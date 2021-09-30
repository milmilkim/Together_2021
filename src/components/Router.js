import { Route, Switch } from 'react-router-dom';
import Contents from 'routes/Contents';
import Home from 'routes/Home';
import Login from 'routes/Login';
import ScrollToTop from './ScrollToTop';
import Messages from 'routes/Messages';
import WritePost from 'routes/WritePost';

const AppRouter = () => {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route exact path="/contents" component={Contents} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/writepost" component={WritePost}/>
        <Route path="/messages" component={Messages} />
      </Switch>
    </>
  );
};

export default AppRouter;
