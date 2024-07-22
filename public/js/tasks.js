document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("token");

    const verifyCallBack = (verifyStatus, verifyData) => {
        console.log("Verify Status", verifyStatus);
        console.log("Verify Data", verifyData);

        const callback = (responseStatus, responseData) => {
            console.log("responseStatus:", responseStatus);
            console.log("responseData:", responseData);

            if (responseStatus === 200) {
                const taskList = document.getElementById("taskList");
                responseData.forEach((task) => {
                    const displayItem = document.createElement("div");
                    displayItem.className =
                        "col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12 p-3";
                    displayItem.innerHTML = `
                        <div class="card text-center reduceOpac">
                            <div class="card-body ">
                                <h4 class="card-title">Task ID : ${task.task_id}</h4>
                                <p class="card-text">
                                    Task Title : ${task.title} <br>
                                    Task Description : ${task.description} <br>
                                    Points : ${task.points}
                                </p>
                            </div>
                        </div>
                    `;
                    taskList.appendChild(displayItem);
                });
            } else {
                console.error("Error fetching task data:", responseData);
            }
        };

        if (verifyStatus === 200 || verifyStatus === 201) {
            const addTaskDiv = document.getElementById("addTaskDiv");
            const addTaskForm = document.createElement("div");
            addTaskForm.className = "col-12 p-3";
            addTaskForm.innerHTML = `
            <div class="col-md-6 mx-auto">
            <h3 class="text-center">Add a new task</h3>
            <form id="addTaskForm">
                <div class="form-group pb-3">
                    <div class="d-flex justify-content-between">
                        <label for="title" class="text-start">Title:</label>
                        <div></div>
                    </div>
                    <input type="text" class="form-control" id="title" name="title" required>
                </div>
        
                <div class="form-group pb-3">
                    <div class="d-flex justify-content-between">
                        <label for="description" class="text-start">Description:</label>
                        <div></div>
                    </div>
                    <textarea class="form-control" id="description" name="description" rows="4" required></textarea>
                </div>
        
                <div class="form-group pb-3">
                    <div class="d-flex justify-content-between">
                        <label for="points" class="text-start">Points:</label>
                        <div></div>
                    </div>
                    <input type="number" class="form-control" id="points" name="points" required>
                </div>
        
                <button type="submit" id="addTaskButton" class="btn btn-success btn-block">Add Task</button>
            </form>
            <div id="warningMessage" class="mt-3"></div>
        </div>
        
            `;
            addTaskDiv.appendChild(addTaskForm);

            const addTaskButton = document.getElementById('addTaskButton');
            addTaskButton.addEventListener('click', (event) => {    
                event.preventDefault(); // Prevent form submission

                const title = document.getElementById('title').value;
                const description = document.getElementById('description').value;
                const points = parseFloat(document.getElementById('points').value); // Parse the value as an integer

                if (isNaN(points) || points <= 0 || !Number.isInteger(points) ) {
                    warningMessage.textContent = "Please enter a valid positive integer for points.";
                    warningMessage.classList.remove("text-success");
                    warningMessage.classList.add("text-danger");
                    return;
                }
                const data = {
                    title: title,
                    description: description,
                    points: points
                };

                const addTaskCallBack = (addTaskStatus, addTaskData) => {
                    console.log("addTaskStatus", addTaskStatus);
                    console.log("addTaskData", addTaskData);

                    const warningMessage = document.getElementById("warningMessage");

                    if (addTaskStatus === 201) {
                        warningMessage.textContent = "Task added successfully!";
                        warningMessage.classList.remove("text-danger");
                        warningMessage.classList.add("text-success");

                        setTimeout(() => {
                            window.location.reload()
                        }, 2000)
                    } else {
                        warningMessage.textContent = "Failed to add task. Please try again.";
                        warningMessage.classList.remove("text-success");
                        warningMessage.classList.add("text-danger");
                    }
                };

                fetchMethod(currentUrl + '/api/tasks/', addTaskCallBack, "POST", data);
            });
        }
        fetchMethod(currentUrl + "/api/tasks", callback);
    };

    fetchMethod(currentUrl + '/api/jwt/verify', verifyCallBack, "GET", null, token);
});
