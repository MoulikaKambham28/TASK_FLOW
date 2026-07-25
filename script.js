let tasks = JSON.parse(localStorage.getItem("tasks")) || [];



function saveTasks(){

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}



function addTask(){

    let text=document.getElementById("taskInput").value;


    if(text==="")
    {
        alert("Enter a task");
        return;
    }


    let task={

        id:Date.now(),

        name:text,

        category:
        document.getElementById("category").value,

        priority:
        document.getElementById("priority").value,

        completed:false

    };


    tasks.push(task);


    saveTasks();


    document.getElementById("taskInput").value="";


    displayTasks();

}



function displayTasks(){


let list=document.getElementById("taskList");

list.innerHTML="";


let search=
document.getElementById("search").value.toLowerCase();



tasks
.filter(task =>
task.name.toLowerCase().includes(search)
)
.forEach(task=>{


let div=document.createElement("div");


div.className="task";


if(task.completed)
div.classList.add("completed");



div.innerHTML=`

<span>

${task.name}

<br>

<small>
${task.category} |
${task.priority}
</small>

</span>


<div>

<button onclick="completeTask(${task.id})">
✔
</button>


<button class="delete"
onclick="deleteTask(${task.id})">
✖
</button>

</div>

`;



list.appendChild(div);


});


updateDashboard();

}





function completeTask(id){


tasks.map(task=>{

if(task.id===id)
task.completed=!task.completed;


});


saveTasks();

displayTasks();

}




function deleteTask(id){


tasks=
tasks.filter(task=>task.id!==id);


saveTasks();

displayTasks();


}




function updateDashboard(){


document.getElementById("totalTasks")
.innerText=tasks.length;



document.getElementById("completedTasks")
.innerText=
tasks.filter(t=>t.completed).length;



document.getElementById("pendingTasks")
.innerText=
tasks.filter(t=>!t.completed).length;



updateChart();


}




let chart;



function updateChart(){


let completed=
tasks.filter(t=>t.completed).length;


let pending=
tasks.filter(t=>!t.completed).length;



let ctx=
document.getElementById("taskChart");



if(chart)
chart.destroy();



chart=new Chart(ctx,{

type:"doughnut",

data:{

labels:["Completed","Pending"],

datasets:[{

data:[
completed,
pending
]

}]

}

});


}




// Dark mode

document
.getElementById("themeBtn")
.onclick=function(){


document.body.classList.toggle("dark");


}




displayTasks()