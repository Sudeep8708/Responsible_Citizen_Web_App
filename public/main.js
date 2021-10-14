var chckbxs = document.querySelectorAll("input[type='checkbox']");
var containers = document.querySelectorAll('.brief');
var listlength = document.querySelectorAll('.element').length;
var modal = document.querySelector('.modal');

//Below is a function which takes care of the coins addition and calculate the tasks performed for every day.
//This is executed only once..Since the local variables(count,count_coins)are referenced in the 
//return object, even after the function is executed these variables form a closure with the object.And also this helps in protecting 
//the varables and cannot be accessed in Global Environment.

const coins_counter = (function(){  

        var count = 0;
        function count_coins(){
          var coin = document.querySelectorAll('.coin');
          let sum=0;
          var day = (document.querySelector('.day').innerHTML).trim();
          coin.forEach(function(item){
          sum = sum + Number(item.innerText);
    });
    alert("A total Coins of $"+sum + " today, Awesome! Keep moving in the same way!");
    location.href = '/change?day='+day;
        }

        return {
            inc: function(){
                count++;
                if(count==listlength){                               //Checking whether all the tasks are completed, if yes..
                alert("Wow you Made it! Good Work! Keep Moving!!");
                modal.style.display = 'block';
                document.getElementById('btn').addEventListener('click', ()=>{
                count_coins();                                       //The total coins are counted for the day.
                });
              }},
            dec: function(){count--;}                                //Decrementing the count if user dechecks the task..
        }
        
})();

for (var i = 0; i < chckbxs.length; i++) {
  var b = "box"+i;
  chckbxs[i].classList.add(b);                                                                //Adding common classes for the checkbox and respective complete container.
  containers[i].classList.add(b);

  document.querySelector('.'+b).addEventListener("click", (b) =>{
    var str = b.target.className;

    if(document.querySelector('.'+str).checked==true){
    document.querySelectorAll('.'+str)[1].style.backgroundColor = 'rgb(177, 236, 177)';       //Changes the color of the container,if resp. task is done.
    coins_counter.inc();
    }

    else{
        document.querySelectorAll('.'+str)[1].style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
        coins_counter.dec();
    }

    (function(){      
      
             //This is executed once everytime the script is run, to check at which day the user is currently 
             //preforming the tasks and to request the badge pic accordingly from the server.
      
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

  });
}
//The Below functions adds the functionality of closing the POPUP'S,for the close buttons in the project.

document.getElementById('cancel').addEventListener('click',() =>{
  modal.style.display = 'none';
});

document.querySelector('.close').addEventListener('click',() =>{
  modal.style.display = 'none';
});
