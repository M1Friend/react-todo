import React from "react";

class TodoElement extends React.Component {
  constructor(props) {
    super(props);
    const { title } = props.item;
    this.state = {
      editActive: false,
      title: title
    }
  }

  handleChange = (event) => {
    const { value } = event.target;
    this.setState(() => {
      return {title: value}
    });
  }

  startEdit = () => {
    this.setState({editActive: true});
  }

  stopEdit = (event) => {
    event.preventDefault();
    this.props.onSave(this.state);
    this.setState({editActive: false});
  }

  render () {
    const { item, onDelete ,onToggleDone, hidden } = this.props;
    const { completed } = item;
    const { editActive, title } = this.state;
    return (
      <li className={hidden ? 'hidden' : ''}>
        <label>
          <input checked={completed} type="checkbox" onChange={onToggleDone} />
        </label>
        <form onSubmit={this.stopEdit}>
          <input
            type="text"
            name="title"
            value={title}
            className={`edit-input ${editActive ? 'active' : ''}`}
            onClick={this.startEdit}
            onChange={this.handleChange}
          />
          <button
            type="submit"
            className={`edit-btn ${editActive ? 'active' : ''}`}
          >Сохранить</button>
        </form>
        <button type="button" onClick={onDelete}>Удалить</button>
      </li>
    );
  }
}

export default TodoElement;
