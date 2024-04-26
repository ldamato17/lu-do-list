class LUDOList {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    }

    aggiungiTask(task) {
        this.tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
        this.renderTasks();
    }

    resetAllTasks() {
        this.tasks = [];
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
        this.renderTasks();
    }

    completeTask(index) {
        this.tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
        this.renderTasks();
    }

    renderTasks() {
        const todo = document.getElementById("list");
        todo.innerHTML = '';
        if(this.tasks.length === 0) {
            const p = document.createElement('p');
            const text = document.createTextNode('Nothing to do here!');
            p.appendChild(text);
            todo.appendChild(p);
            return;
        }
        this.tasks.forEach((task, index) => {
            const li = document.createElement('li');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            li.appendChild(checkbox);
            const taskText = document.createTextNode(task);
            li.appendChild(taskText);
            todo.appendChild(li);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const ludoList = new LUDOList();
    ludoList.renderTasks();

    
    document.getElementById("btmanlogo").addEventListener("click", ()=>{
        document.body.style.backgroundColor = "yellow";
        document.getElementById("input").placeholder = "Batman cosa farai a Gotham oggi?";
        document.body.style.color = "black";
    })

    document.getElementById("flashlogo").addEventListener("click", ()=>{
        document.body.style.backgroundColor = "red";
        document.getElementById("input").placeholder = "Flash cosa farai a Central City oggi?";
        document.body.style.color = "yellow";
    })

    document.getElementById("jklogo").addEventListener("click", ()=>{
        document.body.style.backgroundColor = "green";
        document.getElementById("input").placeholder = "Joker quale pazzia farai oggi?";
        document.body.style.color = "purple";
    })

    document.getElementById("add").addEventListener("click", () => {
        const input = document.getElementById("input");
        console.log("Nuovo task aggiunto", input.value);
        ludoList.aggiungiTask(input.value);
        input.value = ""; 
    });

    document.getElementById("rst").addEventListener("click", () => {
        ludoList.resetAllTasks();
    });
});