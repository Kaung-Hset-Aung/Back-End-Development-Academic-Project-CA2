document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("token");
    const url = new URL(document.URL);
    const urlParams = url.searchParams;
    const messageId = urlParams.get("id");

    
    const verifyCallBack = (verifyStatus, verifyData) => {
        console.log("Verify Status", verifyStatus);
        console.log("Verify Data", verifyData);
        


        const updateForm = document.getElementById("updateNewMesForm");
        const warningCard = document.getElementById("warningCard");
        const warningText = document.getElementById("warningText");
        const successCard = document.getElementById("successCard");
        const successText = document.getElementById("successText");
    
        const getmessagebyIdCallBack = (getStatus, getData) => {
            console.log(getData)
            const oldInfo = document.getElementById("oldInfo")
            oldInfo.innerText = `
            Message ID : ${getData.id}
            User ID : ${getData.user_id}
            Message : ${getData.message_text}
            Last update : ${getData.created_at}

            `

        }
        fetchMethod(currentUrl + `/api/messages/${messageId}`, getmessagebyIdCallBack, "GET", null, null);
        updateForm.addEventListener("submit", function(event){
            event.preventDefault();
     
            console.log(messageId)
            const message = document.getElementById("message_text").value;
       

            const data = {
                message : message
            }

            


            const updateUserCallBack =( (updateStatus, updateData) => {
                console.log("updateStatus:", updateStatus);
                console.log("updateData:", updateData);
                
                if (updateStatus == 200) {
                    warningCard.classList.add('d-none');
                    successCard.classList.remove('d-none');
                    successText.innerText = `Message updated from ${updateData[0][0].message_text} to ${updateData[2][0].message_text}`
                    setTimeout(() => {
                        location.reload();
                    }, 3000);
                }
                else {
                    warningCard.classList.remove('d-none');
                    successCard.classList.add('d-none');
                    warningText.innerText = `${updateData.message}`
                }
            
            })
            fetchMethod(currentUrl + `/api/messages/${messageId}`, updateUserCallBack, "PUT", data);
            updateForm.reset()
    
        })
    }
    fetchMethod(currentUrl + '/api/jwt/verify', verifyCallBack, "GET", null, token);
    
});