document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("token");

    const verifyCallBack = (verifyStatus, verifyData) => {
        console.log("Verify Status", verifyStatus);
        console.log("Verify Data", verifyData);
        const messageCallBack = (responseStatus, responseData) => {
            console.log('responseData', responseData);
            const messList = document.getElementById("messList");

            if (responseStatus === 200) {
                responseData.forEach((messages) => {
                    const displayItem = document.createElement("div");
                    var name = messages.username.toUpperCase()
                    console.log(name)
                    displayItem.className = "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 p-3";
                    displayItem.innerHTML = `
                        <div class="card reduceOpac mx-auto">
                            <div class="card-body">
                                <h4 class="card-title"><b class="text-success">${name}</b> posted:</h4>
                                <div class="card-text border-success">
                                    <h5>${messages.message_text}</h5>
                                    on ${messages.created_at}
                                </div>
                                ${messages.user_id === verifyData.userId ? `
                                <div class="d-flex justify-content-end mt-2">
                                    <a href=updateMessage.html?id=${messages.id}><button id="editMes" type="submit" class="btn btn-warning me-2">Edit</button></a>
                                    <button id="deleteMes" data-message-id="${messages.id}" type="button" class="btn btn-danger">Delete Message</button>
                                </div>` : ""}
                            </div>
                        </div>`;

                    messList.appendChild(displayItem);

                    // Add event listener for delete button
                    const deleteButton = displayItem.querySelector('#deleteMes');
                    if (deleteButton) {
                        deleteButton.addEventListener('click', function () {
                            const messageId = this.getAttribute('data-message-id');
                            handleDelete(messageId, verifyData.userId);
                        });
                    }
                });
            }
        }

        fetchMethod(currentUrl + '/api/messages', messageCallBack, "GET", null);
        
        const postMess = document.getElementById("postMess");

        if (verifyStatus === 200 || verifyStatus === 201) {
            postMess.classList.remove("d-none");
            const postNewMesForm = document.getElementById("postNewMesForm");
            postNewMesForm.addEventListener('submit', function (event) {
                event.preventDefault();
                const message = document.getElementById("message_text").value

                const data = {
                    message: message,
                    user_id: verifyData.userId
                }
                const postMessCallBack = (postStatus, postData) => {
                    console.log(postData)
                    console.log(postStatus)
                    window.location.reload();
                }
                fetchMethod(currentUrl + `/api/messages/${verifyData.userId}`, postMessCallBack, "POST", data);
                postNewMesForm.reset();
            });
        } else {
            postMess.classList.add("d-none");
        }

        function handleDelete(messageId, userId) {
            const deleteMessCallBack = (deleteStatus, deleteData) => {
                console.log(deleteData);
                console.log(deleteStatus);
                window.location.reload();
            }
            fetchMethod(currentUrl + `/api/messages/${messageId}`, deleteMessCallBack, "DELETE", null);
        }
    };

    fetchMethod(currentUrl + '/api/jwt/verify', verifyCallBack, "GET", null, token);
});
