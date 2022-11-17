function solve() {

    const departBtn = document.getElementById('depart');
    const arriveBtn = document.getElementById('arrive');
    const info = document.querySelector('.info');

    let stop = {
        next: 'depot'
    };
  
   // debugger
   async function depart() {
        departBtn.disabled = true;
        arriveBtn.disabled = false;
        const url = `http://localhost:3030/jsonstore/bus/schedule/${stop.next}`;

        const response = await fetch(url);
        stop = await response.json();
        info.textContent = `Next stop ${stop.name}`;
        
    }

  function arrive() {
        departBtn.disabled = false;
        arriveBtn.disabled = true;
      
        info.textContent = `Arriving at ${stop.name}`;

    }

    return {
        depart,
        arrive
    };
}

let result = solve();