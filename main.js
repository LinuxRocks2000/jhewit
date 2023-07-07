var startX = 0;

window.ontouchstart = (evt) => {
    startX = evt.touches[0].clientX;
}

window.ontouchmove = (evt) => {
    var difX = evt.touches[0].clientX - startX;
    if (difX > 100) {
        document.body.classList.add("sidebar-opened");
    }
    if (difX < -100) {
        document.body.classList.remove("sidebar-opened");
    }
}

function clamp(min, val, max) {
    if (val < min) {
        val = min;
    }
    if (val > max) {
        val = max;
    }
    return val;
}

var ua = window.navigator.userAgent;
var iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i); // THANKS, STACKOVERFLOW

function getNearestChildIndexTo(element, position) { 
    var nearest = undefined;
    var nearestValue = Infinity;
    for (var i = 0; i < element.children.length; i++){ // There isn't a short-circuit here because we have to consider for transforms. I don't think I'll be doing anything that hack but you never know.
        var box = element.children[i].getBoundingClientRect();
        var elPos = box.top + box.height / 2;
        var distance = Math.abs(position - elPos);
        if (distance < nearestValue) {
            nearestValue = distance;
            nearest = i;
        }
    }
    return nearest; // If the element has any children, this is guaranteed to be well-defined.
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
    document.querySelector("#headin > a > h1").style.fontSize = 2 + 4 * (1 - perc) + "em";
    document.querySelector("#links").style.opacity = perc;
    document.querySelector("#hambugha + label").style.opacity = perc;
    //document.querySelector("#carousel").style.opacity = perc;
    //document.querySelector("#sider > img").style.top = clamp(15, 100 * (document.querySelector("#headin > h1").getBoundingClientRect().top / window.innerHeight), 100) + "%";
    Array.from(document.getElementsByClassName("image-relational-scrolling")).forEach(element => {
        let sel = getNearestChildIndexTo(element.children[1], window.innerHeight / 2);
        for (var i = 0; i < element.children[0].children.length; i++){
            if (i == sel) {
                element.children[0].children[i].classList.add("selected");
            }
            else {
                element.children[0].children[i].classList.remove("selected");
            }
        }
    });
    if (iOS) {
        Array.from(document.getElementsByClassName("parallax")).forEach((item, i) => {
            item.style.backgroundPosition = "50% calc(" + (-item.getBoundingClientRect().top) + "px)";
        });
    }
};


window.addEventListener("load", () => {
    Array.from(document.getElementsByClassName("image-relational-scrolling")).forEach(imagerelational => {
        var row1 = imagerelational.children[0];
        var row2 = imagerelational.children[1];
        for (var i = 0; i < row1.children.length; i ++) {
            var el = row1.children[i].cloneNode();
            //el.classList.add("nearest-ignore");
            row2.children[i].prepend(el);
        }
    });
});

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
        el.src = "/res/arrow-left.svg";
    }
    else {
        el.src = "/res/arrow-none.svg";
    }
}

function sidebar_off() {
    //document.body.classList.remove("sidebar-opened");
    //el.src = "res/arrow-none.svg";
}