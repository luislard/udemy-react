import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { name: 'Max', age: 28 },
      { name: 'Manu', age: 29 },
      { name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value',
    showPersons: false
  }

  nameChangedHandler = (event) => {
    this.setState({ 
      persons: [
        { name: 'Max', age: 28 },
        { name: event.target.value, age: 29 },
        { name: 'Stephanie', age: 26 }
      ]
    })
  }

  deletePersonHandler = (personIndex) => {
    
    // const persons = this.state.persons; // this causes a flaw because we are pointing to the original state
    // const persons = this.state.persons.slice(); // this is a better solution because it copies the original state array
    const persons = [...this.state.persons]; // this is almost the same as before but with more modern syntax
    persons.splice(personIndex, 1); 
    this.setState({persons: persons});
  }

  tooglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  render() {

    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    }

    // prefered way to toggle persons
    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person 
              click={this.deletePersonHandler.bind(this, index)}
              name={person.name}
              age={person.age} />
          })}
        </div>
      );
    }

    return (
      <div className="App">
        <h1>Hi, This is a test</h1>
        <p>This is really working!</p>
        <button 
          style={style}
          onClick={this.tooglePersonsHandler}>Switch Name</button>
        {persons}
      </div>
    );
    // return React.createElement('div', null, 'h1', 'Hi, I am a React Luis!!!');
    // return React.createElement('div', {className: 'App'}, React.createElement('h1',null,'LUISSSS'));
  }
}

export default App;
