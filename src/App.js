import React from 'react';
import './App.css';
import TodoList from './TodoList';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import About from './About';

function App() {
  return (
    <main>
      <div>
        <Link to="/">TodoList </Link>
        <Link to="/About">About Me </Link>
      </div>
      <Switch>
        <Route path="/" component={TodoList} exact />
        <Route path="/About" component={About} />
        <Route component={Error} />
      </Switch>
    </main>
  );
}

class Header extends React.Component{
  render(){
    return (
      <div>
        <h1> Header </h1>
      </div>
    );
  }
}

export default App;
