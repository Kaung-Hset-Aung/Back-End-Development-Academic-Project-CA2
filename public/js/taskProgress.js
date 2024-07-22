document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("token");

    const verifyCallBack = (verifyStatus, verifyData) => {
        console.log("Verify Status", verifyStatus);
        console.log("Verify Data", verifyData);

        const userId = document.getElementById("taskProgressUserId")
        const userIdDiv =document.createElement("div")
        userIdDiv.innerHTML=`
        <h4>User ID : ${verifyData.userId}</h4> 
       
        `
        userId.appendChild(userIdDiv)
        const task_id = document.getElementById("taskId").value;
        const notes = document.getElementById("notes").value;

        const addTaskProgressButton = document.getElementById('addTaskProgressButton');
            addTaskProgressButton.addEventListener('click', (event) => {    
                event.preventDefault(); // Prevent form submission

                const task_id = document.getElementById("taskId").value;
                const comDate = document.getElementById("comDate").value;
                const notes = document.getElementById("notes").value;

                const data = {
                    user_id : verifyData.userId,
                    task_id : task_id,
                    completion_date : comDate,
                    notes : notes
                };


                const addTaskProgressCallBack = (addTaskStatus, addTaskData) => {
                    console.log("addTaskStatus", addTaskStatus);
                    console.log("addTaskData", addTaskData);
                    const warningCard = document.getElementById("warningCard");
                    const warningText = document.getElementById("warningText");
                    const notify = document.getElementById("notify");

                    if (addTaskStatus === 200 || addTaskStatus === 201) {
                        notify.classList.remove("d-none");
                        warningCard.classList.add("d-none")
                       notify.classList.remove("text-danger")
                        notify.classList.add("text-success")

                        const notified = document.createElement("div")
                        notified.innerHTML = `
                        <div class="popup-container">
                        <div class="popup">
                            <div class="popuptext">
                                <p class="text-center"><h1>Congratulations!</h1></p>
                                <p class="text-center"><h3>You have completed a new task</h3></p>
                                Progress ID : ${addTaskData.progress_id}<br>
                                User ID : ${addTaskData.user_id}<br>
                                Task ID : ${addTaskData.task_id}<br>
                                Completion Date : ${addTaskData.completion_date}<br>
                                Notes : ${addTaskData.notes}<br>
                                <div class="button-container">
                                    <button class="btn btn-success" id="okButton">OK</button>
                                </div>
                            </div>
                        </div>
                            </div>`;
                        notify.appendChild(notified);
                
                        const okButton = document.getElementById("okButton");
                        okButton.addEventListener("click", () => {
                            // Close the popup or perform any other actions
                            window.location.reload()
                        });

                    } else {
                        warningCard.classList.remove("d-none")
                        warningCard.classList.add("text-danger")
                        warningCard.classList.add("card")
                        warningCard.classList.add("border-danger")
                        warningText.innerText = addTaskData.message;
                      }
                };

                fetchMethod(currentUrl + '/api/task_progress', addTaskProgressCallBack, "POST", data);
                postTaskProgressForm.reset()

            });

            const listCallBack = (listStatus, listData) => {
                console.log("listStatus", listStatus);
                console.log("listData", listData);

                const haveTaskOrNot = document.getElementById("haveTaskOrNot")
                if (listData[1][0].total_points > 0) {
                    haveTaskOrNot.classList.remove('d-none');
                } else if(listData[1][0].total_points === 0) {
                    haveTaskOrNot.classList.add('d-none')
                }

                const greetName = document.getElementById("greetName")
                const name = `${listData[1][0].username}`
                greetName.innerText =  name.toUpperCase()
                if (listStatus === 200) {
                    const totalPts = document.getElementById("totalPts");
                    console.log(listData[1][0].total_points);
                    totalPts.innerText = `
                        User Name : ${listData[1][0].username} 
                        Email : ${listData[1][0].email} 
                        Total points gained : ${listData[1][0].total_points}
                    `;
            
                    const progressListBody = document.getElementById("progressListBody");
                    progressListBody.innerHTML = ""; // Clear existing content
            
                    listData[0].forEach((data) => {
                        const row = document.createElement("tr");
                        row.innerHTML = `
                            <td>${data.progress_id}</td>
                            <td>${data.task_id}</td>
                            <td>${data.title}</td>
                            <td>${data.points}</td>
                            <td>${data.completion_date}</td>
                        `;
                        progressListBody.appendChild(row);
                    });
                } 
            };
            
            fetchMethod(currentUrl + `/api/task_progress/users/${verifyData.userId}`, listCallBack, "GET", null, null);
            
            fetchMethod (currentUrl + `/api/task_progress/users/${verifyData.userId}`, listCallBack, "GET", null, null);
    };
    

    fetchMethod(currentUrl + '/api/jwt/verify', verifyCallBack, "GET", null, token);
});
