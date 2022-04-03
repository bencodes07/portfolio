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

