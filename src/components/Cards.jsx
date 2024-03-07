import { useContext, useEffect, useState } from 'react';
import Button from './Button';
import Loader from './Loader';
import Card from './Card';

import { UserContext } from '../context/UserContext';

import './../styles/cards.scss';

const Cards = () => {
  const [usersCards, setUsersCards] = useState([]);

  const { users, fetchMoreUser } = useContext(UserContext);

  useEffect(() => {
    if (users) {
      setUsersCards(users);
    }
  }, [users]);

  return (
    <div className="carts" id="cards">
      <h2>Working with GET request</h2>

      {usersCards.length ? (
        <div className="carts_list">
          {usersCards.map((user) => (
            <Card key={user.id} user={user} />
          ))}
        </div>
      ) : (
        <Loader />
      )}

      {usersCards.length < 59 && (
        <Button title={'Show more'} onClick={fetchMoreUser} />
      )}
    </div>
  );
};

export default Cards;
