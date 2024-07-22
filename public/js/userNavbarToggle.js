document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.getElementById("loginButton");
    const registerButton = document.getElementById("registerButton");
    const profileButton = document.getElementById("profileButton");
    const logoutButton = document.getElementById("logoutButton");
    const taskProgressButton = document.getElementById("taskProgressButton");
    const tma = document.getElementById("tma");
  
    // Check if token exists in local storage
    const token = localStorage.getItem("token");
    const verifyTokenCallback = (verifyStatus, verifyData) => {

      if (verifyStatus === 200 || verifyStatus === 201) {
        // Token exists, show profile button and hide login and register buttons
        loginButton.classList.add("d-none");
        registerButton.classList.add("d-none");
        profileButton.classList.remove("d-none");
        logoutButton.classList.remove("d-none");
        taskProgressButton.classList.remove("d-none");
        const getStudentIdCallBack = (getStatus, getData) => {
          console.log("getData", getData)
          if(getData.student_id !== null) {
            tma.classList.remove('d-none')
          } else {
            tma.classList.add('d-none');
          }
        } 
        fetchMethod(currentUrl +  `/api/users/${verifyData.userId}`, getStudentIdCallBack, "GET", null, null);
      } else {
        // Token does not exist, show login and register buttons and hide profile and logout buttons
        loginButton.classList.remove("d-none");
        registerButton.classList.remove("d-none");
        profileButton.classList.add("d-none");
        logoutButton.classList.add("d-none");
        taskProgressButton.classList.add("d-none");
        tma.classList.add("d-none")
      }
    
      logoutButton.addEventListener("click", function () {
        // Remove the token from local storage and redirect to index.html
        localStorage.removeItem("token");
        window.location.href = "index.html";
      }); 
    }
    fetchMethod(currentUrl + "/api/jwt/verify", verifyTokenCallback, "GET", null, token);
    // if (token) {
    //   // Token exists, show profile button and hide login and register buttons
    //   loginButton.classList.add("d-none");
    //   registerButton.classList.add("d-none");
    //   profileButton.classList.remove("d-none");
    //   logoutButton.classList.remove("d-none");
    //   taskProgressButton.classList.remove("d-none");
    // } else {
    //   // Token does not exist, show login and register buttons and hide profile and logout buttons
    //   loginButton.classList.remove("d-none");
    //   registerButton.classList.remove("d-none");
    //   profileButton.classList.add("d-none");
    //   logoutButton.classList.add("d-none");
    //   taskProgressButton.classList.add("d-none");
    // }
  
    // logoutButton.addEventListener("click", function () {
    //   // Remove the token from local storage and redirect to index.html
    //   localStorage.removeItem("token");
    //   window.location.href = "index.html";
    // });
  });