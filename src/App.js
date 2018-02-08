import React, { Component } from 'react';
import classes from './App.css';

import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { id: 'asd1' ,name: 'Max', age: 28 },
      { id: 'asd2' ,name: 'Manu', age: 29 },
      { id: 'asd3' ,name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value',
    showPersons: false
  }

  nameChangedHandler = (event, id) => {
    
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    // const person = this.state.persons[personIndex]; // this is not desirable since we are pointing to the original state
    
    // another approach is
    // const person = Object.assign({},this.state.persons[personIndex]); // this is another good alternative
    
    // this is the most modern approach to copy the object is using the spread operator "..."
    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value; // here we update the name in de person copy, not the original state wich is good!

    const persons = [...this.state.persons];

    persons[personIndex] = person;
    
    this.setState({ persons: persons });
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
      backgroundColor: 'green',
      color: 'white',
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
              age={person.age} 
              key={person.id}
              changed={(event) => this.nameChangedHandler(event, person.id)} />
          })}
        </div>
      );

      style.backgroundColor = 'red';
      
    }

    let assignedClasses = [];

    if (this.state.persons.length <= 2) {
      assignedClasses.push(classes.red); 
    }
    if (this.state.persons.length <= 1) {
      assignedClasses.push(classes.bold); 
    }
    

    return (
      <div className={classes.App}>
        <h1>Hi, This is a test</h1>
        <p className={assignedClasses.join(' ')}>This is really working!</p>
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
