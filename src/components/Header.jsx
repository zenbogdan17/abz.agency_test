import Button from './Button';
import logo from '../assets/Logo.svg';

import './../styles/header.scss';

const Header = () => {
  return (
    <header>
      <div>
        <a className="logo" href="#banner">
          <img src={logo} alt="logo" />
        </a>

        <nav className="">
          <Button title={'User'} href="#cards" />
          <Button title={'Sign up'} href="#signUp" />
        </nav>
      </div>
    </header>
  );
};

export default Header;
