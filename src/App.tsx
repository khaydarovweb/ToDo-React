import React, { Component } from 'react';
import "./app.css";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface AppState {
  tasks: Task[];
  taskText: string;
}

class TodoApp extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      tasks: [],
      taskText: '',
    };
  }

  addTask = () => {
    if (this.state.taskText.trim() !== '') {
      const newTask: Task = {
        id: new Date().getTime(),
        text: this.state.taskText,
        completed: false,
      };
      this.setState((prevState) => ({
        tasks: [...prevState.tasks, newTask],
        taskText: '',
      }));
    }
  };

  toggleTask = (id: number) => {
    const updatedTasks = this.state.tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });

    this.setState({
      tasks: updatedTasks,
    });
  };

  deleteTask = (id: number) => {
    const updatedTasks = this.state.tasks.filter((task) => task.id !== id);

    this.setState({
      tasks: updatedTasks,
    });
  };

  render() {
    return (
      <section>
        <div className='main'>
        <h1>Todo List</h1>
        <div className='taskCreator'>
          <input
            className='addInput'
            type="text"
            value={this.state.taskText}
            onChange={(e) => this.setState({ taskText: e.target.value })}
            placeholder="Add a new task"
          />
          <button className='addBtn' onClick={this.addTask}>Add</button>
        </div>
        <ul>
          {this.state.tasks.map((task) => (
            <li key={task.id}>
              <span>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => this.toggleTask(task.id)}
                />
                <span
                  style={{
                    textDecoration: task.completed ? 'line-through' : 'none',
                  }}
                >
                  {task.text}
                </span>
              </span>
              <button className='delBtn' onClick={() => this.deleteTask(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      </section>
    );
  }
}

export default TodoApp;