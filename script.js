const cells = document.querySelectorAll('.size');
const rb = document.querySelector('.resbut');
const currentstatus = document.querySelector('.status');
const line = document.querySelector('.line');

const wi = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

let options = ["", "", "", "", "", "", "", "", ""];
let current = 'X';
let running = false;

init();

function init() {
    cells.forEach(cell => cell.addEventListener('click', cellclicked));
    rb.addEventListener('click', restart);
    currentstatus.innerHTML = `${current}'s turn`;
    running = true;
}

function cellclicked() {
    const i = this.getAttribute("index");
    if (options[i] !== "" || !running) {
        return;
    }
    update(this, i);
    check();
}

function update(cell, index) {
    options[index] = current;
    cell.innerHTML = current;
}

function change() {
    current = (current === 'X') ? 'O' : 'X';
    currentstatus.innerHTML = `${current}'s turn`;
}

function check() {
    let won = false;
    for (let i = 0; i < wi.length; i++) {
        let c = wi[i];
        const c1 = options[c[0]];
        const c2 = options[c[1]];
        const c3 = options[c[2]];
        if (c1 === "" || c2 === "" || c3 === "") {
            continue;
        }
        if (c1 === c2 && c2 === c3) {
            won = true;
            drawLine(c); // Draw line if there's a winner
            break;
        }
    }
    if (won) {
        currentstatus.innerHTML = `${current} won`;
        running = false;
    } else if (!options.includes("")) {
        currentstatus.innerHTML = `It's a tie`;
    } else {
        change();
    }
}

function drawLine(c) {
    const firstCell = cells[c[0]];
    const lastCell = cells[c[2]];

    // Get the positions of the winning cells
    const rect1 = firstCell.getBoundingClientRect();
    const rect2 = lastCell.getBoundingClientRect();
    const containerRect = document.querySelector('.container').getBoundingClientRect();

    // Calculate start and end points for the line
    const x1 = rect1.left + rect1.width / 2 - containerRect.left;
    const y1 = rect1.top + rect1.height / 2 - containerRect.top;
    const x2 = rect2.left + rect2.width / 2 - containerRect.left;
    const y2 = rect2.top + rect2.height / 2 - containerRect.top;

    // Calculate length and angle for the line
    const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

    // Set line properties
    line.style.width = `${length}px`;
    line.style.transform = `translate(${x1}px, ${y1}px) rotate(${angle}deg)`;
}

// Restart the game and clear the line
function restart() {
    current = 'X';
    options = ["", "", "", "", "", "", "", "", ""];
    currentstatus.innerHTML = `${current}'s turn`;
    cells.forEach(cell => cell.innerHTML = "");
    line.style.width = "0"; // Hide the line
    running = true;
}
