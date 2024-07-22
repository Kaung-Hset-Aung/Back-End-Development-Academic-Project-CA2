document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("token");

    const verifyCallBack = (verifyStatus, verifyData) => {
        console.log("Verify Status", verifyStatus);
        console.log("Verify Data", verifyData);
        if (verifyStatus === 200 || verifyStatus === 201) {
           

            const listCallBack = (listStatus, listData) => {
                console.log("listStatus", listStatus);
                console.log("listData", listData);

                const haveTaskOrNot = document.getElementById("haveTaskOrNot")
                const have = document.getElementById("have");
                const nohave = document.getElementById("nohave");
                if (listData[1][0].total_points > 0) {
                    haveTaskOrNot.classList.remove('d-none');
                    have.classList.remove('d-none');
                    nohave.classList.add('d-none')
                } else if(listData[1][0].total_points === 0) {
                    haveTaskOrNot.classList.add('d-none')
                    have.classList.add('d-none');
                    nohave.classList.remove('d-none');
                }

                const greetName = document.getElementById("greetName")
                const name = `${listData[1][0].username}`
                greetName.innerText =  name.toUpperCase()
                if (listStatus === 200) {
                    const totalPts = document.getElementById("totalPts");
                    console.log(listData[1][0].total_points);
                    totalPts.innerText = `
                        Total points gained : ${listData[1][0].total_points}
                    `;
            
                    const progressListBody = document.getElementById("progressListBody");
                    progressListBody.innerHTML = "";
            
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

                const enrollData = document.getElementById("enrollInfo");
                enrollData.innerText = `
                    User ID : ${listData[1][0].user_id}
                    Username : ${listData[1][0].username}
                    Email :  ${listData[1][0].email}
                    Total eco points :  ${listData[1][0].total_points}
                `
                const data = {
                    user_id : listData[1][0].user_id,
                    username : listData[1][0].username,
                    email : listData[1][0].email
                }
                     
            };
            fetchMethod(currentUrl + `/api/task_progress/users/${verifyData.userId}`, listCallBack, "GET", null, null);


            const deleteUser = document.getElementById('deleteUser')
            deleteUser.addEventListener ("click", function(event) {
                event.preventDefault()

                const deleteUserCB = (delStatus, delData) => {
                    if (delStatus === 204) {
                        const delnotice =document.getElementById('delnotice')
                        delnotice.classList.remove("d-none")
                        delnotice.innerText = `User deleted`
                        localStorage.removeItem("token");
                        setTimeout(() => {
                            window.location.href='register.html'
                        }, 1000)
                    }
                } 
                fetchMethod(currentUrl + `/api/users/${verifyData.userId}`, deleteUserCB, "DELETE", null, null);


            })

        }
    }
    fetchMethod(currentUrl + '/api/jwt/verify', verifyCallBack, "GET", null, token);
    });