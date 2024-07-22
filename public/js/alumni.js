document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("token");

    const verifyCallBack = (verifyStatus, verifyData) => {
        console.log("Verify Status", verifyStatus);
        console.log("Verify Data", verifyData);

        
            const allAlumniCallBack = (alumniStatus, alumniData) => {
                console.log(alumniData);
                console.log(alumniStatus);

                if (alumniStatus === 200) {
                    const progressListBody = document.getElementById("progressListBody");
                    // progressListBody.innerHTML = ""; // Clear existing content
                    const alumniList = document.getElementById("alumniList");
                    const noalumniList = document.getElementById ("noalumniList")
                    if (alumniData.length === 0) {
                        alumniList.classList.add('d-none');
                        noalumniList.classList.remove('d-none');
                    } else {
                        alumniList.classList.remove ('d-none');
                        noalumniList.classList.add('d-none');
                    }
                    alumniData.forEach((data) => {
                        const row = document.createElement("tr");
                        row.innerHTML = `
                            <td>${data.alumni_id}</td>
                            <td>${data.student_id}</td>
                            <td>${data.username}</td>
                            <td>${data.ecoPoints}</td>
                            <td>${data.damage}</td>
                            <td>${data.total_score}</td>
                            <td>${data.house}</td>
                        `;
                        progressListBody.appendChild(row);
                    });
                }

            }
            fetchMethod(currentUrl + '/api/student/alumni', allAlumniCallBack, "GET", null);

            const goatDivv = document.getElementById("goatDivv");
            if (verifyStatus === 200 || verifyStatus === 201) {
                goatDivv.classList.remove ('d-none')
            const goatCallBack = (goatStatus, goatData) => {
                console.log("goat", goatData);
                console.log(goatStatus);

                const goat = document.getElementById('goat');
                if (goatStatus === 200) {
                    const goatDivData = document.createElement('div');
                    goatDivData.className = "col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-12 p-3 mx-auto card bg-white reduceOpac";
                    const goatname = goatData[0].username.toUpperCase()
                    goatDivData.innerHTML = `
                    <h2 class ="text-warning">${goatname}</h2>
                    <strong>
                    Alumni ID : ${goatData[0].alumni_id} <br>
                    Student ID : ${goatData[0].student_id} <br>
                    Eco Points : ${goatData[0].ecoPoints} <br>
                    Damage : ${goatData[0].damage} <br>
                    Total Score : ${goatData[0].total_score} <br>
                    House : ${goatData[0].house} <br>
                    </strong>
                    `
                    goat.appendChild(goatDivData)
                }
                
            }
            fetchMethod(currentUrl + '/api/student/alumni/goat', goatCallBack, "GET", null);

        } else {
            goatDivv.classList.add('d-none')
        }
    }
    fetchMethod(currentUrl + '/api/jwt/verify', verifyCallBack, "GET", null, token);
    });