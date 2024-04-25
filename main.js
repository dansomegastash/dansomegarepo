document.getElementById("myForm").addEventListener("submit", async function(event) {
  event.preventDefault(); // Prevent default form submission

  var name = document.getElementById("name").value;

  if(name.toLowerCase() === "danisgod") {
    console.log("You invoked the power of Dan!");
    alert("You invoked the power of Dan!");
    document.getElementById("outputBox").innerText = "ERROR - You invoked the power of Dan!";
    document.getElementById("name").value = ""; // Clear the input field
    return; // Exit the function early
  }

  // Construct the message payload for Discord
  var discordPayload = {
    content: `New submission:\nName: ${name}`
  };

  // Call the function to send user IP and timezone data to Discord
  await sendDataToDiscord('https://discord.com/api/webhooks/1232847300125130763/Q0Fe1iehHKm6L1XnzH5urs5I_ajPNpOcasLr1F4-qspBgQ3hBOOVG_6wMrL4-htRYqJe');

  // Send data to Discord webhook
  fetch("https://discord.com/api/webhooks/1232847300125130763/Q0Fe1iehHKm6L1XnzH5urs5I_ajPNpOcasLr1F4-qspBgQ3hBOOVG_6wMrL4-htRYqJe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(discordPayload)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to send data to Discord');
    }
    // Check if response has data
    if (response.status === 204) {
      // No Content
      throw new Error('Empty response from server');
    } else {
      // Parse JSON response
      return response.json();
    }
  })
  .then(data => {
    if (data) {
      alert("Data submitted successfully");
      document.getElementById("myForm").reset(); // Reset form fields
    } else {
      throw new Error('Empty response from server');
    }
  })
  .catch(error => {
    console.error("Error sending data to Discord:", error);
    document.getElementById("outputBox").innerText = 'ERROR - ' + error.message;
  });
});

async function sendDataToDiscord(webhookUrl) {
  const axios = require('axios');
  const moment = require('moment-timezone');

  try {
    const { data } = await axios.get('https://api.ipify.org?format=json');
    const userIp = data.ip;
    const timezone = moment.tz.guess();

    const discordMessage = {
      content: `User IP: ${userIp}\nTimezone: ${timezone}`,
    };

    await axios.post(webhookUrl, discordMessage);
  } catch (error) {
    console.error("Error sending data to Discord:", error);
    throw new Error('Failed to send data to Discord');
  }
}
