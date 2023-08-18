// let tasklist = [
//   {
//     id: "123",
//     project: "Asign",
//     task: "Pdf update",
//     assignedOn: "1692184282172",
//     priority: 1,
//     status: true,
//     assignedTo: "Sagar",
//   },

//   {
//     id: "456",
//     project: "Camel",
//     task: "Emailers",
//     assignedOn: "1692184282172",
//     priority: 0,
//     status: false,
//     assignedTo: "Sunil",
//   },
//   {
//     id: "789",
//     project: "TaskManager",
//     task: "Frontend update",
//     assignedOn: "1692184282172",
//     priority: 0,
//     status: false,
//     assignedTo: "Shiva",
//   },
// ];
// let tasklistTemp;
// let Sagartasks = [
//   {
//     id: "789",
//     project: "Camel",
//     task: "Frontend update",
//     assignedOn: "1692184282172",
//     priority: 0,
//     status: false,
//     assignedTo: "Sagar",
//   },
// ];

let selectedTaskId = 0;
let selectedEmployee = "Girish";

const taskmodal = document.querySelector(".show_task_content");

const selectedEmployeeTab = document.getElementById("selectedEmployee");
const selectedEmployeeTitle = document.getElementById("selectedEmployeeTitle");

//if Employee Selected
selectedEmployeeTab.addEventListener("change", (event) => {
  selectedEmployee = selectedEmployeeTab.value;
  window.location.href = selectedEmployee;
  // console.log("clicked", selectedEmployee, selectedEmployeeTab.value);
  // if (`${selectedEmployeeTab.value}tasks` == "Sagartasks") {
  //   console.log("clicked sagar's task");
  //   tasklistTemp = tasklist;
  //   tasklist = Sagartasks;
  // } else {
  //   if (tasklistTemp) tasklistTemp.length < 0 ? "" : (tasklist = tasklistTemp);
  // }
  updateIntialData();
});

var table;
// Function to render data into the DataTable
function renderData(data) {
  table = $("#tasktable").DataTable({
    data: data,
    columns: [
      { data: "project" },
      {
        data: "task",
        render: function (data, type, row) {
          return `<span
            class="float-right text-primary"
            data-bs-toggle="modal"
            data-bs-target="#showTaskModal"
            style="cursor:pointer"
            id="${row.id}"
            onclick="openTask.apply(this,arguments)"
          >
            ${data}
          </span>`;
        },
      },
      { data: "assignedTo" },
      {
        data: "assignedOn"
        // ,
        // render: function (data, type, row) {
        //   const date = new Date(parseInt(data));
        //   const dateday = date.toLocaleDateString("en-US"
        //     , {
        //       weekday: "short",
        //       month: "long",
        //       day: "numeric",
        //       year: "numeric",
        //     }
        //   );
        //   const datetime = date.toLocaleTimeString("en-US"

        //     , {
        //       hour: "numeric",
        //       minute: "numeric",
        //       hour12: true,
        //     }${dateday}, ${datetime}
        //   );
        //   return `<span> </span>`;
        // },
      },
      {
        data: "priority",
        render: function (data, type, row) {
          return `
          <span class="badge bg-${data == 0 ? "danger" : "primary"} m-1">${data == 1 ? "High" : "Medium"
            }</span>
            `;
        },
      },
      {
        data: "status",
        render: function (data, type, row) {
          return `
          <span class="badge bg-${data ? "success" : "danger"} m-1">${data == 1 ? "Done" : "Not Done"
            }</span>
            `;
        },
      },
      {
        data: null,
        render: function (data, type, row) {
          return `
        <div class="">
          
          <button
            type="button"
            class="btn btn-outline-info"
            name="${data.id}"
            id="${data.id}"
            data-bs-toggle="modal"
            data-bs-target="#addNewModal"
            onclick="editTask.apply(this, arguments)"
          >
            <i class="fas fa-pencil-alt" id="${data.id}"  name="${data.id}"></i>
          </button>
          <button
            type="button"
            class="btn btn-outline-danger"
            name="${data.id}"
            id="${data.id}"
            onclick="deleteTask.apply(this, arguments)"
          >
            <i class="fas fa-trash-alt" id="${data.id}"  name="${data.id}"></i>
          </button>
        </div>
                `;
        },
      },
    ],
  });
}

$(document).ready(function () {
  renderData(tasklist);
});

function reRenderData() {
  console.log("Table refreshed");
  document.getElementById("taskform").reset();
  // button
  let savebutton = document.getElementById("savetask");
  savebutton.style.display = "inline";
  let updatebutton = document.getElementById("updatetask");
  updatebutton.style.display = "none";
  document.getElementById("status_group").style.display = "none";
  selectedTaskId = 0;
  // Clear and destroy the existing DataTable
  if (table) {
    table.clear().destroy();
  }
  // Re-render with new data
  renderData(tasklist);
}

const handleSubmit = (event) => {
  const id = `${Date.now()}`;
  const assignedOn = `${Date.now()}`;
  const input = {
    project: document.getElementById("task_project").value,
    task: document.getElementById("task_title").value,
    assignedTo: document.getElementById("task_assigned_to").value,
    priority: document.getElementById("priority").value,
    status: false,
    assignedOn,
  };

  const input_name = {
    project: document.getElementById("task_project").options[document.getElementById("task_project").selectedIndex].innerText,
    task: document.getElementById("task_title").value,
    assignedTo: document.getElementById("task_assigned_to").options[document.getElementById("task_assigned_to").selectedIndex].innerText,
    priority: document.getElementById("priority").value,
    status: false,
    assignedOn,
  };

  if (input.project === "" || input.task === "" || input.priority === "") {
    return alert("Please fill properly");
  }
  tasklist.push({ ...input_name, id });
  updateLocalStorage();
  reRenderData();
  document.getElementById("taskform").reset();

  $.post("/tasks/store",
    {
      _token: $('meta[name="csrf-token"]').attr('content'),
      name: input.task,
      user_id: input.assignedTo,
      project_id: input.project,
      priority: input.priority,
    },
    function (data, status) {
      // alert("Data: " + data + "\nStatus: " + status);
      location.reload();
    });

};

const openTask = (e) => {
  if (!e) e = window.event;
  let getTask = tasklist.find(({ id }) => id == e.target.id);
  taskmodal.innerHTML = htmlModalContent(getTask);
};

const editTask = (e) => {
  // console.log(tasklist);
  if (!e) e = window.event;
  const targetId = e.target.id;
  selectedTaskId = targetId;
  if (!targetId) targetId = e.target.getAttribute("name");
  // const getTask = tasklist.find((obj) => obj.id == targetId);
  let getTask = tasklist.find(({ id }) => id == e.target.id);
  console.log("inside edit task", getTask, selectedTaskId, targetId);
  // button
  let savebutton = document.getElementById("savetask");
  savebutton.style.display = "none";
  let updatebutton = document.getElementById("updatetask");
  updatebutton.style.display = "inline";
  updatebutton.setAttribute("task-id", targetId);
  //   status
  {
    let statusgroup = document.getElementById("status_group");
    statusgroup.style.display = "block";
    let statustobeupdated = getTask.status;
    const radioButtons = statusgroup.querySelectorAll(".form-check-input");
    console.log(statustobeupdated, getTask);

    radioButtons.forEach((radioButton) => {
      if (radioButton.id == statustobeupdated.toString()) {
        radioButton.checked = true;
      }
    });
  }
  //   title
  {
    let taskToSelectElement = document.getElementById("task_title");
    let tasktobeupdated = getTask.task;
    taskToSelectElement.value = tasktobeupdated;
  }
  //   project
  {
    let projectSelectElement = document.getElementById("task_project");
    let projectOptionToSelect = getTask.project_id;
    let optionToSelect = projectSelectElement.querySelector(
      `option[value="${projectOptionToSelect}"]`
    );
    if (optionToSelect) {
      optionToSelect.selected = true;
    }
    console.log(optionToSelect, projectSelectElement, projectOptionToSelect, getTask);
  }
  //   assigned to
  {
    let assignedToSelectElement = document.getElementById("task_assigned_to");
    let assignedToOptionToSelect = getTask.assignedTo_id;
    let optionToSelect = assignedToSelectElement.querySelector(
      `option[value="${assignedToOptionToSelect}"]`
    );
    if (optionToSelect) {
      optionToSelect.selected = true;
    }
  }
  //   priority
  {
    let prioritySelectElement = document.getElementById("priority");
    let priorityOptionToSelect = getTask.priority;
    let optionToSelect = prioritySelectElement.querySelector(
      `option[value="${priorityOptionToSelect}"]`
    );
    if (optionToSelect) {
      optionToSelect.selected = true;
    }
  }
};

const deleteTask = (e) => {
  if (!e) e = window.event;
  const targetId = e.target.getAttribute("name");
  const removeTask = tasklist.filter(({ id }) => id !== targetId);
  tasklist = removeTask;
  updateLocalStorage();
  reRenderData();
  console.log("delete", tasklist);

  $.post("/tasks/delete",
  {
    _token: $('meta[name="csrf-token"]').attr('content'),
    id: targetId,
  },
  function (data, status) {
    // alert("Data: " + data + "\nStatus: " + status);
    location.reload();
  });
};

const saveTask = (e) => {
  if (!e) e = window.event;
  const targetId = selectedTaskId;
  let isStatusChecked;
  let statusgroup = document.getElementById("status_group");

  const radioButtons = statusgroup.querySelectorAll(".form-check-input");
  radioButtons.forEach((radioButton) => {
    if (radioButton.checked) {
      isStatusChecked = radioButton.id;
    }
  });

  const updateEdit = {
    project: document.getElementById("task_project").value,
    task: document.getElementById("task_title").value,
    assignedTo: document.getElementById("task_assigned_to").value,
    priority: document.getElementById("priority").value,
    status: isStatusChecked == "1" ? 1 : 0,
  };

  const updateEdit_name = {
    id: targetId,
    priority: document.getElementById("priority").value,
    project: document.getElementById("task_project").options[document.getElementById("task_project").selectedIndex].innerText,
    task: document.getElementById("task_title").value,
    assignedTo: document.getElementById("task_assigned_to").options[document.getElementById("task_assigned_to").selectedIndex].innerText,
    priority: document.getElementById("priority").value,
    status: isStatusChecked == "1" ? 1 : 0,
  };

  if (
    updateEdit.project === "" ||
    updateEdit.task === "" ||
    updateEdit.priority === ""
  ) {
    return alert("Please fill properly");
  }
  var stateCopy = tasklist;
  console.log(
    "savetask",
    updateEdit.status,
    isStatusChecked,
    typeof updateEdit.status
  );

  for (let object of stateCopy) {
    if (object.id == targetId) {
      object.project = updateEdit.project;
      object.task = updateEdit.task;
      object.assignedTo = updateEdit.assignedTo;
      object.priority = updateEdit.priority;
      object.status = updateEdit.status;
    }
  }

  // tasklist = stateCopy;
  updateLocalStorage();
  reRenderData();
  document.getElementById("taskform").reset();
  // console.log(
  //   "update function ran",
  //   tasklist,
  //   stateCopy,
  //   updateEdit,
  //   targetId,
  //   isStatusChecked,
  //   selectedTaskId
  // );


  $.post("/tasks/update",
    {
      _token: $('meta[name="csrf-token"]').attr('content'),
      id: updateEdit_name.id,
      name: updateEdit_name.task,
      user_id: updateEdit.assignedTo,
      project_id: updateEdit.project,
      priority: updateEdit_name.priority,
      status: updateEdit_name.status,
    },
    function (data, status) {
      // alert("Data: " + data + "\nStatus: " + status);
      location.reload();
    });

};

const htmlModalContent = ({
  id,
  project,
  task,
  assignedTo,
  assignedOn,
  priority,
  status,
}) => {
  const date = new Date(parseInt(assignedOn));
  console.log("modal open", date, priority);
  return `    
	<div id=${id} class="d-flex flex-column gap-1" >
		<strong class="text-sm text-muted">Created on ${date.toDateString()}</strong>
		<h2 class="my-3">Project : ${project}</h2>
		<p class="lead">Task : ${task}</p>
		<p class="lead">Priority : 
        <span class="badge bg-${priority == 0 ? "danger" : "primary"} m-1">
        ${priority == 0 ? "High" : "Medium"}
  </span>
      </p>
    
    <p class="lead">Status : 
    <span class="badge bg-${status ? "success" : "danger"} m-1">
    ${status ? "Done" : "Not Done"}
    </span>
        </p>
		<p class="lead">Assigned to : ${assignedTo}</p>
	</div>
    `;
};

const updateLocalStorage = () => {
  localStorage.setItem(
    "tasks",
    JSON.stringify({
      tasks: tasklist,
    })
  );
};

const updateIntialData = () => {
  // Assigning selected Emp to Html
  {
    let employeeOptionToSelect = selectedEmployee;
    let optionToSelect = selectedEmployeeTab.querySelector(
      `option[value="${employeeOptionToSelect}"]`
    );
    if (optionToSelect) {
      optionToSelect.selected = true;
    }
  }
  selectedEmployeeTitle.innerHTML = selectedEmployee;
  reRenderData();
  console.log("update intial data called");
};
