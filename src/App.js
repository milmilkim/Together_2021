import 'antd/dist/antd.css';
import 'App.less';
import Layout from 'components/LayoutComponents/Layout';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from 'Apollo';

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </ApolloProvider>
    </>
  );
}

export default App;
