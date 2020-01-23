// let connectBtn = document.getElementById('connectTransfer');
// let connectName = document.getElementById('connectName');
// let connectCode = document.getElementById('connectCode')

// connectBtn.addEventListener('click', () => {
//     if(isValidInp(connectCode, 4) && isValidInp(connectName, 3)) {
//         ConnectWithCode(connectName.value, connectCode.value)
//         .then((resp) => {
//             console.log(resp);
//             // if (resp.status === 200) {
//             //     return resp.json();
//             // }
//             // else throw new Error('bad response');
//         })
//         .then((resp) => {
//             localStorage.code = connectCode.value; 
//             window.location.href = './menu.html';
//         })
//         .catch((error) => { 
//             let result = document.createElement('p');
//             result.classList.add('text', 'bad-response');
//             result.textContent = 'Такого заказу не існує';
//             let warnings = document.getElementsByClassName('bad-response')
//             if (warnings) {
//                 for (let i = 0; i < warnings.length; i++ ) {
//                     warnings[i].remove()
//                 }
//             } 
//             document.body.append(result);
//             console.log(error) 
//         })
//     } else {
//         if (!isValidInp(connectName, 3)) {
//             ShowWarning(connectName, 'Ім\'я має бути більше 3 символів')
//         }
//         if (!isValidInp(connectCode, 4)) {
//             ShowWarning(connectCode, 'Код має бути більше 4 букв')
//         }
//     }
// })


// connectName.addEventListener('blur', () => {
//     if (!isValidInp(connectName, 4)) {
//         ShowWarning(connectName, 'Ім\'я має бути більше 3 символів')
//     } 
//     else {
//         if(connectName.classList.contains('input_invalid')) {
//             DeleteWarning(connectName);
//         }
//     }
// })

// connectCode.addEventListener('blur', () => {
//     if (!isValidInp(connectCode, 4)) {
//         ShowWarning(connectCode, 'Код має бути більше 4 символів')
//     } 
//     else {
//         if(connectCode.classList.contains('input_invalid')) {
//             DeleteWarning(connectCode);
//         }
//     }
// })


// async function ConnectWithCode(name, code) {
//     return fetch ('http://localhost:8080/orders/' + code, {
//         method: 'POST',
//         body: JSON.stringify({
//         })
//     })
//     .then((resp) => resp);
// }



// function isValidInp(inp, min) {
//     console.log(inp);
//     console.log(inp.value);
//     if (inp.value.length > min) {
//         return true;
//     }
//     return false;
// }

// function ShowWarning(inp, text) {
//     if (inp.classList.contains('input_invalid')) {
//         DeleteWarning(inp);
//     }
    
//     inp.classList.add('input_invalid');
//     let warning = document.createElement('span');
//     warning.textContent = text;
//     inp.after(warning);
// }

// function DeleteWarning(inp) {
//     inp.classList.remove('input_invalid')
//     inp.nextSibling.remove();
// }