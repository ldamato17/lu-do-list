class LUDOList{
    constructor(){
        this.tasks=this.caricaTasks();
        this.generaTasks();
        console.log("tasks", this.tasks);
    }

    aggiungiTask(task){
        this.tasks.push(task);
        console.log("tasks", this.tasks);

        const todo=document.getElementById("todo");
        const list=document.getElementById("list");
        const li=document.createElement("li");
        li.appendChild(document.createTextNode(task));
        list.appendChild(li);
        todo.appendChild(list);
        li.addEventListener("click", (e)=>{
            this.terminaTask(task);
            e.srcElement.remove();
        }); 
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }

    terminaTask(task){
        console.log(`${task} terminato!`);
        const index=this.tasks.indexOf(task);
        this.tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }

    caricaTasks(){
        const tasks=localStorage.getItem("tasks");
        if(tasks){
            return JSON.parse(tasks);
        }else{
            return [];
        }
    }

    generaTasks(){
        this.tasks.forEach(task => {
            const todo=document.getElementById("todo");
            const list=document.getElementById("list");
            const li=document.createElement("li");
            li.appendChild(document.createTextNode(task));
            list.appendChild(li);
            todo.appendChild(list);
            li.addEventListener("click", (e)=>{
                this.terminaTask(task);
                e.srcElement.remove();
            });
        });
    }

    resetAllTasks(){
        this.tasks=[];
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
        const todo=document.getElementById("todo");
        todo.innerHTML="";
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const addTask=document.getElementById("add");
    const rstTask=document.getElementById("rst");
    const input=document.getElementById("input");

    const ludoList=new LUDOList();

    addTask.addEventListener("click", ()=>{
        console.log("Nuovo task aggiunto", input.value);
        ludoList.aggiungiTask(input.value);
        input.value=""; 
    })
    rstTask.addEventListener("click", ()=>{
        ludoList.resetAllTasks();
        console.log("reset task");
    })
    input.addEventListener("keypress", (e)=>{          //e è l'evento che si verifica premendo invio dopo aver riempito l'input box
        if(e.key==="Enter"){
            console.log("Nuovo task aggiunto", input.value);
            ludoList.aggiungiTask(input.value);
            input.value="";       //ripulire il campo input box
        }
    })
});