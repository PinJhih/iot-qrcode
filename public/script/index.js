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
