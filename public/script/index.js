async function GoToHomePage() {
    try {
        const response = await fetch("/", {
            method: "GET",
        });

        if (response.ok) {
            window.location.href = response.url;
        } else {
            const errorMessage = await response.text();
            alert(`Error: ${errorMessage}`);
        }
    } catch (error) {
        console.log("Error:", error);
        alert("An error occurred while trying to change page.");
    }
}

async function GoToActivityPage() {
    try {
        const response = await fetch("/api/activity", {
            method: "GET",
        });

        if (response.ok) {
            window.location.href = response.url;
        } else {
            const errorMessage = await response.text();
            alert(`Error: ${errorMessage}`);
        }
    } catch (error) {
        console.log("Error:", error);
        alert("An error occurred while trying to change page.");
    }
}

async function logout() {
    try {
        const response = await fetch("/api/logout", {
            method: "GET",
        });
    } catch (error) {
        console.error("Logout error:", error);
        alert("An error occurred while trying to logout.");
    }
    location.reload();
}

function genQrcode(id) {
    document.getElementById(`qrcode${id}`).innerHTML = "";
    var qrcode = new QRCode(`qrcode${id}`, `http://${window.location.host}/api/activity/join/${id}`);
    console.log("Generating QR code for activity ID: " + id);

    displayParticipants(id);
}


async function displayParticipants(id) {
    let url = `http://${window.location.host}/participants/${id}`;
    let elementID = `participants-${id}`;

    try {
        let res = await fetch(url);
        let participants = await res.text();
        console.log(participants);
        document.getElementById(elementID).innerHTML = participants;
    } catch (error) {
        alert(error);
    }
}

async function DeleteActivity(id) {
    try {
        const response = await fetch(`/api/activity/delete/${id}`, {
            method: "DELETE",
        });
        location.reload();
    } catch (error) {
        console.error("Exit error:", error);
        alert("An error occurred while trying to exit an activity.");
    }
}