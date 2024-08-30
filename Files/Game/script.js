let colorBtn=document.querySelectorAll(".filter_color");
let mainContainer=document.querySelector(".main_container");
let body=document.body;
let plusBtn=document.querySelector(".fa-plus");
let crossBtn=document.querySelector(".fa-times");
let deleteState="false";
let taskArr=[];

if(localStorage.getItem("allTask")){
    let taskArr=JSON.parse(localStorage.getItem("allTask"));
    
    for(let i=0;i<taskArr.length;i++){
        let {uid , color , task }=taskArr[i];
        addTaskContainer(task , color , false , uid);
    }


}


let input="";
for(let i=0;i<colorBtn.length;i++){
    colorBtn[i].addEventListener("click", function(e){
        
        console.log(e);
        let color=colorBtn[i].style.backgroundColor;
        mainContainer.style.backgroundColor=color;
    })
}

plusBtn.addEventListener("click" ,createModal);


     // create modal
    function createModal(){
        let modal_container=document.querySelector(".modal_container");
        
        if(modal_container == null){
            
            let modal_container=document.createElement("div");
            modal_container.setAttribute("class", "modal_container");
            modal_container.innerHTML=` <div class="input_container" >
            <textarea type="text" class="modal_input" placeholder="Enter the text..."></textarea>
            </div>
            <div class="modal_filter_container">
                    <div class="color" style="background-color:pink;"></div>
                    <div class="color" style="background-color: aqua;"></div>
                    <div class="color" style="background-color:lightgreen ;"></div>
                    <div class="color" style="background-color: black;"></div>
                    </div>`;
                body.appendChild(modal_container);
                handleModal(modal_container);
        }

        // if there is already modal -> blank the text area
        let textArea=modal_container.querySelector(".modal_input");
        textArea.value="";
 

    }

    // handle modal
    function handleModal(modal_container){
        let modal_color=document.querySelectorAll(".color");
        modal_color[3].classList.add("class","border");
       let bcolor="black";
        for(let i=0;i<modal_color.length;i++){
            modal_color[i].addEventListener("click", function(e){
                
                // first we have to remove border from all elements
                modal_color.forEach((filter)=>{
                    filter.classList.remove("class", "border");
                })
                // now add the boder in clicked color
                modal_color[i].classList.add("class","border");
                bcolor=modal_color[i].style.backgroundColor;
            })
        }
        let textArea=document.querySelector(".modal_input");
        textArea.addEventListener("keydown",function(event){
            // on Enter -> task container added -> modal container disappear
            if(event.key == "Enter"){
                input=textArea.value;
                modal_container.parentElement.removeChild(modal_container);
                addTaskContainer(input , bcolor , true);
            }
        })
    }



    
    function addTaskContainer(input , color , flag , id){
        let uidFn=new ShortUniqueId(); 
        let uid =id || uidFn();


        let taskContainer=document.createElement("div");
        taskContainer.setAttribute("class","task_container");
        taskContainer.innerHTML=`<div class="task_container">
                <div class="task_filter ${color}"></div>
                <div class="task_desc_container">
                    <h3 class="uid">${uid}</h3>
                    <div class="task_desc" contenteditable="true"> ${input} </div>
                </div>
        </div>`;
        mainContainer.appendChild(taskContainer);
        let task_filter=taskContainer.querySelector(".task_filter");
        
        if(flag == true){
            let obj={"task" : input ,"id" : uid , "color":color};
            taskArr.push(obj);
            let finalArr=JSON.stringify(taskArr);
            localStorage.setItem("allTask",finalArr);    
        }
        
        task_filter.addEventListener("click" , changeColor);
        taskContainer.addEventListener("click" , deleteTask);

    }

    function changeColor(e){
        // current target give the current element in which the event listner is attached
        let taskfilter=e.currentTarget;
        let colorArr=["pink" , "aqua" , "lightgreen" , "black"];
        let cColor = taskfilter.classList[1];
        let idx=colorArr.indexOf(cColor);
        let nextColIdx= (idx + 1) % 4;
        taskfilter.classList.remove(cColor);
        taskfilter.classList.add(colorArr[nextColIdx]);

    }
                            
      
   // Remove the task container div from cross btn 
    crossBtn.addEventListener("click" ,setDeleteState);
    
    function setDeleteState(e){
        
        let parent = crossBtn.parentNode;
        if(deleteState==false){
            parent.classList.add("active"); 
            deleteState=true;
            
        }else{
            parent.classList.remove("active");
            deleteState=false;
        }

    }

    function deleteTask(e){
        if(deleteState == true){
            let tContainer=e.currentTarget;
            tContainer.remove();
        }
    }

    function deleteTask(e){
        let taskContainer=e.currentTarget;
        // local storage search -> remove
        if(deleteState){
            let uidEle=taskContainer.querySelector(".uid");
            let uid=uidEle.innerText;
            // traverse in arr
            for(let i=0;i<taskArr.length;i++){
                let { id }=taskArr[i];
                if(id == uid){
                    taskArr.splice(i,1);
                    let finalTaskArr=JSON.stringify(taskArr);
                    localStorage.setItem("allTask" , finalTaskArr);
                    taskContainer.remove();
                    break;
                }
            }
        }
    }