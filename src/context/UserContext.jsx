import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [users, setUsers] = useState(null);
  const [countUser, setCountUser] = useState(6);

  const fetchMoreUser = () => {
    if (countUser === 60) {
      return;
    }

    axios
      .get(`/users?page=1&count=${countUser + 6}`)
      .then(({ data }) => setUsers(data.users));

    setCountUser((prev) => prev + 6);
  };

  const fetchNewUserById = (id) => {
    axios.get(`/users/${id}`).then(({ data }) => {
      if (data.success) {
        const newArrayUsers = [...users];

        newArrayUsers.pop();
        newArrayUsers.unshift(data.user);

        setUsers(newArrayUsers);
      }
    });
  };

  useEffect(() => {
    if (!users) {
      axios
        .get(`/users?page=1&count=6`)
        .then(({ data }) => setUsers(data.users));
    }
  }, [users]);

  return (
    <UserContext.Provider
      value={{ users, setUsers, fetchMoreUser, fetchNewUserById }}
    >
      {children}
    </UserContext.Provider>
  );
}
