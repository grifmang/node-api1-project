import React from 'react';
import ShowUsers from './components/ShowUsers';
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";
import { Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <>
    <ShowUsers />
    <div>
      <Route exact to='/adduser' component={AddUser} />
      <Route exact to='/:id' component={EditUser} />
    </div>
    </>
  );
}

export default App;
