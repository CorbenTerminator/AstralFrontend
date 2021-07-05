import { BehaviorSubject } from 'rxjs';

// const currentTokenSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentToken')));
const currentTokenSubject = new BehaviorSubject(document.cookie.match(/jwt-token=[\w.]+/));

export const authenticationService = {
    login,
    logout,
    currentToken: currentTokenSubject.asObservable(),
    get currentTokenValue () { return currentTokenSubject.value }
};



function logout() {
    // remove user from local storage to log user out
    // localStorage.removeItem('currentToken');
    document.cookie = "jwt-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    currentTokenSubject.next(null);
}

async function login(credentials) {
    return fetch('/api/login', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(function(response){
       if(response.status === 401) {
         console.log("401 error")
         throw new Error("Неправильный логин или пароль");
       } else if (response.status === 200) {
         console.log("Success")
         return true
       } else {
           console.log(response.status)
           throw new Error(response.status);
       }
      })
      .then(token => {
        localStorage.setItem('currentToken', token);
        currentTokenSubject.next(token);
      })
      .then(console.log("done"))
   }