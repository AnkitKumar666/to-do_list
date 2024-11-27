const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const searchBox = document.getElementById("search-box");
const editPopup = document.getElementById("edit-popup");
const editInput = document.getElementById("edit-input");
let currentEditElement = null;

function addTask() {
    if (inputBox.value.trim() === '') {
        alert("You must write something");
    } else {
        let li = document.createElement("li");
        li.innerHTML = `<span class="task-text">${inputBox.value}</span>`;
        // menu dots 
        let dotsSpan = document.createElement("span");
        dotsSpan.className = "three-dots";
        dotsSpan.innerHTML = '&#x22EE;';
        li.appendChild(dotsSpan);
        // div for edit and delete to show them block wise
        let optionsDiv = document.createElement("div");
        optionsDiv.className = "options";
        optionsDiv.innerHTML = `
                    <span class="edit" onclick="showEditPopup(this)">Edit</span>
                    <span class="delete" onclick="deleteTask(this)">Delete</span>
                `;
        li.appendChild(optionsDiv);

        listContainer.appendChild(li);

        dotsSpan.addEventListener("click", function () {
            optionsDiv.style.display = optionsDiv.style.display === "none" || optionsDiv.style.display === "" ? "block" : "none";
        });

        inputBox.value = ''; // Clear the input box
    }
}
// delete button working 
function deleteTask(element) {
    element.parentElement.parentElement.remove();
}
// edit button working
function showEditPopup(element) {
    currentEditElement = element.parentElement.parentElement.querySelector(".task-text");
    editInput.value = currentEditElement.textContent;
    const rect = currentEditElement.getBoundingClientRect();
    editPopup.style.top = `${rect.top + window.scrollY}px`;
    editPopup.style.left = `${rect.left + window.scrollX}px`;
    editPopup.style.width = `${rect.width + 40}px`; // Match the width of the edit input to the task text
    editPopup.style.display = "block";
    editInput.focus();
}

function saveEdit() {
    if (currentEditElement) {
        currentEditElement.textContent = editInput.value;
        editPopup.style.display = "none";
        currentEditElement = null;
    }
}

searchBox.addEventListener("input", function () {
    const filter = searchBox.value.toLowerCase();
    const tasks = listContainer.getElementsByTagName("li");
    Array.from(tasks).forEach(function (task) {
        const taskText = task.querySelector(".task-text").textContent;
        if (taskText.toLowerCase().indexOf(filter) > -1) {
            task.style.display = "";
        } else {
            task.style.display = "none";
        }
    });
});

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
    } else if (e.target.tagName === "SPAN" && e.target.classList.contains("delete")) {
        e.target.parentElement.parentElement.remove();
    }
});

document.addEventListener("click", function (event) {
    if (!editPopup.contains(event.target) && !event.target.classList.contains("edit")) {
        editPopup.style.display = "none";
    }
});