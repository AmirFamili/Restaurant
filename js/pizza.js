
const itemBox = document.querySelector('.item-box');
const pizza_dough = document.getElementById("pizza-dough");
const total_price = document.getElementById('total-price');
const total_calorie = document.getElementById('total-calorie');

const img_item=document.getElementsByClassName('img-item');
//---------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
    loadData();
});
//---------------------------------------------------------------
function loadData() {
    fetch('../json/food-items.json')
        .then(response => response.json())
        .then(items => showItems(items));
}

//---------------------------------------------------------------
const showItems = (items) => {

    for (let i = 0; i < items.items.length; i++) {

        var div = document.createElement('div');
        for (let y = 0; y < items.items[i].qty; y++) {

            var img = document.createElement('img');
            img.classList.add('img-item');
            img.setAttribute('id', items.items[i].id + y);
            img.setAttribute('src', items.items[i].image);
            img.setAttribute('data-name', items.items[i].name);
            img.setAttribute('data-price', items.items[i].price);
            img.setAttribute('data-calorie', items.items[i].calorie);
            img.setAttribute('draggable', 'true');
            img.setAttribute('ondragstart', 'dragStart(event)');
            img.setAttribute('style', 'position: absolute;')

            div.appendChild(img);
        }
        itemBox.appendChild(div);
    }

}



//---------------------------------------------------------------
let mouseOffset = { x:0, y: 0 };


const dragStart = (e) => {

    e.dataTransfer.setData('text/plain', e.target.id);
    mouseOffset = { x: e.target.offsetLeft- e.clientX, y: e.target.offsetTop- e.clientY };

}

//---------------------------------------------------------------

const allowDrop = (e) => {
    e.preventDefault();

}


//---------------------------------------------------------------
const onDrop = (e) => {

    var rect = e.target.getBoundingClientRect(); 
    var x = e.clientX - rect.left -30 ; 
    var y = e.clientY - rect.top-30; 
     
   
    let itemId = e.dataTransfer.getData('text/plain');
    let item = document.getElementById(itemId);

    

    item.style.position = "absolute";
 
    item.style.left = x + 'px';
    item.style.top = y + 'px';
  
    e.target.appendChild(item);
   

    let price = Number(total_price.textContent) + Number(item.dataset.price);
    total_price.innerText = price


    let calorie = Number(total_calorie.textContent) + Number(item.dataset.calorie);
    total_calorie.innerText = calorie




}

//---------------------------------------------------------------