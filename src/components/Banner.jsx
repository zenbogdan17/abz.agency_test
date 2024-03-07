import Button from './Button';

import './../styles/banner.scss';
const Banner = () => {
  return (
    <div className="banner" id="banner">
      <div>
        <h1>Test assignment for front-end developer</h1>
        What defines a good front-end developer is one that has skilled
        knowledge of HTML, CSS, JS with a vast understanding of User design
        thinking as they'll be building web interfaces with accessibility in
        mind. They should also be excited to learn, as the world of Front-End
        Development keeps evolving.
        <Button title={'Sign up'} href="#signUp" />
      </div>
    </div>
  );
};

export default Banner;
