// Variables Global
const AddTask = document.getElementById("AddTask");
const poppup = document.getElementById("modal-task");
const ClosingPoppup = document.getElementById("IconClosePoppup");
const Cancel = document.getElementById("Cancel");
const SubmitTheTask = document.getElementById("SubmitTheTask");
const TodoCol = document.getElementById("div1");
const DoingCol = document.getElementById("div2");
const DoneCol = document.getElementById("div3");
const cardTask = document.getElementsByClassName("cardTask");
const PoppUpContainer = document.getElementById("PoppUpContainer");
const floatingTextarea = document.getElementById("floatingTextarea");
const InputValue = document.querySelectorAll("*[data-req='Req']");
const TheTitleInput = document.getElementById("exampleInputEmail1");
const TodoTaskCount = document.getElementById("to-do-tasks-count");
let radioSelected, prioritySelected;

// Create The Main ID in our localStorage if not exist
if (localStorage.getItem("id") == null) {
  localStorage.setItem("id", 0);
}

///////////////////////////////  Global Functions  ///////////////////////////////////////////
//----------------- The Submit Button Mode(Disable , Enable ) Function ---------------------//
poppup.addEventListener("input", (e) => {
  if (e.target.id === "exampleInputEmail1" || e.target.id === "floatingTextarea") {
    let Value = e.target.value;
    let minLength = e.target.attributes[0].value;
    if (Value.length >= minLength) {
      SubmitTheTask.disabled = false;
    } else {
      SubmitTheTask.disabled = true;
    }
  }
});

//----------------- The radio check Selected ---------------------//
function RadioChecked() {
  if (document.getElementById("flexRadioDefault1").checked === true) {
    radioSelected = "Feature";
    return 1;
  } else if (document.getElementById("flexRadioDefault2").checked === true) {
    radioSelected = "Bug";
    return 1;
  } else {
    return 0;
  }
}

//----------------------- The PoppUp Generale Function -------------------------------------//
function PoppUp(status) {
  poppup.style.display = status;

  if (status === "flex") {
    document.getElementById("DeleteTheTask").classList.add("d-none");
    document.getElementById("SubmitTheTask").classList.remove("d-none");
    document.getElementById("UpdateTheTask").classList.add("d-none");
    document.getElementById("TitlePrompt").innerHTML = "Add Task";

    PoppUpContainer.innerHTML = `
      <div class="mb-3">
        <label for="exampleInputEmail1" aria-autocomplete="both" class="form-label">Title</label>
        <input data-parsley-minlength="8" data-parsley-minlength-message="You Have To Enter At Least 8 Letters On Title !!" type="text" required class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
      </div>
      <div>
        <label for="exampleInputEmail1" class="form-label">Type</label>
        <div class="form-check gap-2 d-flex">
          <input class="form-check-input align-self-center" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
          <label class="form-check-label" for="flexRadioDefault1">Feature</label>
        </div>
        <div>
          <div class="form-check gap-2 d-flex">
            <input required class="form-check-input align-self-center" type="radio" name="flexRadioDefault" id="flexRadioDefault2">
            <label class="form-check-label" for="flexRadioDefault2">Bug</label>
          </div>
        </div>
      </div>
      <div class="form">
        <label for="exampleInputEmail1" class="form-label">Priority</label>
        <select required="" class="form-select" id="floatingSelect" aria-label="Floating label select example">
          <option disabled selected>Please Select</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>
      <div class="form">
        <label for="exampleInputEmail1" class="form-label">Status</label>
        <select required="" class="form-select" id="floatingSelect2" aria-label="Floating label select example">
          <option disabled selected>Please Select</option>
          <option value="Yet">Not Yet</option>
          <option value="Doing">Doing</option>
          <option value="Done">Done</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Date</label>
        <input required type="date" class="form-control" id="Date" aria-describedby="emailHelp">
      </div>
      <div class="form-label">
        <label>Comments</label>
        <textarea data-parsley-minlength="10" value="" data-parsley-minlength-message="You Have To Enter At Least 8 Letters On Comment !!" required class="form-control" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
      </div>
    `;
  }
}
//------------------------------------------------------------------------------------------//

//////////////////////////////////////////////////////////////////////////////////////////////

//--------------------------- The PoppUp Controller ----------------------------------------//
// Affichage Poppup
AddTask.onclick = () => PoppUp("flex");
// Close The Poppup When click over Submit Button
ClosingPoppup.onclick = () => PoppUp("none");
// Close The Poppup When click over Cancel Button
Cancel.onclick = () => PoppUp("none");
//------------------------------------------------------------------------------------------//

//---------------- Event to Handle Click For Add Tasks To Local Storage -------------------//
SubmitTheTask.onclick = () => {
  // After The User filling data and press submit this etape is checking if all fields are filled successfully
  // And If one input is not filled its not will add to the local storage
  // check the select options
  if (document.getElementById("floatingSelect").value === "Please Select") {
    return;
  }
  if (document.getElementById("floatingSelect2").value === "Please Select") {
    return;
  }
  // check the date options
  if (document.getElementById("Date").value === "") {
    return;
  }
  // check the TextArea options
  if (document.getElementById("floatingTextarea").value === "") {
    return;
  }
  // check the Radio options with a function that returns 0 if it's not checked and 1 if checked
  if (RadioChecked() === 0) {
    return;
  } else {
    /* 
    This Id Variable For Get "id" Item From Local storage That Already exist,
    and Defined by 0 as begin value
    */
    let id = parseInt(localStorage.getItem("id"));
    // increment The Value Of The Id When the user clicked over submit button
    localStorage.setItem("id", id += 1);

    // create a Task Object That include All Details Of One Task
    const Task = {
      id: id,
      title: document.getElementById("exampleInputEmail1").value,
      priority: document.getElementById("floatingSelect").value,
      type: radioSelected,
      status: document.getElementById("floatingSelect2").value,
      date: document.getElementById("Date").value,
      comment: document.getElementById("floatingTextarea").value
    };
    // Stock The Task Object On The Local Storage With the JSON Stringify Method For Send The
    // Javascript Object As String to the web server And Manipulate it
    localStorage.setItem("task_" + Task.id, JSON.stringify(Task));
  }
};
//------------------------------------------------------------------------------------------//

//---------------- Event to Handle Click For Delete Tasks From Local Storage --------------------//
function RemoveWithId(id) {
  let key = "task_" + id;
  localStorage.removeItem(key);
}

//---------------- Poppup Delete Confirmation --------------------//
function ConfirmationPoppup(id) {
  poppup.style.display = "flex";
  document.getElementById("DeleteTheTask").classList.remove("d-none");
  document.getElementById("SubmitTheTask").classList.add("d-none");
  document.getElementById("UpdateTheTask").classList.add("d-none");
  document.getElementById("TitlePrompt").innerText = "Sure ?";

  PoppUpContainer.innerHTML = `<label for="exampleInputEmail1" aria-autocomplete="both" class="form-label">Delete item Number ${id} ??</label>`;
  document.getElementById("DeleteTheTask").onclick = () => {
    RemoveWithId(id);
  };
}

//------------------------------------------------------------------------------------------//
// Declare And Define Task Counter of each Col ( Done(0) , Doing(0) , Not yet(0) )
let CounterTodo = 0;
let CounterDoing = 0;
let CounterDone = 0;

// loop The Local storage Data, 
for (let i = 0; i < localStorage.length; i++) {
  let key = localStorage.key(i);
  if (key.includes("task_")) {
    let Task = JSON.parse(localStorage.getItem(key));
    let TaskContainer;

    // The Check For What Task Have Been Assigned To The Corresponding Column 
    if (Task.status === "Yet") {
      TodoCol.innerHTML += `
      <div id="${Task.id}" class="cardTask" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${Task.title}</h5>
          <h6 class="card-subtitle mb-2 text-body-secondary">Status: ${Task.status} Priority: ${Task.priority}</h6>
          <p class="card-text">${Task.comment}</p>
          <button class="btn btn-danger" onclick="ConfirmationPoppup(${Task.id})">Delete</button>
          <button class="btn btn-warning" onclick="UpdateTask(${Task.id})">Update</button>
        </div>
      </div>
      `;
      CounterTodo++;
      TodoTaskCount.innerText = CounterTodo;
    } else if (Task.status === "Doing") {
      DoingCol.innerHTML += `
      <div id="${Task.id}" class="cardTask" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${Task.title}</h5>
          <h6 class="card-subtitle mb-2 text-body-secondary">Status: ${Task.status} Priority: ${Task.priority}</h6>
          <p class="card-text">${Task.comment}</p>
          <button class="btn btn-danger" onclick="ConfirmationPoppup(${Task.id})">Delete</button>
          <button class="btn btn-warning" onclick="UpdateTask(${Task.id})">Update</button>
        </div>
      </div>
      `;
      CounterDoing++;
    } else if (Task.status === "Done") {
      DoneCol.innerHTML += `
      <div id="${Task.id}" class="cardTask" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${Task.title}</h5>
          <h6 class="card-subtitle mb-2 text-body-secondary">Status: ${Task.status} Priority: ${Task.priority}</h6>
          <p class="card-text">${Task.comment}</p>
          <button class="btn btn-danger" onclick="ConfirmationPoppup(${Task.id})">Delete</button>
          <button class="btn btn-warning" onclick="UpdateTask(${Task.id})">Update</button>
        </div>
      </div>
      `;
      CounterDone++;
    }
  }
}

// Update Task Function
function UpdateTask(id) {
  // Fetch the existing task from local storage
  const Task = JSON.parse(localStorage.getItem("task_" + id));

  // Populate the modal with existing task details
  TheTitleInput.value = Task.title;
  document.getElementById("floatingTextarea").value = Task.comment;
  document.getElementById("floatingSelect").value = Task.priority;
  document.getElementById("floatingSelect2").value = Task.status;

  // Show the modal
  PoppUp("flex");
  
  // Update the event listener for the submit button
  SubmitTheTask.onclick = () => {
    // Update the task object
    Task.title = TheTitleInput.value;
    Task.comment = document.getElementById("floatingTextarea").value;
    Task.priority = document.getElementById("floatingSelect").value;
    Task.status = document.getElementById("floatingSelect2").value;
    Task.date = document.getElementById("Date").value;

    // Save the updated task back to local storage
    localStorage.setItem("task_" + id, JSON.stringify(Task));

    // Close the popup
    PoppUp("none");
    
    // Refresh the task display
    location.reload();
  };
}


