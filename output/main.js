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