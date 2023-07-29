import { Component } from 'react';
import css from './ContactForm.module.css';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleNameChange = e => {
    this.setState({ name: e.target.value });
  };

  handlePhoneChange = e => {
    this.setState({ number: e.target.value });
  };

  handleSubmit = e => {
    const { name, number } = this.state;

    e.preventDefault();

    this.props.onAdd(name, number);
  };

  render() {
    return (
      <div className={css['form-wrapper']}>
        <div className={css[`label-input`]}>
          <label className={css.label} htmlFor="name">
            Name
          </label>
          <input
            className={css.input}
            type="text"
            name="name"
            pattern="^[A-Za-z.'\- ]+$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={this.handleNameChange}
          />
        </div>
        <div className={css[`label-input`]}>
          <label className={css.label} htmlFor="number">
            Number
          </label>
          <input
            className={css.input}
            type="tel"
            name="number"
            pattern="^\+?\d{1,4}?\s?\(?\d{1,4}?\)?\s?\d{1,4}\s?\d{1,4}\s?\d{1,9}$"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={this.handlePhoneChange}
          />
        </div>
        <button
          className={css.button}
          type="button"
          onClick={this.handleSubmit}
        >
          Add contact
        </button>
      </div>
    );
  }
}
