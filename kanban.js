// 1. Allow elements to be dropped into columns
function allowDrop(ev) {
    ev.preventDefault(); //Required to allow drop
}

// 2. Identify which task is being dragged
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id); //Store the ID of the dragged element
}

// 3. Handle the drop logic
function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    const draggedElement = document.getElementById(data);

    //Find the closest container to drop into
    let target = ev.target;
    while (target = ev.target && !target.classList.contains('item-container')) {
        // If dropped on the column or another task, find the container
        if (target.classList.contains('column')) {
            target = target.querySelector('.item-container');
        } else {
            target = target.parentElement;
        }
    }

    if (target) {
        target.appendChild(draggedElement); //Move the dragged element to the new container
        saveBoardState();
    }
}

// 4. Persistance (Local Storage)
function saveBoardState() {
    const columns = ['todo', 'inprogress', 'done'];
    const state = {};

    columns.forEach(colId => {
        const container = document.querySelector('#${colId} .items-container');
        const taskIds = Array.from(container.children).map(task => ({
            id: task.id,
            text: task.innerText
        }));
        state[colId] = taskIds;
    });

    localStorage.setItem('kanban-data', JSON.stringify(state));
    console.log("Board State Saved");
}

// 5. Bonus: Load state on startup
window.onload = () => {
    const savedData = localStorage.getItem('kanban-data');
    if (savedData) {
        //Here you would normally clear the board and re-render based on JSON
        console.log("Ready to load saved state: ", JSON.parse(savedData));
    }
};