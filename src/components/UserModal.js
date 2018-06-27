import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { addUser, editUser } from '../actions/actions';
import uuid from 'uuid';
import moment from 'moment';

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#app');

class UserEditModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      isValid: true
    //   fname: '',
    //   lname: '',
    //   DOB: '',
    //   Age: null,
    //   phone: null,
    //   state: 'active'
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validate = this.validate.bind(this);
  }

  handleSubmit(event) {
      event.preventDefault();
      const user = {
        firstName: document.getElementById('fname').value,
        lastName: document.getElementById('lname').value,
        DOB: moment(document.getElementById('dob').value, 'YYYY-MM-DD').format('DD-MM-YYYY'),
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value
      };
      
      if(this.validate(user)) {
        this.setState({modalIsOpen: false});
        if (this.props.type === 'add') {
          //collect all the values
          const id = uuid();
          const userToAdd = {
            ...user,
            id
          }
          this.props.dispatch(addUser(userToAdd));
        } else if (this.props.type === 'edit') {
          const userToEdit = {
            ...user,
            id: this.props.user.id
          };
          this.props.dispatch(editUser(userToEdit));
        }
      } else {
        this.setState({isValid: false});
      }
    }
    
  openModal() {
    this.setState({modalIsOpen: true});
    if(this.props.type === 'edit') {
        const {firstName: fname, lastName: lname, DOB: dob, email, age, active, phone} = this.props.user;
        setTimeout(() => {
            document.getElementById('fname').value = fname;
            document.getElementById('lname').value = lname;
            document.getElementById('dob').value = moment(dob, 'DD-MM-YYYY').format('YYYY-MM-DD');
            document.getElementById('email').value = email;
            document.getElementById('phone').value = phone;
        }, 10);
    }
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  validate(user) {
    if(
      user.firstName === '' ||
      user.lastName === ''  ||
      user.DOB === '' ||
      user.email === ''
    ) {
      return false;
    }
    return true;
  }

  render() {
    return (
      <div>
        <button className={`button ${this.props.type==='add' && 'button_addUser'}`} onClick={this.openModal}>{this.props.title}</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          contentLabel="User Modal"
          closeTimeoutMS={200}
          className="modal"
        >
          <div className="modal__container">
            <div className="modal__title">
              <h2>{this.props.title}</h2>
            </div>
            <div className="modal__body">
              <form onSubmit={this.handleSubmit}>
                <div>
                  <label className="modal__label">First Name: </label>
                  <input className="modal__input" type='text' name='fname' id='fname'/><br /><br />
                </div>
                <div>
                  <label className="modal__label">Last Name: </label>
                  <input className="modal__input" type='text' name='lname' id='lname'/><br /><br />
                </div>
                <div>
                  <label className="modal__label">DOB: </label>
                  <input className="modal__input" type='date' name='dob' id='dob'/><br /><br />
                </div>
                <div>
                  <label className="modal__label">Phone: </label>
                  <input className="modal__input" type='tel' name='phone' id='phone'/><br /><br />
                </div>
                <div>
                  <label className="modal__label">Email: </label>
                  <input className="modal__input" type='email' name='email' id='email'/><br /><br />
                </div>
                <div>
                  { !this.state.isValid && <span className="errorMessage">Please fill in all the details.</span> }
                </div>
                <input className="button modal__submit" type='submit' value='Submit' />
                <button className="button" onClick={this.closeModal}>Cancel</button>
              </form>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    };
};

export default connect(mapStateToProps)(UserEditModal);
