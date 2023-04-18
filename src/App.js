import React from 'react';
import Todo from './Todo';
import Addtodo from './AddTodo';
import {Paper, List, Container} from "@material-ui/core";
import './App.css';

class App extends React.Component {
  constructor(props) {   // 매개변수 props 생성자 
    super(props);  // 매개변수 props 초기화
    this.state = {
      items : [
        {id: 0, title: "Todo 1 ", done: true},  // item에 item.id, item.title, item.done 매개변수 이름과 값을 할당
        {id: 1, title: "Todo 2", done: false},
      ],
    };
  }

  // add 함수 추가
  add = (item) => {
    const thisItems = this.state.items;
    item.id = "ID-"+thisItems.length;  // key를 위한 id 추가
    item.done = false;
    thisItems.push(item);
    this.setState({items: thisItems});  // update state
    console.log("items: ", this.state.items);
  }

  // delete 함수 추가 (alt+shift+f 포맷팅)
  delete = (item) => {
    const thisItems = this.state.items;
    const newItems = thisItems.filter(e => e.id !== item.id);
    this.setState({items: newItems}, () => {
      // 디버깅 콜백
      console.log("Update Items: ", this.state.items)
    });
  }

  render() {
    // todoItems에 this.state.items.length > 0 이면 true => && 뒤에 값을 넘겨준다.
    // -> todoItems = this.state.items.length > 0 ? (<Paper></Paper>): ""; 으로 작성해도 같은 결과(? : 조건 선택문 사용한 ver.)

    // javascript에서 제공하는 map 함수를 이용해 배열을 반복하여 <Todo/> Component를 여러 개 생성할 수 있다.
    var todoItems = this.state.items.length > 0 && (
      <Paper style={{margin: 16}}>
        <List>
          {this.state.items.map((item, idx) => (
                  <Todo item={item} key={item.id} delete={this.delete}/>
          ))}
        </List>
      </Paper>
    );

    // 생성된 Component JSX를 리턴
    return (
      <div className='App'>
        <Container maxWidth="md">
          <Addtodo add={this.add}/>
          <div className='TodoList'>{todoItems}</div>
        </Container>
      </div>
    )

  }
}
export default App;
