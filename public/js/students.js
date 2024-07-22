document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("token");

    const verifyCallBack = (verifyStatus, verifyData) => {
        console.log("Verify Status", verifyStatus);
        console.log("Verify Data", verifyData);


            const callback = (responseStatus, responseData) => {
                console.log("responseStatus:", responseStatus);
                console.log("responseData:", responseData);

            if (responseStatus === 200) {
                const studentList = document.getElementById("studentList");
                responseData.forEach((user) => {
                    const displayItem = document.createElement("div");
                    displayItem.className =
                        "col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-12 p-3";
                    displayItem.innerHTML = `
                                <div class="card text-center" style=" height : auto">
                                    <div class="card-body ">
                                        <h4 class="card-title">${user.username}</h4>
                                        <p class="card-text">
                                            Student Id : ${user.student_id} <br>
                                            User Id : ${user.user_id} <br>
                                            User Name : ${user.username} <br>
                                            Email : ${user.email}<br>
                                            Assigned House : ${user.house}
                                        </p>
                                        ${user.user_id === verifyData.userId ? `
                                        <a href="spells.html?student_id=${user.student_id}&username=${user.username}" class="btn btn-warning"><b>Spells</b></a><br>
                                        <a href="registerTournament.html?student_id=${user.student_id}&username=${user.username}" class="btn btn-info mt-2"><b>Register Tournament</b></a><br>
                                        <a class ="btn btn-success mt-2 graduate"><b>Propose Graduation</b></a>
                                    
                                        ` : ""}
                                    </div>
                                </div>
                                `;
                                studentList.appendChild(displayItem);
                                const graduate = displayItem.querySelector(".graduate");
                                if (graduate) {
                                    graduate.addEventListener('click', function(event){
                                    event.preventDefault(); 
    
                                   
                                    const graduateCallBack = (graduateStatus, graduateData) => {
                                        console.log(graduateStatus)
                                        console.log(graduateData)
    
                                        let status = '';
                                        if (graduateStatus === 201) {
                                            status = 'Congratulations'
                                        } else status = 'Sorry'
                                      
                                        const notify = document.getElementById("notify");
                                        notify.classList.remove("d-none");
                                        const notified = document.createElement("div")
                                        notified.innerHTML = `
                                        <div class="popup-container">
                                        <div class="popup">
                                            <div class="popuptext">
                                                
                                                <p class="text-center"><h3>${status}</h3></p>
                                                ${graduateData.message}
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
    
                                        
                                    }
                                    fetchMethod(currentUrl + `/api/student/graduate/${user.student_id}`, graduateCallBack, "POST", null, null);
                                
                                });

                                }
                        


                            });
                            // const deleteUser = document.getElementById("deleteUser");
                            // deleteUser.addEventListener("click", () => {
                            //     // Close the popup or perform any other actions
                            //     window.location.reload()
                            // });
            } else {
                console.error("Error fetching user data:", responseData);
            }
        };

        fetchMethod(currentUrl + "/api/student", callback);
    };

    fetchMethod(currentUrl + '/api/jwt/verify', verifyCallBack, "GET", null, token);
});
