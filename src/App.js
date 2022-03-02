import React from 'react';
import Todo from './Todo';
import './App.css';
import { Paper, List, Container } from '@material-ui/core';
import AddTodo from './AddTodo';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        items: [
            {id:0, title:"hello world1", done:true},
            {id:1, title:"hello world23", done:false},
        ],
    };
  }

  add = (item) => {
    const thisItem = this.state.items;
    item.id = "ID-" + thisItem.length; 
    item.done = false;
    thisItem.push(item);
    this.setState({items:thisItem});
    console.log("items : ", this.state.items);
  }

  delete = (item) => {
    const thisItem = this.state.items;
      console.log("Before Update Items : ", this.state.items)
    const newItems = thisItem.filter(e => e.id !== item.id);
    this.setState({items: newItems}, () => {
      console.log("Update Items : ", this.state.items)
    })
  }

  componentDidMount() {
    const requestOptions = {
      method: "GET",
      headers: {"Content-Type": "application/json"},
    };

    fetch("http://localhost:8080/book", requestOptions)
      .then((response) => response.json())
      .then(
        (response) => {
          this.setState({
            items: response.data,
          });
        },
        (error) => {
          this.setState({
            error,
          });
        }
      );
  }

  render() {
        var todoItems = this.state.items.length > 0 && (
          <Paper style={{ margin: 16}}>
            <List>
              {this.state.items.map((item, idx) => (
                <Todo item={item} key={item.id} delete={this.delete} />
              ))}
            </List>
          </Paper>
        );
      
        return (
          <div className="App">
            <Container maxWidth="md">
              <AddTodo add={this.add} />
              <div className="TodoList">{todoItems}</div>
            </Container>
           </div>
          );
  }
}
export default App;
