const form = document.querySelector('#form');
const firstName = document.querySelector('#firstName');
const firstNameError = document.querySelector('#firstName-error');
const lastName = document.querySelector('#lastName');
const lastNameError = document.querySelector('#lastName-error');
const email = document.querySelector('#email');
const emailError = document.querySelector('#email-error');
const btn = document.querySelector('#btn');
const output = document.querySelector('#output');
const inputs = document.querySelectorAll('input');

const validateFirstName = () => {
    
      if(firstName.value === '') {
        firstNameError.innerText = 'You have to enter your first name'
        return false;
      }
      else if (firstName.value.length < 2) {
        firstNameError.innerText = 'You have to have at least 2 characters'
        return false;
      }
      else {
        firstNameError.innerText = ''
        return true;
      }
    }

const validateLastName = () => {
    
      if(lastName.value === '') {
        lastNameError.innerText = 'You have to enter your last name'
        return false;
      }
      else if (lastName.value.length < 2) {
        lastNameError.innerText = 'You have to have at least 2 characters'
        return false;
      }
      else {
        lastNameError.innerText = ''
        return true;
      }
    }

const validateEmail = () => {

      let regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


      if(email.value.match(regEx)) {
            emailError.innerText = ''
            return true;
      }
      else {
            emailError.innerText = 'You have to put in a valid email'
            return false;
      }
}


// Validerar namnen
// const validateText = (input) => {

//       if(input.value ==='') {
//             input.classList.add('is-invalid')
//             return false;      
//       }
//       else if(input.value.length < 2) {
//             input.classList.add('is-invalid');
//             input.classList.remove('is-valid');
//             return false;
//       }
//       else {
//             input.classList.add('is-valid');
//             input.classList.remove('is-invalid');
//             return true;
//       }
// }

// Validerar emailen
// const validateEmail = (_email) => {

//       let regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


//       if(regEx.test(_email.value)) {
//             _email.classList.add('is-valid');
//             _email.classList.remove('is-invalid');
//             return true;
//       }
//       else {
//             _email.classList.add('is-invalid');
//             _email.classList.remove('is-valid');
//             return false;
//       }
// }


// inputs.forEach(input => {
//       input.addEventListener('click', function(e) {
//         if(input.type === 'text')
//           validateText(input);
//         else if(input.type === 'email')
//           validateEmail(input);
//       })
//     })

// Skapa användare
const users = []

class User {
  constructor(firstName, lastName, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.id = Date.now().toString()
    this.listener = false;
  }
}

const createUser = (firstName, lastName, email) => {
  const user = new User(firstName, lastName, email);

  users.push(user);
  output.insertAdjacentHTML('beforeend', newUser(user))

}

const resetForm = () => {
      document.querySelectorAll('input').forEach(input => {
        input.value = '';
        input.classList.remove('is-valid');
      })
    }

const renderUsers = () => {
  output.innerHTML = '';
  users.forEach(user => {
    output.innerHTML += newUser(user);
  })
}

const newUser = (user) => {
  let template = `
    <div class="user animate" id="${user.id}">
      <div class="text">
        <h3>${user.firstName} ${user.lastName}</h3>
        <small>${user.email}</small>
      </div>
    </div>
  `
  return template
}
// Submit
form.addEventListener('submit', (e) => {
  e.preventDefault();
//   validate('#firstName');
//   validate('#lastName');
//   validateEmail(email);

//   if(validateText(firstName) && validateText(lastName) && validateEmail(email)) {
//     createUser(firstName.value, lastName.value, email.value);
//     renderUsers();
//     resetForm();
//   }

if(validateFirstName(firstName) && validateLastName(lastName) && validateEmail(email)) {
      createUser(firstName.value, lastName.value, email.value);
      renderUsers();
      resetForm();
    }

})