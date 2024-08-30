let todo=[];
let task = prompt("Enter the task you want to perform");
while(true){
    if(task=="Quit"){
        console.log("Quitting the task");
          break;
    }
    if(task=="Add"){
        let add=prompt("Enter the task you want to add");
        todo.push(add);
        console.log("Task added");
    }else if(task=="List"){
        console.log("--------------------------------")
        for(let i=0;i<todo.length;i++){
            console.log(i,todo[i]);
        }
        console.log("--------------------------------")
    }else if(task=="Delete"){
        let a=prompt("Tell the index Number you want  to delte");
        todo.splice(a,1);
        console.log("task deleted");
    }else{
        console.log("Wrong Request")
    }
    task=prompt("Enter the task you want to perform");

}