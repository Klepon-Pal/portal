// Bootstrap
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>

// Selecting elements
const statusIndicator = document.getElementById("status");
const btnStartService = document.getElementById("btnStartService");
const btnEndService = document.getElementById("btnEndService");
const agentStatus = document.getElementById("agentStatus");
const serviceDuration = document.getElementById("serviceDuration");
const reportsCount = document.getElementById("reportsCount");

let timer;
let seconds = 0;
let minutes = 0;
let hours = 0;

document.addEventListener("DOMContentLoaded", function () {
    const startServiceBtn = document.getElementById("startService");
    const endServiceBtn = document.getElementById("endService");

    // Initializing button colors
    startServiceBtn.style.backgroundColor = "#4CAF50"; // Green for Start Service
    endServiceBtn.style.backgroundColor = "#f44336"; // Red for End Service (default: out of service)

    // Function for Start Service
    startServiceBtn.addEventListener("click", function () {
        startServiceBtn.style.backgroundColor = "#4CAF50"; // Green
        endServiceBtn.style.backgroundColor = "#f44336"; // Red
        // Code to execute for "Start Service"
        console.log("Service taken");
    });

    // Function for End Service
    endServiceBtn.addEventListener("click", function () {
        startServiceBtn.style.backgroundColor = "#4285F4"; // Blue
        endServiceBtn.style.backgroundColor = "#f44336"; // Red
        // Code to execute for "End Service"
        console.log("Service completed");
    });
});

// Function to retrieve Discord user information
async function getUserInfo(token) {
    try {
        const response = await fetch("https://discord.com/api/v10/users/@me", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const userData = await response.json();
        if (userData.avatar) {
            const avatarURL = `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`;
            displayUserProfile(userData.username, avatarURL);
        } else {
            displayUserProfile(userData.username, "default-avatar.png"); // Default image if no avatar
        }
    } catch (error) {
        console.error("Error retrieving user data:", error);
    }
}

// Function to display user profile
function displayUserProfile(username, avatarURL) {
    const welcomeContainer = document.querySelector(".welcome-container");
    welcomeContainer.innerHTML = `
        <h2>Welcome, ${username}!</h2>
        <img src="${avatarURL}" alt="Profile Picture" class="profile-picture">
        <p>Ready for service!</p>
    `;
}

// Call the function with the access token (adapt based on your logic)
const token = "DISCORD_ACCESS_TOKEN"; // Replace with the token obtained from authentication
getUserInfo(token);

// Timer management
function startTimer() {
    timer = setInterval(() => {
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
        if (minutes === 60) {
            minutes = 0;
            hours++;
        }
        serviceDuration.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
}

// Event Listeners
btnStartService.addEventListener("click", startService);
btnEndService.addEventListener("click", endService);
