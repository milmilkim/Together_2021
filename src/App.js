import 'antd/dist/antd.css';
import 'App.less';
import Layout from 'components/LayoutComponents/Layout';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
      ,
    </>
  );
}

export default App;
