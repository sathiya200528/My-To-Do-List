let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


/* =========================
   ADD TASK
========================= */

function addTask() {

    let input = document.getElementById("taskInput");
    let notesInput = document.getElementById("taskNotes");
    let dateInput = document.getElementById("taskDate");
    let priorityInput = document.getElementById("taskPriority");
    let categoryInput = document.getElementById("taskCategory");
    let otherInput = document.getElementById("otherCategory");


    let task = input.value.trim();
    let notes = notesInput.value.trim();
    let date = dateInput.value;
    let priority = priorityInput.value;
    let category = categoryInput.value;


    if (task === "") {
        alert("Please enter a task");
        return;
    }


    /* If Other is selected */

    if (category === "Other") {

        let customCategory = otherInput.value.trim();

        if (customCategory === "") {
            alert("Please enter your category");
            return;
        }

        category = customCategory;
    }


    let taskObject = {

        text: task,
        notes: notes,
        date: date,
        priority: priority,
        category: category,
        completed: false,
        important: false

    };


    tasks.push(taskObject);

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );


    displayTasks();


    /* Clear inputs */

    input.value = "";
    notesInput.value = "";
    dateInput.value = "";
    priorityInput.value = "Medium";
    categoryInput.value = "Study";

    otherInput.value = "";
    otherInput.style.display = "none";

}


/* =========================
   DISPLAY TASKS
========================= */

function displayTasks() {

    let taskList =
        document.getElementById("taskList");

    taskList.innerHTML = "";


    if (tasks.length === 0) {

        taskList.innerHTML =
            "<p>No tasks yet!</p>";

        return;
    }


    tasks.forEach(function(task, index) {

        let li =
            document.createElement("li");


        li.className =
            task.completed
                ? "task completed"
                : "task";


        /* Task name */

        let taskTitle =
            document.createElement("span");

        taskTitle.textContent =
            task.text;


        li.appendChild(taskTitle);


        /* Notes */

        if (task.notes !== "") {

            let notes =
                document.createElement("p");

            notes.textContent =
                "📝 " + task.notes;

            li.appendChild(notes);

        }


        /* Category */

        let category =
            document.createElement("p");

        category.textContent =
            "📌 Category: " + task.category;

        li.appendChild(category);


        /* Priority */

        let priority =
            document.createElement("p");

        priority.textContent =
            "Priority: " + task.priority;

        li.appendChild(priority);


        /* Date */

        if (task.date !== "") {

            let date =
                document.createElement("p");

            date.textContent =
                "📅 Due Date: " + task.date;

            li.appendChild(date);

        }


        /* Complete task */

        li.onclick = function() {

            task.completed =
                !task.completed;


            localStorage.setItem(
                "tasks",
                JSON.stringify(tasks)
            );


            displayTasks();

        };


        /* Delete button */

        let deleteButton =
            document.createElement("button");

        deleteButton.textContent =
            "Delete";


        deleteButton.onclick =
            function(event) {

                event.stopPropagation();


                tasks.splice(index, 1);


                localStorage.setItem(
                    "tasks",
                    JSON.stringify(tasks)
                );


                displayTasks();

            };


        li.appendChild(deleteButton);


        taskList.appendChild(li);

    });

}


/* =========================
   ENTER KEY
========================= */

document.getElementById(
    "taskInput"
).addEventListener(
    "keypress",
    function(event) {

        if (event.key === "Enter") {

            addTask();

        }

    }
);


/* =========================
   DARK MODE
========================= */

function toggleTheme() {

    document.body.classList.toggle("dark");


    let button =
        document.getElementById("themeButton");


    if (
        document.body.classList.contains("dark")
    ) {

        button.textContent =
            "☀️ Light Mode";


        localStorage.setItem(
            "theme",
            "dark"
        );

    }
    else {

        button.textContent =
            "🌙 Dark Mode";


        localStorage.setItem(
            "theme",
            "light"
        );

    }

}


/* =========================
   OTHER CATEGORY
========================= */

document.getElementById(
    "taskCategory"
).addEventListener(
    "change",
    function() {

        let category =
            this.value;


        let otherBox =
            document.getElementById(
                "otherCategory"
            );


        if (category === "Other") {

            otherBox.style.display =
                "block";

        }
        else {

            otherBox.style.display =
                "none";

            otherBox.value = "";

        }

    }
);


/* =========================
   LOAD SAVED TASKS
========================= */

displayTasks();