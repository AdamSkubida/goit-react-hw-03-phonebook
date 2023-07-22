import { Component } from 'react';
import { ContactForm } from './ContactForm';
import { Filter } from './Filter';
import { ContactList } from './ContactList';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  addContact = (newContact, newNumber) => {
    const exist = this.state.contacts.find(
      contact => contact.name === newContact
    );

    if (!exist) {
      this.setState(prevState => ({
        contacts: [
          ...prevState.contacts,
          {
            name: newContact,
            id: nanoid(),
            number: newNumber,
          },
        ],
      }));
      Notify.success(`Contact was added!`);
    } else {
      Notify.failure(`Contact exist`);
    }
    console.log(this.state);
  };

  addFilter = newFilter => {
    this.setState({ filter: newFilter });
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => id !== contact.id),
    }));
    const contact = this.state.contacts.find(item => item.id === id);
    Notify.failure(`${contact.name} has been deleted`);
  };

  componentDidMount() {
    const storedContacts = localStorage.getItem('contacts');
    console.log(storedContacts);

    this.setState({ contacts: JSON.parse(storedContacts) });
  }

  componentDidUpdate() {
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }

  render() {
    return (
      <div>
        <ContactForm
          onAdd={(name, number) => {
            this.addContact(name, number);
          }}
        />
        <Filter onFilter={filter => this.addFilter(filter)} />
        <ContactList
          contactItems={this.state.contacts}
          filter={this.state.filter}
          deleteItem={id => this.deleteContact(id)}
        />
      </div>
    );
  }
}
