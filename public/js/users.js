document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("token");

    const verifyCallBack = (verifyStatus, verifyData) => {
        console.log("Verify Status", verifyStatus);
        console.log("Verify Data", verifyData);


            const callback = (responseStatus, responseData) => {
                console.log("responseStatus:", responseStatus);
                console.log("responseData:", responseData);

            if (responseStatus === 200) {
                const userList = document.getElementById("userList");
                responseData.forEach((user) => {
                    const displayItem = document.createElement("div");
                    displayItem.className =
                        "col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-12 p-3";
                    displayItem.innerHTML = `
                        <div class="card text-center reduceOpac">
                            <div class="card-body ">
                                <h4 class="card-title">${user.username}</h4>
                                <p class="card-text">
                                    User Id : ${user.user_id} <br>
                                    User Name : ${user.username} <br>
                                    Email : ${user.email}
                                </p>
                                  ${user.user_id === verifyData.userId ? `
                                <a href="enroll.html?user_id=${user.user_id}" class="btn" style="background-color : #EBDBCD;"><b>Enroll to Magic Academy</b></a><br>
                                <a href="updateUser.html?user_id=${user.user_id}" class="btn btn-success mt-1">Update information</a><br>
                            
                                ` : ""}
                                </div>
                                </div>
                                `;
                                userList.appendChild(displayItem);
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

        fetchMethod(currentUrl + "/api/users", callback);
    };

    fetchMethod(currentUrl + '/api/jwt/verify', verifyCallBack, "GET", null, token);
});
