document.addEventListener("DOMContentLoaded", function () {
  // Step 1: Create the black overlay to block page interactions
  const blackOverlay = document.createElement("div");
  blackOverlay.style.position = "fixed";
  blackOverlay.style.top = "0";
  blackOverlay.style.left = "0";
  blackOverlay.style.width = "100%";
  blackOverlay.style.height = "100%";
  blackOverlay.style.backgroundColor = "black";
  blackOverlay.style.zIndex = "9998"; // Ensure it is below the disclaimer
  blackOverlay.style.pointerEvents = "none"; // Allow interaction with the disclaimer buttons

  // Step 2: Create the disclaimer at the bottom of the page
  const disclaimer = document.createElement("div");
  disclaimer.style.position = "fixed";
  disclaimer.style.bottom = "0";
  disclaimer.style.left = "0";
  disclaimer.style.width = "100%";
  disclaimer.style.backgroundColor = "#f8d7da";
  disclaimer.style.padding = "10px";
  disclaimer.style.textAlign = "center";
  disclaimer.style.color = "#721c24";
  disclaimer.style.zIndex = "9999"; // Ensure it's above the overlay
  disclaimer.style.boxSizing = "border-box";

  disclaimer.innerHTML = `
    <p>By logging in, you acknowledge and agree to all terms and conditions as stated at 
      <a href="https://bit.ly/3DGc1qW" target="_blank">https://bit.ly/3DGc1qW</a>. Unauthorized access or violation of these terms may result in legal action. Please review the terms carefully before proceeding.
    </p>
    <button id="agreeBtn">Agree</button>
    <button id="disagreeBtn">Disagree</button>
  `;

  // Step 3: Append the black overlay and disclaimer to the body
  document.body.appendChild(blackOverlay);
  document.body.appendChild(disclaimer);

  // Disable all page interactions until the user agrees
  document.body.style.pointerEvents = "none";

  // Get the "Agree" and "Disagree" buttons
  const agreeBtn = document.getElementById("agreeBtn");
  const disagreeBtn = document.getElementById("disagreeBtn");

  // Make sure the buttons are clickable
  agreeBtn.style.pointerEvents = "auto";
  disagreeBtn.style.pointerEvents = "auto";

  // Handle the "Agree" button click event
  agreeBtn.addEventListener("click", function () {
    // Hide the disclaimer and black overlay
    disclaimer.style.display = "none";
    blackOverlay.style.display = "none";

    // Re-enable interactions with the page
    document.body.style.pointerEvents = "auto";
  });

  // Handle the "Disagree" button click event
  disagreeBtn.addEventListener("click", function () {
    // Redirect the user to Google if they disagree
    window.location.href = "https://www.google.com";
  });

  // Step 4: Splash text (random messages displayed)
  const splashTexts = [
    "Over 8 Million Users since 2023",
    "Fastest growing proxy server",
    "Made by xBubbo",
    "Check out discord.gg/interstellar :)",
    "Thanks for using the site",
    "Follow us on Tiktok (@useinterstellar)",
    "Subscribe to us on YouTube (@unblocking)",
    "Subscribe to my Youtube (@xbubbo)",
    "Check out the settings page",
    "Check out our Patreon (https://www.patreon.com/gointerstellar)",
  ];

  let splashIndex = Math.floor(Math.random() * splashTexts.length);
  const splashElement = document.getElementById("splash");

  // Function to update splash text on click
  function updateSplashText() {
    splashIndex = (splashIndex + 1) % splashTexts.length;
    splashElement.innerText = splashTexts[splashIndex];
  }

  // Display the first splash text and add event listener to change on click
  splashElement.innerText = splashTexts[splashIndex];
  splashElement.addEventListener("click", updateSplashText);

  // Step 5: Random URL function to redirect on certain actions
  function getRandomUrl() {
    const randomUrls = [
      "https://kahoot.it",
      "https://classroom.google.com",
      "https://drive.google.com",
      "https://google.com",
      "https://docs.google.com",
      "https://slides.google.com",
      "https://www.nasa.gov",
      "https://blooket.com",
      "https://clever.com",
      "https://edpuzzle.com",
      "https://khanacademy.org",
      "https://wikipedia.org",
      "https://dictionary.com",
    ];
    return randomUrls[Math.floor(Math.random() * randomUrls.length)];
  }

  // Step 6: Handle popups if needed (conditional script for specific user actions)
  const inFrame = window !== top;
  const userAgent = navigator.userAgent;

  if (!inFrame && !userAgent.includes("Firefox")) {
    const popup = open("about:blank", "_blank");

    if (!popup || popup.closed) {
      // Log a message instead of showing an alert
      console.log("Please ensure popups are allowed to proceed.");
    } else {
      const doc = popup.document;
      const iframe = doc.createElement("iframe");
      iframe.style.position = "fixed";
      iframe.style.top =
        iframe.style.bottom =
        iframe.style.left =
        iframe.style.right =
          "0";
      iframe.style.border = iframe.style.outline = "none";
      iframe.style.width = iframe.style.height = "100%";

      const link = doc.createElement("link");
      const name = localStorage.getItem("name") || "My Drive - Google Drive";
      const icon =
        localStorage.getItem("icon") ||
        "https://ssl.gstatic.com/docs/doclist/images/drive_2022q3_32dp.png";

      doc.title = name;
      link.rel = "icon";
      link.href = icon;

      iframe.src = location.href;
      doc.head.appendChild(link);
      doc.body.appendChild(iframe);

      const pLink = localStorage.getItem("pLink") || getRandomUrl();
      location.replace(pLink);

      const script = doc.createElement("script");
      script.textContent = `
        window.onbeforeunload = function(event) {
          const confirmationMessage = 'Leave Site?';
          (event || window.event).returnValue = confirmationMessage;
          return confirmationMessage;
        };
      `;
      doc.head.appendChild(script);
    }
  }

  // Step 7: Particles animation (if enabled by user)
  if (window.localStorage.getItem("Particles") === "true") {
    const particlesConfig = {
      particles: {
        number: { value: 200, density: { enable: true, value_area: 600 } },
        color: { value: "#ffffff" },
        shape: { type: "circle", stroke: { width: 0, color: "#000000" } },
        opacity: { value: 1, random: true },
        size: { value: 3, random: true },
        line_linked: { enable: false },
        move: { enable: true, speed: 2, random: true, out_mode: "out" },
      },
      interactivity: {
        events: {
          onhover: { enable: true, mode: "repulse" },
          onclick: { enable: false, mode: "push" },
        },
        modes: { repulse: { distance: 40, duration: 0.4 } },
      },
      retina_detect: true,
    };
    particlesJS("particles-js", particlesConfig);
  }
});
