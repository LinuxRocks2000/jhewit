window.onresize = () => { // stupid hack for mobile browsers. Won't do anything on desktop.
    document.getElementById("main").style.height = window.innerHeight + "px";
    document.getElementById("bg").style.height = window.innerHeight + "px";
};

window.onresize();

if (localStorage.refered) {
    delete localStorage.refered;
    document.getElementById("shape").scrollIntoView({
        "behavior": "smooth"
    });
}

Array.from(document.getElementsByClassName("ytframe")).forEach(frame => { // resizes youtube videos to fit their containers
    var w1 = frame.getBoundingClientRect().width;
    frame.width = "100%";
    var w2 = frame.getBoundingClientRect().width;
    frame.width = w2 + "px";
    frame.height = frame.getBoundingClientRect().height * w2 / w1;
});