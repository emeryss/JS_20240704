let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div")
let taskList = [];
let filterList = [];
let mode = 'all';

// 메뉴바 underline 코드 (시작)
let underline = document.getElementById("under-line")
tabs.forEach(menu=>menu.addEventListener("click", (e)=>indicator(e)))

function indicator(e){
    underline.style.left = e.currentTarget.offsetLeft + "px";
    underline.style.width = e.currentTarget.offsetWidth + "px";
    underline.style.top = e.currentTarget.offsetTop + e.currentTarget.offsetHeight + "px";
}
// 메뉴바 underline 코드 (끝)

addButton.addEventListener("click", addTask);
// taskInput.addEventListener("focus", function(){taskInput.value=""})

// enter키로 입력 
taskInput.addEventListener("keydown", function(event){
    if (event.key == "Enter"){
        console.log("Enter Key Pressed");
        addTask();
    }
});


for(let i=1;i<tabs.length; i++){
    tabs[i].addEventListener("click", function(event){filter(event)})

}

function addTask(){
    let task = {
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: false,
    }
    if(!task.taskContent){return};
    taskList.push(task);
    console.log(taskList)
    taskInput.value="";
    render()
}

function render(){
    let list = []
    if (mode == "all"){
        list = taskList;
    }else if(mode == "ongoing" || "done"){
        list = filterList;
    }


    let resultHTML = ``;
    for(let i=0; i<list.length; i++){
        if(list[i].isComplete == true){
            resultHTML += `<div class="task">
                    <div class="task-done">${list[i].taskContent}</div>
                    <div>
                        <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-rotate-right"></i></button>
                        <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>`
        }else{
            resultHTML += `<div class="task">
                    <div>${list[i].taskContent}</div>
                    <div>
                        <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-check"></i></button>
                        <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>`
        }
    }
    document.getElementById("task-board").innerHTML = resultHTML
}

function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
}

function toggleComplete(id){
    console.log("id", id)
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete
            break;
        }
    }
    render();
}

function deleteTask(id){
    for(let i=0; i<taskList.length; i++){
        if (taskList[i].id == id){
            taskList.splice(i,1);
            break;
        }
    }
    
    filter();
}

function filter(event){
    if (event){
        mode = event.target.id
    }
    
    filterList = []

    if(mode == "all"){
        //전체 리스트
        render();
    }else if(mode == "ongoing"){
        //진행중 아이템 보여주기
        //task.isComplete==false 인 경우
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete == false){
                filterList.push(taskList[i]);
            }
        }
        console.log("진행중", filterList)
        render();
    }else if(mode == "done"){
        //끝나는 케이스
        //task.isComplete==true
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete == true){
                filterList.push(taskList[i]);
            }
        }
        console.log("진행중", filterList)
        render();
    }

}