
var taskInput = document.getElementById("new-task"); //new-tasks
var addButton = document.getElementsByTagName("button")[0]; //first button
var incompleteTasksHolder = document.getElementById("incomplete-tasks"); //incomplete-tasks
var completedTasksHolder = document.getElementById("completed-tasks"); //completed-tasks

//new task list item
var createNewTaskElement = function( taskString) {
  //create listItem
  var listItem = document.createElement("li");
  
  //input checkbox
  var checkBox = document.createElement("input"); //checkbox
  //label
  var label = document.createElement("label"); 
  //input text
  var editInput = document.createElement("input"); //text
  //button.edit
  var editButton = document.createElement("button");
  //button.delete
  var deleteButton = document.createElement("button");
  
  //each element needs modifying
  checkBox.type = "checkbox";
  editInput.type = "text";
  
  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";
  
  label.innerText = taskString; 
  
  //each element needs appending
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  
  return listItem;
}

//add task
var addTask = function() {
  console.log("add task...");
  //create new list item with the text from #new-task
  var listItem = createNewTaskElement(taskInput.value);
  
  //append listItem to incompleteTasksHolder 
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, completedTask);
  
  taskInput.value = "";
  
}

//edit an existing task
var editTask = function() {
  console.log("edit task...");
  
  var listItem = this.parentNode;
  
  var editInput = listItem.querySelector("input[type=text]");
  var label = listItem.querySelector("label");
  
  var containsClass = listItem.classList.contains("editMode");
  
  //if the class of the parent is .editMode
  if(containsClass) {
    //switch from .editMode
    //label text become the imput's value
    label.innerText = editInput.value;
  } else {
    //switch to .editMode
    //input value becomes the label's text
    editInput.value = label.innerText;
  }
  
  //toggle .editMode on the list item
  listItem.classList.toggle("editMode");  

}

//delete and existing task
var deleteTask = function() {
  console.log("delete task...");
 
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  
  //remove parent list item from the ul
  ul.removeChild(listItem);

}

//mark a task as complete
var completedTask = function() {
  console.log("complete task...");
  //append the task list to the #complete-task
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, incompleteTask);
  
}

//mark a task as incomplete
var incompleteTask = function() {
  console.log("incomplete task...");
  
  //append the task list to the #incomplete-task
  var listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, completedTask);
}

var bindTaskEvents = function( taskListItem, checkBoxEventHandler) {
  console.log("Bind list items event");
  //select taskListItem's children
  var checkBox = taskListItem.querySelector("input[type=checkbox]");
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");
  
  //bind editTask to edit button
  editButton.onclick = editTask;
  
  //bind deleteTask to delete button
  deleteButton.onclick = deleteTask;
  
  //bind checkBoxEventHandler to checkbox
  checkBox.onchange = checkBoxEventHandler;
};

var ajaxRequest = function() {
  console.log("AJAX request");
}

//set the click handler to the addtask function
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

//cycle over incompleteTaskHolder ul list items
for ( var i = 0; i < incompleteTasksHolder.children.length; i++ ) {
  //bind events to list item's children
  bindTaskEvents(incompleteTasksHolder.children[i], completedTask);
}

//cycle over completeTaskHolder ul list items
for ( var i = 0; i < completedTasksHolder.children.length; i++ ) {
  //bind events to list item's children
  bindTaskEvents(completedTasksHolder.children[i], incompleteTask);
}




























