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
    document.querySelector("#headin > h1").style.fontSize = 0 + 6 * (1 - perc) + "em";
    //document.querySelector("#links").style.opacity = perc;
    //document.querySelector("#carousel").style.opacity = perc;
};
window.addEventListener("scroll", scrollchecks);
window.addEventListener("scrollend", scrollchecks);
window.addEventListener("wheel", scrollchecks);
window.addEventListener("resize", scrollchecks);
window.addEventListener("load", scrollchecks);
window.addEventListener("touchmove", scrollchecks);
setInterval(scrollchecks, 250); // Computers are fast and scrolling in JavaScript is dumb. Shoot me.
var gallery_position = 0;
var last_cycle = window.performance.now();
var GALLERYSPEED = -100;
var oldTouch = undefined;

document.getElementById("carousel-inner").addEventListener("wheel", (evt) => {
    GALLERYSPEED = (-evt.deltaX + evt.deltaY) * 100;
    evt.preventDefault();
});

document.getElementById("carousel-inner").addEventListener("touchmove", (evt) => {
    var tuch = evt.touches[0];
    if (oldTouch) {
        GALLERYSPEED = -(oldTouch.pageX - tuch.pageX) * 100;
    }
    oldTouch = tuch;
});

document.getElementById("carousel-inner").addEventListener("touchend", () => {
    oldTouch = undefined;
});

function main() {
    var elapsed_time = window.performance.now() - last_cycle;
    last_cycle += elapsed_time;
    requestAnimationFrame(main);
    var el = document.getElementById("carousel-inner");
    if (getComputedStyle(el).getPropertyValue("--do-scroll") == "yes" && !oldTouch) {
        GALLERYSPEED = -100;
    }
    else {
        GALLERYSPEED *= Math.pow(0.1, elapsed_time / 1000)
    }
    gallery_position += GALLERYSPEED * elapsed_time / 1000;
    if (gallery_position > 0) {
        var hammer = el.lastChild;
        el.removeChild(hammer);
        var smol = el.scrollWidth;
        el.insertBefore(hammer, el.firstChild);
        gallery_position -= (el.scrollWidth - smol);
    }
    if (gallery_position < -(el.scrollWidth - window.innerWidth)) {
        var hammer = el.firstChild;
        el.removeChild(hammer);
        var smol = el.scrollWidth;
        el.appendChild(hammer);
        gallery_position += (el.scrollWidth - smol);
    }
    el.style.transform = "translate(" + gallery_position + "px, 0)";
}

main();