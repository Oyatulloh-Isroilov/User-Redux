import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeInfo, updateUser } from './redux/actions';

const App = () => {
  const [nameInput, setNameInput] = useState('');
  const [ageInput, setAgeInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [updatingId, setUpdatingId] = useState(null);
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const handleInfo = () => {
    if (nameInput.trim() !== '' && ageInput.trim() !== '' && emailInput.trim() !== '' && passwordInput.trim() !== '') {
      if (updatingId) {
        const updatedUsers = users.map(user =>
          user.id === updatingId
            ? { ...user, name: nameInput.trim(), age: ageInput.trim(), email: emailInput.trim(), password: passwordInput.trim() }
            : user
        );
        setUsers(updatedUsers);
        dispatch(updateUser(updatingId, nameInput.trim(), ageInput.trim(), emailInput.trim(), passwordInput.trim()));
        setUpdatingId(null);
      } else {
        const newUser = { id: new Date().getTime(), name: nameInput.trim(), age: ageInput.trim(), email: emailInput.trim(), password: passwordInput.trim() };
        setUsers([...users, newUser]);
      }
      setNameInput('');
      setAgeInput('');
      setEmailInput('');
      setPasswordInput('');
    }
  };



  const handleRemoveInfo = (id) => {
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);
    dispatch(removeInfo(id));
  };

  const handleUpdateInfo = (id) => {
    const userToUpdate = users.find(user => user.id === id);
    if (userToUpdate) {
      setNameInput(userToUpdate.name);
      setAgeInput(userToUpdate.age);
      setEmailInput(userToUpdate.email);
      setPasswordInput(userToUpdate.password);
      setUpdatingId(id);
    }
  };


  return (
    <>
      <div className="wrapper">
        <div className="container">
          <div className="input-container">
            <input
              type="text"
              value={nameInput}
              onChange={e => setNameInput(e.target.value)}
              placeholder="Enter a Name..."
            />
            <input
              type="number"
              value={ageInput}
              onChange={e => setAgeInput(e.target.value)}
              placeholder="Enter a Age..."
            />
            <input
              type="email"
              value={emailInput}
              onChange={e => setEmailInput(e.target.value)}
              placeholder="Enter a Email..."
            />
            <input
              type="password"
              value={passwordInput}
              onChange={e => setPasswordInput(e.target.value)}
              placeholder="Enter a Password..."
            />
            <button className='saveBtn' onClick={handleInfo}>{updatingId ? 'Update' : 'Save'}</button>
          </div>
          <table className='table'>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <th>Name:</th>
                  <td>{user.name}</td>
                  <th>Age:</th>
                  <td>{user.age}</td>
                  <th>Email:</th>
                  <td>{user.email}</td>
                  <th>Password:</th>
                  <td>{user.password}</td>
                  <td><button className='removeBtn' onClick={() => handleRemoveInfo(user.id)}><i className="fa-solid fa-trash"></i></button></td>
                  <td><button className='updateBtn' onClick={() => handleUpdateInfo(user.id)}><i className="fa-solid fa-pen-to-square"></i></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default App;
