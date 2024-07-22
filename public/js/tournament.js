document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("token");
    let studentIdd;
    let usernamee;

    const verifyCallBack = (verifyStatus, verifyData) => {
        console.log("Verify Status", verifyStatus);
        console.log("Verify Data", verifyData);
        const loggedIn = document.getElementById("loggedIn");

        const getStudentIdCallBack = (getStatus, getData) => {
            console.log("getData", getData)
            if(getStatus === 200 || getStatus === 201) {
                studentIdd = getData.student_id
                usernamee = getData.username
                console.log(studentIdd)
            }

            const regListCallBack = (regStatus, regData) => {
                console.log(regStatus);
                console.log(regData);
                let registrants = [];
                if (regStatus === 200 || regStatus === 201) {
                    console.log('registrant', registrants);
                    regData.forEach((data) => {
                        registrants.push(data.user_id);
                        const row = document.createElement("tr");
                        row.innerHTML = `
                            <td>${data.registration_id}</td>
                            <td>${data.student_id}</td>
                            <td>${data.username}</td>
                            <td>${data.house}</td>
                            <td>
                                <a class="btn btn-warning oneself">Challenge Opponent</a>
                                <p class="oneself1 text-secondary">You cannot challenge yourself</p>
                                <p class="status"></p> <!-- Add this line for status -->
                            </td>
                        `;
                        participantListBody.appendChild(row);

                        const oneself = row.querySelector(".oneself");
                        const oneself1 = row.querySelector(".oneself1");

                        console.log('jwt user_id', verifyData.userId);
                        if (data.user_id === verifyData.userId) {
                            console.log('data.user_id:', data.user_id);
                            console.log('verifyData.userId:', verifyData.userId);

                            oneself.classList.add('d-none');
                            oneself1.classList.remove('d-none');
                            studentIdd = data.student_id;
                            usernamee = data.username
                            console.log("line 40", studentIdd);
                        } else {
                            oneself.classList.remove('d-none');
                            oneself1.classList.add("d-none");
                        }

                        oneself.addEventListener('click', function (event) {
                            event.preventDefault();
                            const postTournamentCallBack = (postTourStatus, postTourData) => {
                                console.log("line60", postTourData);
                                console.log("line61", postTourStatus)
                                const notify = document.getElementById("notify")
                                notify.classList.remove("d-none");
                                const notified = document.createElement("div")
                                notified.classList.add("popup-container")
                                notified.innerHTML = `
                                    <div class="popup-container">
                                        <div class="popup">
                                            <div class="popuptext">
                                                <p class="text-center"><h3 id='status'></h3></p>
                                                <p class="text-center">${postTourData.message}</p>
                                                <div class="button-container">
                                                    <button class="btn btn-success" id="okButton">OK</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>`;

                                    if (postTourStatus === 201 || postTourStatus === 200) {
                                        notify.classList.remove("text-danger")
                                        notify.classList.add("text-success")
                                        
                                    } else {
                                        notify.classList.add("text-danger")
                                        notify.classList.remove("text-success")
                                        
                                    }
                                    notify.appendChild(notified);
                                    const okButton = document.getElementById("okButton");
                                    okButton.addEventListener("click", () => {
                                        window.location.reload()
                                    });
                            }
                            fetchMethod(currentUrl + `/api/tournament/p1/${studentIdd}/p2/${data.student_id}`, postTournamentCallBack, "POST", null, null);
                        })
                    })
                }

                if (verifyStatus === 200 && registrants.includes(verifyData.userId)) {
                    loggedIn.classList.remove('d-none');
                } else {
                    loggedIn.classList.add('d-none');
                    if (verifyStatus === 200) {
                        const notRegisDiv = document.getElementById('notRegisDiv');
                        const notRegis = document.createElement('div')
                        notRegis.innerHTML = `
                            <div id="notRegis" class="col-md-8 mx-auto card" style="background-color: rgba(255, 255, 255, 0.3);">
                                <h3><a href="registerTournament.html?student_id=${studentIdd}&username=${usernamee}">Please register to see the opponents</a></h3>
                            </div>`
                        notRegisDiv.appendChild(notRegis);
                    }
                }
            }

            fetchMethod(currentUrl + '/api/tournament/registration', regListCallBack, "GET", null, null);
        }

        fetchMethod(currentUrl + `/api/users/${verifyData.userId}`, getStudentIdCallBack, "GET", null, null);

        const recordCallBack = (recStatus, recData) => {
            console.log(recStatus);
            console.log(recData);

            if (recStatus === 200 || recStatus === 201) {
                const progressListBody = document.getElementById("progressListBody");
                progressListBody.innerHTML = ""; // Clear existing content

                recData.forEach((data) => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${data.tournament_id}</td>
                        <td>${data.player1_id}</td>
                        <td>${data.player1_EcoPoint}</td>
                        <td>${data.player1_Damage}</td>
                        <td>${data.player2_id}</td>
                        <td>${data.player2_EcoPoint}</td>
                        <td>${data.player2_Damage}</td>
                        <td>${data.winner_id}</td>
                    `;
                    progressListBody.appendChild(row);
                })
            }
        }

        fetchMethod(currentUrl + '/api/tournament/records', recordCallBack, "GET", null, null);
    };

    fetchMethod(currentUrl + '/api/jwt/verify', verifyCallBack, "GET", null, token);
    console.log("last take", studentIdd)
});
