import { HeaderButton, ButtonStatus, ButtonType } from './header_button';
import Image from 'next/image';

const imageWidth = 103;
const imageHeight = 32.25;

const Header: React.FC = () => {
  return (
    <header className="flex flex-row justify-between p-2 px-4 bg-primary shadow-[0_3px_4px_rgba(0,0,0,0.8)]">
      <div className="flex items-center">
        <Image className="mr-1" src="/images/Brand.png" alt="ucll" width={imageWidth} height={imageHeight} />
        <h1>ISP submission system</h1>
      </div>
      <nav className="flex items-center">
        <HeaderButton buttonType={ButtonType.Home} buttonStatus={ButtonStatus.CurrentPage} />
        <HeaderButton buttonType={ButtonType.Login} buttonStatus={ButtonStatus.Inactive} />
      </nav>
    </header>
  );
};

export default Header;
