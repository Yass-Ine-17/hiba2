function updateAge() {
  const birthDate = new Date("2008-08-11T00:00:00");
  const now = new Date();
  const diff = now - birthDate;

  let seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30.44); // average month
  const years = Math.floor(days / 365.25);

  const timeData = {
    "Years": years,
    "Months": months % 12,
    "Weeks": weeks % 4,
    "Days": days % 7,
    "Hours": hours % 24,
    "Minutes": minutes % 60,
    "Seconds": seconds % 60
  };

  const timer = document.getElementById("timer");
  timer.innerHTML = "";

  for (const [label, value] of Object.entries(timeData)) {
    const block = document.createElement("div");
    block.className = "time-block";
    block.innerHTML = `<strong>${value}</strong><span>${label}</span>`;
    timer.appendChild(block);
  }
}

updateAge();
setInterval(updateAge, 1000);

const text = `Every second with you is a gift. I'm so grateful for your smile, your heart, and every little thing about you. Happy Birthday, beautiful 💞`;
const typingElement = document.getElementById("typing");
let index = 0;

function typeLetter() {
  if (index < text.length) {
    typingElement.textContent += text.charAt(index);
    index++;
    setTimeout(typeLetter, 40); // typing speed
  }
}

document.addEventListener("DOMContentLoaded", typeLetter);

window.addEventListener('DOMContentLoaded', () => {
  const video = document.querySelector('video');
  if (video) {
    setTimeout(() => {
      video.play().catch(() => {
        // Autoplay blocked silently
      });
    }, 5000);
  }
});

let fireworksActive = true;

function spawnParticles(x, y, count = 50) {
  const container = document.body;
  for (let i = 0; i < count; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";

    const angle = Math.random() * 2 * Math.PI;
    const distance = (Math.random() * 150 + 50) * 2;
    const dx = Math.cos(angle) * distance + "px";
    const dy = Math.sin(angle) * distance + "px";

    const colors = ["#ff0", "#f0f", "#0ff", "#f80", "#0f0", "#fff", "#f33", "#3ff"];
    const color = colors[Math.floor(Math.random() * colors.length)];
    particle.style.background = color;

    particle.style.left = x + "px";
    particle.style.top = y + "px";
    particle.style.setProperty('--x', dx);
    particle.style.setProperty('--y', dy);

    container.appendChild(particle);
    setTimeout(() => container.removeChild(particle), 1500);
  }
}

function launchRocket(rocket) {
  rocket.style.bottom = '0px';
  rocket.style.opacity = '1';

  const explodeHeight = window.innerHeight - rocket.offsetHeight - 100;

  let start = null;

  function animate(time) {
    if (!start) start = time;
    const elapsed = time - start;
    const duration = 2000;

    const progress = Math.min(elapsed / duration, 1);
    rocket.style.bottom = (progress * explodeHeight) + 'px';

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      rocket.style.opacity = '0';
      const rect = rocket.getBoundingClientRect();
      spawnParticles(rect.left + rect.width / 2, rect.top + rect.height / 2, 50);

      if (fireworksActive) {
        setTimeout(() => launchRocket(rocket), 1500);
      } else {
        rocket.style.display = 'none';
      }
    }
  }

  requestAnimationFrame(animate);
}

window.onload = () => {
  const leftRocket = document.querySelector('.firework.left');
  const rightRocket = document.querySelector('.firework.right');

  launchRocket(leftRocket);
  setTimeout(() => launchRocket(rightRocket), 1000);

  setTimeout(() => {
    fireworksActive = false;
  }, 5000);

  // Attempt to play background music on load
  const bgMusic = document.getElementById('bgMusic');
  if (bgMusic) {
    bgMusic.volume = 0.2;
    bgMusic.play().catch(() => {
      console.log('Autoplay blocked: user interaction required to start audio.');
    });
  }
};

const giftBox = document.getElementById('giftBox');
const giftContent = document.getElementById('giftContent');
const bgMusic = document.getElementById('bgMusic');

giftBox.addEventListener('click', () => {
  giftBox.classList.toggle('open');
  giftContent.classList.toggle('show');

  bgMusic.volume = 0.2;
  bgMusic.play();

  for (let i = 0; i < 20; i++) {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    sparkle.style.left = `${giftBox.offsetLeft + 75}px`;
    sparkle.style.top = `${giftBox.offsetTop + 75}px`;
    sparkle.style.setProperty('--x', `${Math.random() * 200 - 100}px`);
    sparkle.style.setProperty('--y', `${Math.random() * -150}px`);
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 1000);
  }
});
