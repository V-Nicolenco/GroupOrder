let addOrder = document.getElementById('menu-addOrder');
let showOrders = document.getElementById('menu-showOrder');
let formOrder = document.getElementById('menu-formOrder');
let code = document.getElementById('menu-code');
let respContainer = document.getElementById('menu-responseContainer');
code.textContent = localStorage.code

addOrder.addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {type: "getOrders"}, function(response){
            response.name = localStorage.name;

            console.log(response)
            SendOrders(response, localStorage.code)
            .then((resp) => {
                Clear(respContainer, false);
                let info = document.createElement('div');
                if (resp.status === 200) {
                    info.textContent = 'Заказ добавлено!';    
                } else {
                    info.textContent = 'Виникла помилка!'
                }
                respContainer.append(info);
            })
            .catch((error)=> { console.log(error) })
        });
    });
});

showOrders.addEventListener('click', () => {
    GetOrdersList(localStorage.code)
    .then((resp) => {
        return resp.json();
    }).then((resp)=> {    
        Clear(respContainer, false);
        let list = document.createElement('ol');
        list.classList.add('menu-list')
        
        resp.members.forEach((order)=> {
            // console.log(order)
            let item = document.createElement('li');

            let header = document.createElement('div');
            let name = document.createElement('span');
            let bill = document.createElement('span');

            name.textContent = order.name;
            // bill.textContent = order.bill;
            header.append(name/*, bill*/);

            let body = document.createElement('ol');
            body.classList.add('menu-list')

            order.products.forEach((item) => {
                let dish = document.createElement('li');
                dish.textContent = item.name;
                body.append(dish);
            });
            
            body.classList.add('display_none');

            header.addEventListener('click', () => {
                body.classList.toggle('display_none');
            });
            item.append(header, body);
            list.append(item);    
        })
        respContainer.append(list);

    })
    .catch((error) => { console.log(error) })
})


formOrder.addEventListener('click', () => {

    let confirmation = document.createElement('div');
    confirmation.classList.add('confirmation');

    let confirmationWindow = document.createElement('div');
    confirmationWindow.classList.add('confirmation__window');

    let title = document.createElement('h2');
    title.classList.add('heading');
    title.textContent = 'Ви дійсно бажаєте сформувати заказ?'

    let confirmationConfirm = document.createElement('button');
    confirmationConfirm.classList.add('btn');
    confirmationConfirm.textContent = 'Так';

    let confirmationCancel = document.createElement('button');
    confirmationCancel.classList.add('btn');
    confirmationCancel.textContent = 'Ні';


    confirmationConfirm.addEventListener('click', async () => {
        Clear(confirmation, true);
        let menuContent = document.getElementById('menu-content');
        menuContent.classList.add('display_none');

        let loader = document.getElementById('loader');
        loader.classList.remove('display_none');
        let allDishes = await GetAllDishes(localStorage.code).then((resp) => resp.json())
        
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {type: 'formOrder', allDishes}, function(response){
                window.close();
            });
        });

    });    

    confirmationCancel.addEventListener('click', () => {
        Clear(confirmation, true);
    })

    confirmationWindow.append(title, confirmationConfirm, confirmationCancel)
    confirmation.append(confirmationWindow)
    document.body.append(confirmation);

});


async function SendOrders(resp, code) {
    return await fetch('http://localhost:8080/orders/'+code+'/add-order', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(resp)
    }).then((resp) => resp);
}


async function GetOrdersList(code) {
    return fetch('http://localhost:8080/orders/' + code + '/show-group-order', {})
}


async function GetAllDishes(code) {
    return fetch('http://localhost:8080/orders/' + code + '/form-group-order', {})
}


function Clear(root, includeItself) {
    while (root.firstChild) {
        root.removeChild(root.firstChild);
    }
    if (includeItself) {
        root.parentNode.removeChild(root)
    }
}

