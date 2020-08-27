import React from "react";

function TodoElement({ item, onDelete, onToggleDone }) {
  const { title, completed } = item;
  return (
    <li>
      <label>
        <input checked={completed} type="checkbox" onChange={onToggleDone} />
        <span>{title}</span>
      </label>
      <span onClick={onDelete}>&nbsp; Удалить</span>
    </li>
  );
}

export default TodoElement;
