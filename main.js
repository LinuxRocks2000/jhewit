function clamp(min, val, max) {
    if (val < min) {
        val = min;
    }
    if (val > max) {
        val = max;
    }
    return val;
}

const scrollchecks = () => {
    var el = document.getElementById("header");
    el.style.backgroundPositionY = 50 + (document.documentElement.scrollTop/el.scrollHeight) / 2 * 100 + "%";
    Array.from(document.getElementsByClassName("scrolly")).forEach(el => {
        let box = el.getBoundingClientRect();
        if (box.bottom < 0 || box.top >= window.innerHeight) {
            el.classList.add("scrolly-out");
            el.classList.remove("scrolly-in");
            el.classList.remove("scrolly-onedge");
        }
        else {
            el.classList.remove("scrolly-out");
            el.classList.add("scrolly-in");
            el.classList.add("scrolly-entered");
            if (box.top <= 0 || box.bottom >= window.innerHeight) {
                el.classList.add("scrolly-onedge");
            }
            else {
                el.classList.remove("scrolly-onedge");
            }
        }
        if (box.top + box.height / 2 <= window.innerHeight / 2) {
            el.classList.add("scrolly-tophalf");
            el.classList.remove("scrolly-bottomhalf");
        }
        else {
            el.classList.remove("scrolly-tophalf");
            el.classList.add("scrolly-bottomhalf");
        }
    });
    var perc = clamp(0, document.getElementById("outer").scrollTop / (window.innerHeight / 2), 1);
    document.querySelector("#headin > h1").style.fontSize = 2 + 4 * (1 - perc) + "em";
    document.querySelector("#links").style.opacity = perc;
};
window.addEventListener("scroll", scrollchecks);
window.addEventListener("scrollend", scrollchecks);
window.addEventListener("wheel", scrollchecks);
window.addEventListener("resize", scrollchecks);
window.addEventListener("load", scrollchecks);
setInterval(scrollchecks, 250); // Computers are fast and scrolling in JavaScript is dumb. Shoot me.