import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Contents from 'routes/Contents';
import Home from 'routes/Home';
import Login from 'routes/Login';
import ScrollToTop from './ScrollToTop';

const AppRouter = () => {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route exact path="/contents" component={Contents}></Route>
        <Route exact path="/login" component={Login}></Route>
      </Switch>
    </>
  );
};

export default AppRouter;
