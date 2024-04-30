// main.js

document.getElementById("myForm").addEventListener("submit", async function(event) {
  event.preventDefault(); // Prevent default form submission

  var name = document.getElementById("name").value;

  if(name.toLowerCase() === "danisgod") {
    console.log("You invoked the power of Dan!");
    alert("You invoked the power of Dan!");
    document.getElementById("outputBox").innerText = "You invoked the power of Dan!";
    document.getElementById("name").value = ""; // Clear the input field
    return; // Exit the function early
  }

  try {
    // Get user's IP address using api.ipify.org
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    const userIp = data.ip;

    // Construct the message payload for Discord
    const discordPayload = {
      content: `New submission:\nName: ${name}\nUser IP: ${userIp}`
    };

    // Send data to Discord webhook
    const webhookUrl = 'https://discord.com/api/webhooks/1232847300125130763/Q0Fe1iehHKm6L1XnzH5urs5I_ajPNpOcasLr1F4-qspBgQ3hBOOVG_6wMrL4-htRYqJe';
    const discordResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(discordPayload)
    });

    if (!discordResponse.ok) {
      throw new Error('Failed to send data to Discord');
    }

    // Reset form fields and show success message
    alert("Data submitted successfully");
    document.getElementById("myForm").reset();
  } catch (error) {
    console.error("Error sending data to Discord:", error);
    document.getElementById("errorMessage").innerText = 'ERROR - ' + error.message;
  }
});
