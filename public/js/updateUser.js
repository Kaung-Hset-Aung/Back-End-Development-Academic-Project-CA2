document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("token");

    
    const verifyCallBack = (verifyStatus, verifyData) => {
        console.log("Verify Status", verifyStatus);
        console.log("Verify Data", verifyData);
        
        const userId = document.getElementById("userId")
        userId.innerText = `${verifyData.userId}`


        const updateForm = document.getElementById("updateForm");
        const warningCard = document.getElementById("warningCard");
        const warningText = document.getElementById("warningText");
        const successCard = document.getElementById("successCard");
        const successText = document.getElementById("successText");
    
        updateForm.addEventListener("submit", function(event){
            event.preventDefault();
    
            const username = document.getElementById("username").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            const data = {
                username : username,
                email : email,
                password : password,
            }

            const updateUserCallBack =( (updateStatus, updateData) => {
                console.log("updateStatus:", updateStatus);
                console.log("updateData:", updateData);
                
                if (updateStatus == 200) {
                    warningCard.classList.add('d-none');
                    successCard.classList.remove('d-none');
                    successText.innerText = `Information for user ${updateData.user_id} successfully updated`
                    
                }
                else {
                    warningCard.classList.remove('d-none');
                    successCard.classList.add('d-none');
                    warningText.innerText = `${updateData.message}`
                }
            
            })
            fetchMethod(currentUrl + `/api/users/${verifyData.userId}`, updateUserCallBack, "PUT", data);
            updateForm.reset()
    
        })
    }
    fetchMethod(currentUrl + '/api/jwt/verify', verifyCallBack, "GET", null, token);
    
});