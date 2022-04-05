const usernameElement = document.getElementById('username');
const passwordElement = document.getElementById('password');
const form = document.getElementById('form');


// Disclaimer: Es ist nicht auf Sicherheit angelegt... jeder der einen PC hat kommt rein :D
form.addEventListener('submit', (e) => {
  let messages = [];
  if(usernameElement.value == 'admin' && passwordElement.value == 'admin') {
    window.location.href('admin.html');
  } else {
    messages.push('Username oder Passwort falsch');
  }

  if(messages.length > 0) {
    e.preventDefault();
    alert(messages.join('\n'));
  }
  
  e.preventDefault();
});

const json = document.getElementById('json');
const nameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const emailInput = document.getElementById('email');
const nameSpan = document.getElementById('nameSpan');
const passSpan = document.getElementById('passSpan');
const emailSpan = document.getElementById('emailSpan');
const validSpan = document.getElementById('validSpan');

nameInput.addEventListener('input', (e) => {
  nameSpan.innerText = nameInput.value;
});

emailInput.addEventListener('input', (e) => {
  emailSpan.innerText = emailInput.value;
  if(emailInput.value.includes('@' && '.') && emailInput.value.length > 8) {
    validSpan.innerText = 'true';
    console.log('true');
  } else {
    validSpan.innerText = 'false';
    console.log('false');
  }
})

passwordInput.addEventListener('input', (e) => {
  passSpan.innerText = passwordInput.value;
});


