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
    //document.querySelector("#carousel").style.opacity = perc;
};
window.addEventListener("scroll", scrollchecks);
window.addEventListener("scrollend", scrollchecks);
window.addEventListener("wheel", scrollchecks);
window.addEventListener("resize", scrollchecks);
window.addEventListener("load", scrollchecks);
window.addEventListener("touchmove", scrollchecks);
setInterval(scrollchecks, 250); // Computers are fast and scrolling in JavaScript is dumb. Shoot me.

function getCarousel(id) {
    var carousEL = document.querySelector(".carousel#" + id);
    var carousel = {
        element: carousEL,
        delCalls: 0,
        selected() {
            return carousel.element.querySelector(".selected");
        },
        next(domarkate) {
            var sel = carousel.selected();
            sel.classList.remove("selected");
            var newSel = sel.nextElementSibling;
            if (!newSel) {
                newSel = carousel.element.firstElementChild;
            }
            newSel.classList.add("selected");
            carousel.display();
            if (domarkate != true) {
                carousel.delCalls = 3;
            }
        },
        nextAnim() {
            if (carousel.delCalls == 0) {
                carousel.next(true);
            }
            else {
                carousel.delCalls--;
            }
        },
        back(domarkate) {
            var sel = carousel.selected();
            sel.classList.remove("selected");
            var newSel = sel.previousElementSibling;
            if (!newSel) {
                newSel = carousel.element.lastElementChild;
            }
            newSel.classList.add("selected");
            carousel.display();
            if (domarkate != true) {
                carousel.delCalls = 3;
            }
        },
        display() {
            var bbox = carousel.selected().getBoundingClientRect();
            var bb2 = carousel.element.parentNode.getBoundingClientRect();
            carousel.element.scrollBy({
                left: (bbox.left - bb2.left - bb2.width/2 + bbox.width/2),
                top: 0,
                behavior: "smooth"
            });
        }
    }
    carousEL.previousElementSibling.onclick = carousel.back;
    carousEL.nextElementSibling.onclick = carousel.next;
    return carousel;
}

var carousel_1 = getCarousel("carousel_1");
carousel_1.display();

setInterval(carousel_1.nextAnim, 2000);

function toggle_sidebar() {
    document.body.classList.toggle("sidebar-opened");
    var el = document.querySelector("#sider > img");
    if (document.body.classList.contains("sidebar-opened")) {
        el.src = "res/arrow-left.svg";
    }
    else {
        el.src = "res/arrow-right.svg";
    }
}