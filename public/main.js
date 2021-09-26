var chckbxs = document.querySelectorAll("input[type='checkbox']");
var containers = document.querySelectorAll('.brief');
var count=0;
var todolength = document.querySelectorAll('.element').length;
var modal =document.querySelector('.modal');


for (var i = 0; i < chckbxs.length; i++) {
  var b = "box"+i;
  chckbxs[i].classList.add(b);
  containers[i].classList.add(b);

  document.querySelector('.'+b).addEventListener("click", (b) =>{
    var str = b.target.className;

    if(document.querySelector('.'+str).checked==true){

    document.querySelectorAll('.'+str)[1].style.backgroundColor = 'rgb(177, 236, 177)';
    count++;
    }
    else{

        document.querySelectorAll('.'+str)[1].style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
        count--;
    }

    (function(){
      console.log("YES, I'm running!");
      if(document.querySelector('.day').innerHTML=='Day 1'){
        document.querySelector('.badge').innerHTML = 'Bronze';
      document.getElementById('image').src = 'bronze.jpg';
      }
      else if(document.querySelector('.day').innerHTML=='Day 2'){
        document.querySelector('.badge').innerHTML = 'Silver';
        document.getElementById('image').src = 'silver.jpg';
    }
    else if(document.querySelector('.day').innerHTML=='Day 3'){
      document.querySelector('.badge').innerHTML = 'Gold';
      document.getElementById('image').src = 'gold.jpg';
  }
})();

    if(count==todolength){
      alert("Wow you Made it! Good Work! Keep Moving!!");
      modal.style.display = 'block';
      document.getElementById('btn').addEventListener('click', ()=>{
        count_coins();
      });
    }
  });
}

document.getElementById('cancel').addEventListener('click',() =>{
  modal.style.display = 'none';
});

document.querySelector('.close').addEventListener('click',() =>{
  modal.style.display = 'none';
});

function count_coins(){
    let sum = 0;
    var coin = document.querySelectorAll('.coin');
    var day = (document.querySelector('.day').innerHTML).trim();
    coin.forEach(function(item){
        sum = sum + Number(item.innerText);
    });
    console.log("A total Coins of "+sum + "  Awesome!");

    location.href = '/change?day='+day;
}