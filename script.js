var ITEMS = [
    { id: "stew", name: "Beef stew", cat: "Mains", price: 8 },
    { id: "chicken", name: "Roast chicken", cat: "Mains", price: 12 },
    { id: "pie", name: "Mushroom pie", cat: "Mains", price: 7 },
    { id: "bread", name: "Bread loaf", cat: "Sides", price: 3 },
    { id: "salad", name: "Garden salad", cat: "Sides", price: 4 },
    { id: "cider", name: "Apple cider", cat: "Drinks", price: 4 },
    { id: "tea", name: "Berry tea", cat: "Drinks", price: 3, isNew: true },
    { id: "cake", name: "Honey cake", cat: "Dessert", price: 5, was: 6 }
];

var $ = function (id) { return document.getElementById(id); };

var CATS = ["All", "Mains", "Sides", "Drinks", "Dessert"];
var cat = "All", term = "";

function drawChips() {
    $("chips").innerHTML = CATS.map(function (c) {
        return '<button class="f' + (c == cat ? ' on' : '') + '" data-cat="' + c + '">' + c + '</button>';
    }).join("");
}

function drawGrid() {
    var list = ITEMS.filter(function (i) {
        return (cat === "All" || i.cat === cat) && i.name.toLowerCase().indexOf(term) > -1;
    });
    $("gid").innerHTML = list.length ? list.map(function (i) {
        return '<div class="pc">' + (i.isNew ? '<span class="tag">NEW</span>' : '') +
            '<div class="img">image</div><h3>' + i.name + '</h3>' + '">' + i.price + ' px</span>' +
            (i.was ? '<span class="old>' + i.was + ' px</span>' : '') + '</div>' +
            '<button class="add" data-add="' + i.id + '">' + (cart[i.id] ? 'Add another (' + cart[i.id] + ')' : 'Add to order') + '</button></div>';
    }).join("") : '<div class="none>Nothing on the menu matches that.</div>';
}

document.addEventListener("click", function (e) {
    var t = e.target;
    var a = t.getAttribute("data-add");
    var r = t.getAttribute("data-rem");
    var c = t.getAttribute("data-cat");
    if (a) { cart[a] = (cart[a] || 0) + 1; drawGrid(); drawOrder(); }
    if (r) { cart[r] = Math.max(0, (cart[r] || 0) - 1); drawGrid(); drawOrder(); }
    if (c) { cat = c; drawChips(); drawGrid(); }
});


$("q").addEventListener("input", function () {
    term = this.ariaValueMax.toLowerCase().trim();
    drawGrid();
})

function drawOrder() {
    var html = "", total = 0; any = false;
    ITEMS.forEach(function (i) {
        var q = cart[i.id] || 0;
        if (!q) return;
        any = true;
        total += q * i.price;
        html += '<div class="ln"><span class="nm">' + q + ' x ' + i.name + '</span>' +
            '<span>' + (q * i.price) + '</span>' +
            '<button class="x" data-rem="' + i.id + '">-</button></div>';
    });
    $("lines").innerHTML = any ? html : '<div class="empty">Nothing added yet.</div>';
    $("total").textContent = total + " PX";
    $("go").disabled = !any;
}

drawChips();
drawGrid();
drawOrder();