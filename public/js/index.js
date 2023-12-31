// let tasklist = [
//     {
//         id: "123",
//         project: "Asign",
//         task: "Pdf update",
//         assignedOn: "1692184282172",
//         priority: 1,
//         status: true,
//         assignedTo: "Sagar",
//     },
// ];

let selectedTaskId = 0;
let selectedEmployee = "Girish";
let isManagerEle = document.getElementById("is_manager");
let isAlltasksEle = document.getElementById("is_selectedAll");

let isManager = isManagerEle.value == 1 ? 0 : 1;
let isAlltasks =
    isAlltasksEle.value == 0 || isAlltasksEle.value == null ? true : false;

// console.log("html data", isManagerEle, isAlltasksEle);
const taskmodal = document.querySelector(".show_task_content");
const warningmodal = document.querySelector(".show_delete_task_content");

const selectedEmployeeTab = document.getElementById("selectedEmployee");

var app_url = $("#app_url").val();

//if Employee Selected
selectedEmployeeTab.addEventListener("change", (event) => {
    selectedEmployee = selectedEmployeeTab.value;
    var manager_url = $("#manager_url").val();
    window.location.href = manager_url + "/" + selectedEmployee;
    updateIntialData();
});

var table;
function renderData(data) {
    if (isManager == 0 && isAlltasks) {
        //    is manager and all tasks
        // console.log("is manager and all tasks", isManager, isAlltasks);
        table = $("#tasktable").DataTable({
            data: data,
            responsive: {
                details: {
                    display: DataTable.Responsive.display.childRowImmediate,
                    target: "",
                    type: "none",
                },
            },
            columns: [
                // Date
                {
                    width: "12%",
                    class: "text-right",
                    data: "created_at",
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
                // Priority
                {
                    width: "10%",
                    class: "text-center",
                    data: "priority",
                    render: function (data, type, row) {
                        return `<span class="badge bg-secondary m-1">${
                            data == 1 ? "High" : ""
                        }</span>`;
                    },
                },
                // project
                { data: "project", width: "15%", class: "text-left" },
                // task
                {
                    class: "text-left",
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
                // assignedTo
                {
                    data: "assignedTo",
                    width: "12%",
                    class: "text-left",
                },
                // status
                {
                    width: "5%",
                    data: null,
                    render: function (data, type, row) {
                        return `
                    <div class="" id="statusToggle" >
                    ${
                        data.status == 1
                            ? `<div><i style="color:orange" class="fa-solid fa-circle-check" id="${data.id}" name="${data.status}"  onclick="editStatus.apply(this, arguments)"></i></div> <span>${data.started_on}</span><p>Done <p>`
                            : data.status == 2
                            ? `<div><i style="color:#27ad5f" class="fa-solid fa-circle-check" id="${data.id}" name="${data.status}"  onclick="editStatus.apply(this, arguments)"></i></div><span>${data.closed_on}</span><p>Closed <p>`
                            : `
                            <div><i style="color:lightgray" class="fa-solid fa-circle-check" id="${
                                data.id
                            }" name="${
                                  data.status
                              }"  onclick="editStatus.apply(this, arguments)"></i>
                            </div>
                              <span>${
                                  data.assigned_on == undefined
                                      ? "not started"
                                      : data.assigned_on
                              }</span><p>Assigned <p>`
                    }

                    </div>
                    `;
                    },
                },
                // action
                {
                    width: "10%",
                    class: "text-center",
                    data: null,
                    render: function (data, type, row) {
                        return `
        <div class="d-inline-block">
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
              data-bs-toggle="modal"
            data-bs-target="#warningModal"
            onclick="openWarning.apply(this,arguments)"
          >
            <i class="fas fa-trash-alt" id="${data.id}"  name="${data.id}"></i>
          </button>
        </div>
                `;
                    },
                },
            ],
            // order: [[0, 'desc']]
            order: [],
        });
    } else if (isManager == 0 && !isAlltasks) {
        //    not manager and all tasks
        // console.log("is manager and not all tasks", isManager, isAlltasks);
        table = $("#tasktable").DataTable({
            data: data,
            responsive: {
                details: {
                    display: DataTable.Responsive.display.childRowImmediate,
                    target: "",
                    type: "none",
                },
            },
            columns: [
                // Date
                {
                    width: "12%",
                    class: "text-right",
                    data: "created_at",
                },
                // Priority
                {
                    width: "10%",
                    class: "text-center",
                    data: "priority",
                    render: function (data, type, row) {
                        return `<span class="badge bg-secondary m-1">${
                            data == 1 ? "High" : ""
                        }</span>`;
                    },
                },
                // project
                { data: "project", width: "15%", class: "text-left" },
                // task
                {
                    class: "text-left",
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
                // status
                {
                    width: "5%",
                    data: null,
                    render: function (data, type, row) {
                        return `
                    <div class="" id="statusToggle" >
                   ${
                       data.status == 1
                           ? `<div><i style="color:orange" class="fa-solid fa-circle-check" id="${data.id}" name="${data.status}"  onclick="editStatus.apply(this, arguments)"></i></div> <span>${data.started_on}</span><p>Done <p>`
                           : data.status == 2
                           ? `<div><i style="color:#27ad5f" class="fa-solid fa-circle-check" id="${data.id}" name="${data.status}"  onclick="editStatus.apply(this, arguments)"></i></div><span>${data.closed_on}</span><p>Closed <p>`
                           : `<div><i style="color:lightgray" class="fa-solid fa-circle-check" id="${data.id}" name="${data.status}"  onclick="editStatus.apply(this, arguments)"></i></div><span>${data.assigned_on}</span><p>Assigned <p>`
                   }
                    </div>
                    `;
                    },
                },
                // action
                {
                    width: "10%",
                    class: "text-center",
                    data: null,
                    render: function (data, type, row) {
                        return `
        <div class="d-inline-block">

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
              data-bs-toggle="modal"
            data-bs-target="#warningModal"
            onclick="openWarning.apply(this, arguments)"
          >
            <i class="fas fa-trash-alt" id="${data.id}"  name="${data.id}"></i>
          </button>
        </div>
                `;
                    },
                },
            ],
            // order: [[0, 'desc']]
            order: [],
        });
    } else {
        // not a manager
        // console.log("not a manager", isManager, isAlltasks);
        table = $("#tasktable").DataTable({
            data: data,
            responsive: {
                details: {
                    display: DataTable.Responsive.display.childRowImmediate,
                    target: "",
                    type: "none",
                },
            },
            columns: [
                // Date
                {
                    width: "12%",
                    class: "text-right",
                    data: "created_at",
                },
                // Priority
                {
                    width: "10%",
                    class: "text-center",
                    data: "priority",
                    render: function (data, type, row) {
                        return `<span class="badge bg-secondary m-1">${
                            data == 1 ? "High" : ""
                        }</span>`;
                    },
                },
                // project
                { data: "project", width: "15%", class: "text-left" },
                // task
                {
                    class: "text-left",
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
                {
                    width: "5%",
                    class: "text-left",
                    data: null,
                    render: function (data, type, row) {
                        return `
                    <div class="" id="statusToggle" >
                   ${
                       data.status == 1
                           ? `<div><i style="color:orange" class="fa-solid fa-circle-check" id="${data.id}" name="${data.status}"  onclick="editStatus.apply(this, arguments)"></i></div> <span>${data.started_on}</span><p>Done <p>`
                           : data.status == 2
                           ? `<div><i style="color:#27ad5f" class="fa-solid fa-circle-check" id="${data.id}" name="${data.status}"  onclick="editStatus.apply(this, arguments)"></i></div><span>${data.closed_on}</span><p>Closed <p>`
                           : `<div><i style="color:lightgray" class="fa-solid fa-circle-check" id="${data.id}" name="${data.status}"  onclick="editStatus.apply(this, arguments)"></i></div><span>${data.assigned_on}</span><p>Assigned <p>`
                   }
                    </div>
                    `;
                    },
                },
            ],
        });
    }

    // table = $("#tasktable").DataTable({
    //     data: data,
    //     responsive: {
    //         details: {
    //             display: DataTable.Responsive.display.childRowImmediate,
    //             target: "",
    //             type: "none",
    //         },
    //     },
    //     columns: [
    //         // Date
    //         {
    //             width: "10%",
    //             class: "text-right",
    //             data: "created_at",
    //             // ,
    //             // render: function (data, type, row) {
    //             //   const date = new Date(parseInt(data));
    //             //   const dateday = date.toLocaleDateString("en-US"
    //             //     , {
    //             //       weekday: "short",
    //             //       month: "long",
    //             //       day: "numeric",
    //             //       year: "numeric",
    //             //     }
    //             //   );
    //             //   const datetime = date.toLocaleTimeString("en-US"

    //             //     , {
    //             //       hour: "numeric",
    //             //       minute: "numeric",
    //             //       hour12: true,
    //             //     }${dateday}, ${datetime}
    //             //   );
    //             //   return `<span> </span>`;
    //             // },
    //         },
    //         // Priority
    //         {
    //             width: "10%",
    //             class: "text-center",
    //             data: "priority",
    //             render: function (data, type, row) {
    //                 return `<span class="badge bg-secondary m-1">${
    //                     data == 1 ? "High" : "Medium"
    //                 }</span>`;
    //             },
    //         },
    //         // project
    //         { data: "project", width: "20%", class: "text-left" },
    //         // task
    //         {
    //             width: "30%",
    //             class: "text-left",
    //             data: "task",
    //             render: function (data, type, row) {
    //                 return `<span
    //         class="float-right text-primary"
    //         data-bs-toggle="modal"
    //         data-bs-target="#showTaskModal"
    //         style="cursor:pointer"
    //         id="${row.id}"
    //         onclick="openTask.apply(this,arguments)"
    //       >
    //         ${data}
    //       </span>`;
    //             },
    //         },
    //         // assignedTo
    //         { data: "assignedTo" },
    //         // status
    //         {
    //             width: "10%",
    //             class: "text-left",
    //             data: null,
    //             render: function (data, type, row) {
    //                 return `
    //                 <div class="" id="statusToggle" >
    //                 ${
    //                     data.status != null
    //                         ? data.status == 1
    //                             ? `<div><i style="color:#27ad5f" class="fa-solid fa-circle-check" id="${data.id}" name="${data.status}"  onclick="editStatus.apply(this, arguments)"></i></div>`
    //                             : `<div><i style="color:orange" class="fa-solid fa-circle-check" id="${data.id}" name="${data.status}"  onclick="editStatus.apply(this, arguments)"></i></div>`
    //                         : `<div><i style="color:lightgray" class="fa-solid fa-circle-check" id="${data.id}" name="${data.status}"  onclick="editStatus.apply(this, arguments)"></i></div>`
    //                 }
    //                 </div>
    //                 `;
    //             },
    //         },
    //         // action
    //         {
    //             width: "20%",
    //             class: "text-left",
    //             data: null,
    //             render: function (data, type, row) {
    //                 return `
    //     <div class="d-inline-block">

    //       <button
    //         type="button"
    //         class="btn btn-outline-info"
    //         name="${data.id}"
    //         id="${data.id}"
    //         data-bs-toggle="modal"
    //         data-bs-target="#addNewModal"
    //         onclick="editTask.apply(this, arguments)"
    //       >
    //         <i class="fas fa-pencil-alt" id="${data.id}"  name="${data.id}"></i>
    //       </button>
    //         <button
    //         type="button"
    //         class="btn btn-outline-danger"
    //         name="${data.id}"
    //         id="${data.id}"
    //           data-bs-toggle="modal"
    //         data-bs-target="#warningModal"
    //         onclick="openWarning.apply(this, arguments)"
    //       >
    //         <i class="fas fa-trash-alt" id="${data.id}"  name="${data.id}"></i>
    //       </button>
    //     </div>
    //             `;
    //             },
    //         },
    //     ],
    //     // order: [[0, 'desc']]
    //     order: [],
    // });
}

$(document).ready(function () {
    renderData(tasklist);
});

function reRenderData() {
    // console.log("Table refreshed");
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
    // const id = `${Date.now()}`;
    // const datenew = `${Date.now()}`;
    const timestamp = new Date().toString();

    const dateObj = new Date(timestamp);

    // Days and months mapping for abbreviation
    const daysAbbreviation = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthsAbbreviation = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    // Extract day of the week, day of the month, and month
    const dayOfWeekAbbrev = daysAbbreviation[dateObj.getDay()];
    const dayOfMonth = dateObj.getDate();
    const monthAbbrev = monthsAbbreviation[dateObj.getMonth()];

    // Combine the extracted components into the desired format
    const created_at = `${dayOfWeekAbbrev}, ${dayOfMonth} ${monthAbbrev}`;
    const id = `${Date.now()}`;
    const input = {
        project: document.getElementById("task_project").value,
        task: document.getElementById("task_title").value,
        assignedTo: document.getElementById("task_assigned_to").value,
        priority: document.getElementById("priority").value,
        status: false,
        created_at,
    };

    const input_name = {
        project:
            document.getElementById("task_project").options[
                document.getElementById("task_project").selectedIndex
            ].innerText,
        task: document.getElementById("task_title").value,
        assignedTo:
            document.getElementById("task_assigned_to").options[
                document.getElementById("task_assigned_to").selectedIndex
            ].innerText,
        priority: document.getElementById("priority").value,
        status: false,
        created_at,
    };

    if (input.project === "" || input.task === "" || input.priority === "") {
        return alert("Please fill properly");
    }
    tasklist.push({ ...input_name, id });
    updateLocalStorage();
    reRenderData();
    document.getElementById("taskform").reset();

    $.post(
        // "/tasks/store",
        app_url + "/store",
        {
            _token: $('meta[name="csrf-token"]').attr("content"),
            name: input.task,
            user_id: input.assignedTo,
            project_id: input.project,
            priority: input.priority,
        },
        function (data, status) {
            // alert("Data: " + data + "\nStatus: " + status);
            // location.reload();
            console.log("libne 560", tasklist);
        }
    );
};

const openTask = (e) => {
    if (!e) e = window.event;
    let getTask = tasklist.find(({ id }) => id == e.target.id);
    taskmodal.innerHTML = htmlModalContent(getTask);
};
const openWarning = (e) => {
    console.log(e.target.id, "open warnin");
    if (!e) e = window.event;
    selectedTaskId = e.target.id;

    let getTask = tasklist.find(({ id }) => id == e.target.id);
    warningmodal.innerHTML = htmlWarningModalContent(getTask);
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
    // {
    //     let statusgroup = document.getElementById("status_group");
    //     statusgroup.style.display = "block";
    //     let statustobeupdated = getTask.status;
    //     const radioButtons = statusgroup.querySelectorAll(".form-check-input");
    //     console.log(statustobeupdated, getTask);

    //     radioButtons.forEach((radioButton) => {
    //         if (radioButton.id == statustobeupdated.toString()) {
    //             radioButton.checked = true;
    //         }
    //     });
    // }
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
        console.log(
            optionToSelect,
            projectSelectElement,
            projectOptionToSelect,
            getTask
        );
    }
    //   assigned to
    {
        let assignedToSelectElement =
            document.getElementById("task_assigned_to");
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
    //const targetId = e.target.getAttribute("name");
    const targetId = selectedTaskId;

    const removeTask = tasklist.filter(({ id }) => id !== targetId);
    tasklist = removeTask;
    updateLocalStorage();
    reRenderData();
    // console.log("delete", tasklist);

    $.post(
        // "/tasks/delete",
        app_url + "/delete",
        {
            _token: $('meta[name="csrf-token"]').attr("content"),
            id: targetId,
        },
        function (data, status) {
            // alert("Data: " + data + "\nStatus: " + status);
            location.reload();
        }
    );
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
        project:
            document.getElementById("task_project").options[
                document.getElementById("task_project").selectedIndex
            ].innerText,
        task: document.getElementById("task_title").value,
        assignedTo:
            document.getElementById("task_assigned_to").options[
                document.getElementById("task_assigned_to").selectedIndex
            ].innerText,
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

    $.post(
        // "/tasks/update",
        app_url + "/update",
        {
            _token: $('meta[name="csrf-token"]').attr("content"),
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
        }
    );
};

const htmlModalContent = ({
    id,
    project,
    task,
    assignedTo,
    created_at,
    started_on,
    closed_on,
    assigned_on,
    priority,
    status,
}) => {
    // console.log("modal open", date, priority);
    return `    
	<div id=${id} class="d-flex flex-column gap-1" >
		<strong class="text-sm text-muted">Created on ${created_at}</strong>
		<h2 class="my-3">Project : ${project}</h2>
		<p class="lead">Task : ${task}</p>
		<p class="lead">Priority : 
        <span class="badge bg-${priority == 0 ? "secondary" : "secondary"} m-1">
        ${priority == 1 ? "High" : ""}
  </span>
      </p>
    
    <p class="lead">Status : 
 
    ${
        status == 1
            ? `<i style="color:orange; display:inline-block;" class="fa-solid fa-circle-check" id="${id}" name="${status}"  onclick="editStatus.apply(this, arguments)"></i>   <span style="padding">${started_on}</span>,<span>Done </span>`
            : status == 2
            ? `<i style="color:#27ad5f; display:inline-block; " class="fa-solid fa-circle-check" id="${id}" name="${status}"  onclick="editStatus.apply(this, arguments)"></i>   <span>${closed_on}</span>,<span>Closed </span>`
            : `<i style="color:lightgray; display:inline-block;" class="fa-solid fa-circle-check" id="${id}" name="${status}"  onclick="editStatus.apply(this, arguments)"></i>   <span>${assigned_on}</span>,<span>Assigned </span>`
    }
    </span>
        </p>
		<p class="lead">Assigned to : ${assignedTo}</p>
	</div>
    `;
};
const htmlWarningModalContent = ({
    id,
    project,
    task,
    assignedTo,
    created_at,
    started_on,
    closed_on,
    assigned_on,
    priority,
    status,
}) => {
    // console.log("modal open", date, priority);
    return `    
	   <div>
      <span>Are you sure you want to <span id="WarningOperation" style="color: red">
        Delete
        </span> this task 
        <span id="WarningTask"><b>
      ${task}
        </b></span> of project 
        <span id="WarningProject"><b>
     ${project}
        </span></b>?
      </span>
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
    reRenderData();
    // console.log("update intial data called");
};
const updateSelectedTask = (e) => {
    if (!e) e = window.event;
    const targetId = e.target.getAttribute("name");
    selectedTaskId = targetId;
    console.log("updateSelectedTask Called", targetId);
};

const editStatus = (e) => {
    const targetId = e.target.id;
    const status = e.target.getAttribute("name");
    const is_manager = $("#is_manager").val();

    // console.log("editStatus Called targetId "+targetId+" targetName "+status+' is_manager '+is_manager);

    $.get(
        app_url + "/change_status",
        {
            // _token: $('meta[name="csrf-token"]').attr("content"),
            id: targetId,
            status: status,
            is_manager: is_manager,
        },
        function (data, status) {
            if (status == "success") {
                // let statusToggle = document.getElementById("statusToggle i").style;
                const dataObj = JSON.parse(data);
                // alert(dataObj.status);
                if (dataObj.status == 0) {
                    var color = "lightgray";
                    var tooltip = "Assigned";
                } else if (dataObj.status == 1) {
                    var color = "orange";
                    var tooltip = "Started";
                } else {
                    var color = "#27ad5f";
                    var tooltip = "Closed";
                }
                e.target.style.color = color;
                e.target.setAttribute("name", dataObj.status);
                $(e.target).parent().next().text(dataObj.date);
                $(e.target).parent().next().next().text(tooltip);
                // reRenderData();
            }
            // console.log("Data: " + data + "\nStatus: " + status);
            // location.reload();
        }
    );
};

const checkManager = (e) => {
    console.log("editStatus Called", isManager);
};
