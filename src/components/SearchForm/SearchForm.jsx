import { Component } from 'react';

import { FiSearch } from 'react-icons/fi';
import { FormBtn, InputSearch, SearchFormStyled } from './SearchForm.styled';

export class SearchForm extends Component {
  state = {
    inputValue: ''
  }
  hendlerChangeInput = ({ currentTarget: { value } }) => {
    this.setState({ inputValue: value })
  }
  hendlerSubmitForm = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.inputValue);
    this.setState({ inputValue: '' });
  }


  render() {
    const { inputValue } = this.state

    return <SearchFormStyled onSubmit={this.hendlerSubmitForm}>
      <FormBtn type="submit">
        <FiSearch size="16px" />
      </FormBtn>
      <InputSearch
        placeholder="What do you want to write?"
        name="search"
        required
        autoFocus
        onChange={this.hendlerChangeInput}
        value={inputValue}
      />
    </SearchFormStyled>;
  }
}
