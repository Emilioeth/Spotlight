document.querySelectorAll("#nav li").forEach(function (navEl) {
    navEl.onclick = function () { toggleTab(this.id, this.dataset.target); }
});

function toggleTab(selectedNav, targetId) {
    var navEls = document.querySelectorAll("#nav li");

    navEls.forEach(function (navEl) {
        if (navEl.id == selectedNav) {
            navEl.classList.add("is-active");
        } else {
            if (navEl.classList.contains("is-active")) {
                navEl.classList.remove("is-active");
            }
        }
    });

    var tabs = document.querySelectorAll(".tab-pane");

    tabs.forEach(function (tab) {
        if (tab.id == targetId) {
            tab.style.display = "block";
        } else {
            tab.style.display = "none";
        }
    });
}

(function () {
    var burger = document.querySelector('.burger');
    if (burger?.dataset) {
        var menu = document.querySelector('#' + burger.dataset.target);
        burger.addEventListener('click', function () {
            burger.classList.toggle('is-active');
            menu.classList.toggle('is-active');
        });
    }
})();