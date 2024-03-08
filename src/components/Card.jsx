import './../styles/card.scss';
import { isValidURL, truncateText } from '../utils/index';
import placeholderImage from './../assets/photo-cover.svg';

const Card = ({ user }) => {
  return (
    <div className="cart">
      <div className="cart_userPhoto">
        <img
          src={isValidURL(user.photo) ? user.photo : placeholderImage}
          alt={'user' + user.name}
          loading="lazy"
        />
      </div>

      <div className="cart_userName">
        <h3 title={user.name}>{truncateText(user.name, 25)}</h3>
      </div>

      <div className="cart_userDescription">
        <p title={user.position}>{user.position}</p>
        <p title={user.email}>{truncateText(user.email, 25)}</p>
        <p title={user.phone}>{user.phone}</p>
      </div>
    </div>
  );
};

export default Card;
