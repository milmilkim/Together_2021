import { Layout as AntLayout } from 'antd';
import { useRecoilState } from 'recoil';
import { layoutState } from 'state';

const Footer = () => {
  const { Footer } = AntLayout;

  const [layoutVisible, setLayoutVisible] = useRecoilState(layoutState);

  return (
    <>
      {layoutVisible && (
        <Footer>
          <div className="footerText">
            &copy;403 Forbidden
            <div>
              Icons made by{' '}
              <a href="https://www.freepik.com" title="">
                freepik{' '}
              </a>
              from{' '}
              <a href="https://www.flaticon.com/" title="Flaticon">
                www.flaticon.com
              </a>
            </div>
          </div>
        </Footer>
      )}
    </>
  );
};

export default Footer;
