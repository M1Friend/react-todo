import React from "react";
import ReactDOM from "react-dom";

// Обычно компоненты выносятся в разные файлы. Но не всегда
import TodoElement from "./TodoElement";
// import { initialArray } from "./constants";
import "./index.css";

class TodoList extends React.Component {
  state = {
    valueInput: "",
    todo: []
  };

  // все методы которые есть у дочерних компонентов я вынес наверх,
  // так как сверху имею полный контроль над происходящим (стейтом, переменными и тд)

  toggleDone = id => () => {
    // достаточно пройтись map'ом и обновить данные
    //
    const todo = this.state.todo.map((item, index) => {
      if (index === id) {
        return {
          ...item,
          completed: !item.completed
        };
      }
      return item;
    });

    this.setState({
      todo
    });
  };

  deleteTodo = id => () => {
    // опять же, одной строкой убираем нужное. без слайсов.
    //
    const todo = this.state.todo.filter((_, index) => index !== id);

    this.setState({ todo: todo });
  };

  addNewTodo = () => {
    // здесь в целом было всё ок
    const { valueInput, todo } = this.state;

    const newItem = {
      title: valueInput,
      completed: false
    };

    this.setState({
      todo: [...todo, newItem],
      valueInput: ""
    });
  };

  handleChange = event => {
    // добовляем атрибут "name" тэгу input
    // тем самым делаем код маштабируемым.
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  componentDidMount() {
    fetch('my-json-server.typicode.com/mcactus/react-todo/todos/1')
    .then(response => response.json())
    .then(todos => this.setState({todo: todos}));
  }

  render() {
    const { todo, valueInput } = this.state;
    return (
      <div className="todo">
        <div className="add-todo">
          <input
            type="text"
            name="valueInput"
            placeholder="Введите значение"
            value={valueInput}
            onChange={this.handleChange}
          />
          <button onClick={this.addNewTodo}>Создать</button>
        </div>
        <ul>
          {todo.map((elem) => {
            return (
              <TodoElement
                item={elem}
                onToggleDone={this.toggleDone(elem.id)}
                onDelete={this.deleteTodo(elem.id)}
                key={elem.id}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

ReactDOM.render(<TodoList />, document.getElementById("root"));
