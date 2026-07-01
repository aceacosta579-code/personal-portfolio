/* =========================
   LOADER
========================= */

window.addEventListener("load", () => {
    const loader = document.getElementById("loader");

    setTimeout(() => {
        loader.style.display = "none";
    }, 1000);
});

/* =========================
   DARK MODE
========================= */

const themeBtn = document.getElementById("themeBtn");

if(localStorage.getItem("theme") === "dark"){
    document.body.classList.add("dark");
}

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        localStorage.setItem("theme", "dark");
    }else{
        localStorage.setItem("theme", "light");
    }

});

/* =========================
   TYPING EFFECT
========================= */

const typingText = document.getElementById("typing");

const words = [
    "Computer Science Student",
    "Web Developer",
    "Programmer",
    "Database Enthusiast",
    "Future Software Engineer"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect(){

    const currentWord = words[wordIndex];

    if(!isDeleting){
        typingText.textContent =
            currentWord.substring(0, charIndex + 1);

        charIndex++;

        if(charIndex === currentWord.length){
            isDeleting = true;

            setTimeout(typeEffect, 1500);
            return;
        }

    }else{

        typingText.textContent =
            currentWord.substring(0, charIndex - 1);

        charIndex--;

        if(charIndex === 0){
            isDeleting = false;
            wordIndex++;

            if(wordIndex === words.length){
                wordIndex = 0;
            }
        }
    }

    setTimeout(typeEffect,
        isDeleting ? 70 : 120);
}

typeEffect();

/* =========================
   SCROLL PROGRESS BAR
========================= */

window.addEventListener("scroll", () => {

    const scrollTop =
        document.documentElement.scrollTop;

    const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const progress =
        (scrollTop / scrollHeight) * 100;

    document.getElementById("progressBar")
        .style.width = progress + "%";

});

/* =========================
   BACK TO TOP BUTTON
========================= */

const topBtn =
    document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    if(window.scrollY > 400){
        topBtn.style.display = "block";
    }else{
        topBtn.style.display = "none";
    }

});

topBtn.addEventListener("click", () => {

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

});

/* =========================
   LIVE CLOCK
========================= */

function updateClock(){

    const now = new Date();

    document.getElementById("clock")
        .innerHTML =
        now.toLocaleString();

}

setInterval(updateClock, 1000);

updateClock();

/* =========================
   VISITOR COUNTER
========================= */

let visits =
    localStorage.getItem("visitCount");

if(visits === null){
    visits = 1;
}else{
    visits = Number(visits) + 1;
}

localStorage.setItem(
    "visitCount",
    visits
);

document.getElementById("visitCount")
    .innerHTML =
    `You visited this portfolio ${visits} time(s)`;

/* =========================
   RANDOM QUOTE GENERATOR
========================= */

const quotes = [

    "Success is the sum of small efforts repeated daily.",

    "Learning never exhausts the mind.",

    "Dream big. Start small. Act now.",

    "Code is like humor. When you have to explain it, it's bad.",

    "The future belongs to those who learn more skills.",

    "Technology is best when it brings people together.",

    "Your only limit is your willingness to learn.",

    "Every expert was once a beginner.",

    "Believe you can and you're halfway there.",

    "Hard work beats talent when talent doesn't work hard."
];

const quoteBtn =
    document.getElementById("quoteBtn");

quoteBtn.addEventListener("click", () => {

    const random =
        Math.floor(
            Math.random() * quotes.length
        );

    document.getElementById("quote")
        .innerHTML =
        quotes[random];

});

/* =========================
   CONTACT FORM + SUPABASE
========================= */

const form = document.getElementById("contactForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !subject || !message) {
        alert("Please fill out all fields.");
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        alert("Please enter a valid email.");
        return;
    }

    const response = await fetch("https://lnqnxqvcxshviwpsdqce.supabase.co/rest/v1/messages", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "apikey": "sb_publishable_QqVkHVgCq2xZQpsf7UXJNA_Ee-AWFro",
	    "Authorization": "Bearer sb_publishable_QqVkHVgCq2xZQpsf7UXJNA_Ee-AWFro",
            "Prefer": "return=minimal"
        },
        body: JSON.stringify({
            name,
            email,
            subject,
            message
        })
    });

    if (response.ok) {
        alert("Message sent successfully!");
        form.reset();
    } else {
        alert("Failed to send message.");
        console.log(await response.text());
    }
});

/* =========================
   SCROLL ANIMATION
========================= */

const observer =
new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.classList.add(
                "fade-up"
            );

        }

    });

},{
    threshold:0.2
});

document
.querySelectorAll(
    ".about-card, .project-card, .certificate-card, .timeline-item"
)
.forEach(element => {

    observer.observe(element);

});

/* =========================
   SKILL BAR ANIMATION
========================= */

const skillObserver =
new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            const bars =
                document.querySelectorAll(".progress");

            bars.forEach(bar => {

                const targetWidth =
                    bar.classList.contains("html")
                    ? "95%"
                    : bar.classList.contains("css")
                    ? "90%"
                    : bar.classList.contains("js")
                    ? "85%"
                    : bar.classList.contains("react")
                    ? "80%"
                    : "75%";

                bar.style.width =
                    targetWidth;

                bar.style.transition =
                    "2s";
            });

        }

    });

},{
    threshold:0.5
});

skillObserver.observe(
    document.getElementById("skills")
);

/* =========================
   IMAGE GALLERY PREVIEW
========================= */

const galleryImages =
document.querySelectorAll(
    ".gallery-container img"
);

galleryImages.forEach(image => {

    image.addEventListener("click", () => {

        const popup =
            document.createElement("div");

        popup.style.position = "fixed";
        popup.style.top = "0";
        popup.style.left = "0";
        popup.style.width = "100%";
        popup.style.height = "100%";
        popup.style.background =
            "rgba(0,0,0,0.9)";
        popup.style.display = "flex";
        popup.style.justifyContent =
            "center";
        popup.style.alignItems =
            "center";
        popup.style.cursor = "pointer";
        popup.style.zIndex = "9999";

        const img =
            document.createElement("img");

        img.src = image.src;
        img.style.maxWidth = "80%";
        img.style.maxHeight = "80%";
        img.style.borderRadius = "10px";

        popup.appendChild(img);

        document.body.appendChild(
            popup
        );

        popup.addEventListener(
            "click",
            () => {
                popup.remove();
            }
        );

    });

});

/* =========================
   GREETING MESSAGE
========================= */

const currentHour =
new Date().getHours();

let greeting = "";

if(currentHour < 12){

    greeting = "Good Morning!";

}else if(currentHour < 18){

    greeting = "Good Afternoon!";

}else{

    greeting = "Good Evening!";
}

console.log(greeting);

/* =========================
   CONSOLE MESSAGE
========================= */

console.log(
"Welcome to Antonio Acosta's Portfolio Website"
);

/* =========================
   YEAR AUTO UPDATE
========================= */

const currentYear =
new Date().getFullYear();

const footer =
document.querySelector("footer p:last-child");

if(footer){
    footer.innerHTML =
    `© ${currentYear} All Rights Reserved`;
}