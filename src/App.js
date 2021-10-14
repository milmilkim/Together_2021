import 'antd/dist/antd.css';
import 'App.less';
import Layout from 'components/LayoutComponents/Layout';
import { BrowserRouter, browserHistory } from 'react-router-dom';
import Cookies from 'universal-cookie/es6';
import { setToken } from 'components/Token';

function App() {
  setToken();

  return (
    <>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </>
  );
}

export default App;
