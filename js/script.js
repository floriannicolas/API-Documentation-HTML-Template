
var elements = [];

[].forEach.call(document.querySelectorAll('.scroll-to-link'), function (div) {
    div.onclick = function (e) {
        e.preventDefault();
        var target = this.dataset.target;
        document.getElementById(target).scrollIntoView({behavior: 'smooth'});
        return false;
    };
});

function calculElements () {
    var totalHeight = 0;
    elements = [];
    [].forEach.call(document.querySelectorAll('.content-section'), function (div) {
        var section = {};
        section.id = div.id;
        totalHeight += div.offsetHeight;
        section.maxHeight = totalHeight - 25;
        elements.push(section);
    });
}

function onScroll () {
    var scroll = window.pageYOffset;
    // console.log('scroll', scroll, elements)
    for (var i = 0; i < elements.length; i++) {
        var section = elements[i];
        if (scroll <= section.maxHeight) {
            var elems = document.querySelectorAll(".content-menu ul li");
            [].forEach.call(elems, function (el) {
                el.classList.remove("active");
            });
            var activeElems = document.querySelectorAll(".content-menu ul li[data-target='" + section.id + "']");
            [].forEach.call(activeElems, function (el) {
                el.classList.add("active");
            });
            break;
        }
    }
    if (window.innerHeight + scroll >= document.body.scrollHeight) { // end of scroll, last element
        var elems = document.querySelectorAll(".content-menu ul li");
        [].forEach.call(elems, function (el) {
            el.classList.remove("active");
        });
        var activeElems = document.querySelectorAll(".content-menu ul li:last-child");
        [].forEach.call(activeElems, function (el) {
            el.classList.add("active");
        });
    }
}

calculElements();
window.onload = () => {
    calculElements()
};
window.addEventListener('resize', function (e) {
    e.preventDefault();
    calculElements();
});
window.addEventListener('scroll', function (e) {
    e.preventDefault();
    onScroll();
});