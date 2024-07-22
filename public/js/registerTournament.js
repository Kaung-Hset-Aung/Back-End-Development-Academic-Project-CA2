document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("token");
    const url = new URL(document.URL);
    const urlParams = url.searchParams;
    const studenttttId = urlParams.get("student_id");
    console.log(studenttttId)
    const usernameeeee = urlParams.get("username");
                    // const learnASpellId = document.getElementById("learnASpellId")


    const verifyCallBack = (verifyStatus, verifyData) => {
        console.log("Verify Status", verifyStatus);
        console.log("Verify Data", verifyData);
        if (verifyStatus === 200 || verifyStatus === 201) {
           

            const listCallBack = (listStatus, listData) => {
                console.log("listStatus", listStatus);
                console.log("listData", listData);

           
                const have = document.getElementById("have");
                const nohave = document.getElementById("nohave");
                const learnASpellId = document.getElementById("learnASpellId")
                if (listData.total_damage > 10) {
                    have.classList.remove('d-none');
                    nohave.classList.add('d-none')
                } else if(listData.total_damage < 0) {
                    have.classList.add('d-none');
                    nohave.classList.remove('d-none');
                    learnASpellId.href = `spells.html?student_id=${studenttttId}`;
                }

                const anchor = document.createElement("a");
                anchor.id = "learnASpellId";
                anchor.href = `spells.html?student_id=${studenttttId}`;
                anchor.classList.add("btn", "btn-warning", "btn-block");
                anchor.textContent = "Learn a spell";
                
                nohave.appendChild(anchor);             
                const greetName = document.getElementById("greetName")
                const name = `${usernameeeee}`
                greetName.innerText =  name.toUpperCase()
                if (listStatus === 200) {
                    
                    console.log(listData.total_damage);
                   
             
                    // const progressListBody = document.getElementById("progressListBody");
                    // progressListBody.innerHTML = "";
            
                    // listData.forEach((data) => {
                    //     const row = document.createElement("tr");
                    //     row.innerHTML = `
                    //         <td>${data.user_id}</td>
                    //         <td>${data.username}</td>
                    //         <td>${data.email}</td>
                    //         <td>${data.house}</td>
                    //         <td>${data.completion_date}</td>
                    //     `;
                    //     progressListBody.appendChild(row);
                    // });
                } 

                const enrollData = document.getElementById("enrollInfo");
                enrollData.innerText = `
                    User ID : ${listData.user_id}
                    Student ID : ${listData.student_id}
                    Username : ${listData.username}
                    Email :  ${listData.email}
                    Total damage Points :  ${listData.total_damage}
                    House : ${listData.house}
                `
                const data = {
                    user_id : listData.user_id,
                    username : listData.username,
                    email : listData.email,
                    house : listData.house,
                    student_id : listData.student_id,
                    total_damage : listData.total_damage
                }
                const proceed = document.getElementById("proceed");
                proceed.addEventListener ("click", function(event) {
                    const enrollCallBack = (enrollStatus, enrollData) => {
                        console.log(enrollStatus);
                        console.log(enrollData);
                        const notify = document.getElementById("notify")
                        if (enrollStatus === 201 ) {
                            notify.classList.remove("d-none");
                            // warningCard.classList.add("d-none")
                           notify.classList.remove("text-danger")
                            notify.classList.add("text-success")
    
                            const notified = document.createElement("div")
                            notified.innerHTML = `
                            <div class="popup-container">
                            <div class="popup">
                                <div class="popuptext">
                                    <p class="text-center"><h3>Congratulations!</h3></p>
                                    <p class="text-center">${enrollData.message}</p>
                                    <div class="button-container">
                                        <button class="btn btn-success" id="okButton">OK</button>
                                    </div>
                                </div>
                            </div>
                        </div>`;
                        notify.appendChild(notified);
                    
                            const okButton = document.getElementById("okButton");
                            okButton.addEventListener("click", () => {
                                window.location.href="tournament.html"
                            });
                        } else {
                            notify.classList.remove("d-none");
                            // warningCard.classList.add("d-none")
                           notify.classList.remove("text-danger")
                            notify.classList.add("text-success")
                            const notified = document.createElement("div")
                            notified.innerHTML = `
                            <div class="popup-container">
                            <div class="popup">
                                <div class="popuptext">
                                    <p class="text-center">${enrollData.message}</p>

                                    <div class="button-container">
                                        <button class="btn btn-warning" id="okButton">OK</button>
                                    </div>
                                </div>
                            </div>
                        </div>`;
                        notify.appendChild(notified);
                    
                        const okButton = document.getElementById("okButton");
                        okButton.addEventListener("click", () => {
                            // Close the popup or perform any other 
                            window.location.href="tournament.html"
                           
                            });
                                    }
                    }
                    fetchMethod(currentUrl + `/api//tournament/registration/${data.student_id}`, enrollCallBack, "POST", data)
                })       
            };
            fetchMethod(currentUrl + `/api/learn/student_id/${studenttttId}`, listCallBack, "GET", null, null);
        }
    }
    fetchMethod(currentUrl + '/api/jwt/verify', verifyCallBack, "GET", null, token);
    });