const form = document.querySelector('#form');
const firstName = document.querySelector('#firstName');
const firstNameError = document.querySelector('#firstName-error');
const lastName = document.querySelector('#lastName');
const lastNameError = document.querySelector('#lastName-error');
const email = document.querySelector('#email');
const emailError = document.querySelector('#email-error');
const output = document.querySelector('#output');


// Kollar så det inte är några siffror
const regExName =  /\d+/; 

// Validerar förnamn
const validateFirstName = () => {
    
  if(regExName.test(firstName.value)) {
    firstNameError.innerText = 'You can not have numbers in your first name'
    return 0;
  }
  else if (firstName.value.length < 2) {
    firstNameError.innerText = 'You have to have at least 2 characters in your first name'
    return 0;
  }
  else {
    firstNameError.innerText = ''
    return 1;
  }
}

// Validerar efternamn
const validateLastName = () => {
    
  if(regExName.test(lastName.value)) {
    lastNameError.innerText = 'You can not have numbers in your last name'
    return 0;
  }
  else if (lastName.value.length < 2) {
    lastNameError.innerText = 'You have to have at least 2 characters in your last name'
    return 0;
  }
  else {
    lastNameError.innerText = ''
    return 1;
  }
}

// Validerar email
const validateEmail = () => {

  // Kollar emailen. Går inte att ha åäö innan @.
  // Går att ha åäö efter @ då vissa kan ha åäö i sin domän och använder domänens mejl.
  let regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  if(!regEx.test(email.value)) {
    emailError.innerText = 'You have to put in a valid email'
    return 0;
  }
  else if (users.find(usr => usr.email == email.value) != undefined) {
    emailError.innerText = 'This email already exist'
    return 0;
  }
  else {
    emailError.innerText = ''
    return 1;
  }
}

// Skapa användare
const users = []

class User {
  constructor(firstName, lastName, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.id = Date.now().toString()
    this.listener = false;
    // console.log(this)
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
    <div class="user" id="${user.id}">
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

  if(validateFirstName(firstName) + validateLastName(lastName) + validateEmail(email) === 3) {
      createUser(firstName.value, lastName.value, email.value);
      renderUsers();
      resetForm();
    }

})