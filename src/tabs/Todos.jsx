import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Grid, GridItem, SearchForm, EditForm, Text, Todo } from 'components';

export class Todos extends Component {
  state = {
    todos: [],
    isEditing: false,
    currentTodo: {},
  };

  componentDidMount() {
    const localTodos = localStorage.getItem('todos');
    if (localTodos) {
      this.setState({ todos: JSON.parse(localTodos) });
    }
  }

  componentDidUpdate() {
    localStorage.setItem('todos', JSON.stringify(this.state.todos));
  }

  handleSubmit = data => {
    const todo = { id: nanoid(), text: data };
    this.setState(prevState => ({ todos: [...prevState.todos, todo] }));
  };

  handleDelete = id => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== id),
    }));
  };

  handleEdit = todo => {
    this.setState({ currentTodo: todo, isEditing: true });
  };

  handleCancel = () => {
    this.setState({ isEditing: false });
  };

  handleChange = e => {
    const text = e.currentTarget.value;
    this.setState({
      currentTodo: { ...this.state.currentTodo, text: text },
    });
  };

  handleUpdate = e => {
    e.preventDefault();
    const updatedTodos = this.state.todos.map(todo =>
      todo.id === this.state.currentTodo.id ? this.state.currentTodo : todo
    );
    this.setState({ todos: updatedTodos, isEditing: false });
  };

  render() {
    const { todos, isEditing, currentTodo } = this.state;
    return (
      <>
        {isEditing ? (
          <EditForm
            onUpdate={this.handleUpdate}
            onChange={this.handleChange}
            onCancel={this.handleCancel}
            currentTodo={currentTodo}
          />
        ) : (
          <SearchForm onSubmit={this.handleSubmit} />
        )}
        <Grid>
          {todos.length !== 0 &&
            todos.map((todo, index) => (
              <GridItem key={todo.id}>
                <Todo
                  todo={todo}
                  number={index}
                  onDelete={this.handleDelete}
                  onEdit={() => this.handleEdit(todo)}
                />
              </GridItem>
            ))}
        </Grid>
      </>
    );
  }
}
