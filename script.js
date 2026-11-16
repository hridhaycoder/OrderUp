var ITEMS = [
    { id: "cake", name: "Chocolate cake", cat: "Dessert", price: 5, was: 6, img: "images/cake.png" }
];


var balance = 120, oderNO = 14, orderTotal = 0;
var $ = function (id) { return document.getElementById(id); };
var cart = {};

var CATS = ["All", "Mains", "Sides", "Drinks", "Dessert"];
var cat = "All", term = "";

function drawChips() {
    $("chips").innerHTML = CATS.map(function (c) {
        return '<button class="f' + (c == cat ? ' on' : '') + '" data-cat="' + c + '">' + c + '</button>';
    })
}

function drawGrid() {
    var list = ITEMS.filter(function (i) {
        return (cat === "All" || i.cat === cat) && i.name.toLowerCase().indexOf(term) > -1;
    });

    $("grid").innerHTML = list.length ? list.map(function (i) {
        var qty = cart[i.id] || 0;
        var pic = i.img ? '<img src="' + i.img + '" alt="' + i.name + '">' : 'image';
        var newTag = i.isNew ? '<span class="tag">NEW</span>' : '';
        var oldPrice = i.was ? '<span class="old">' + i.was + ' px</span>' : '';
        var priceClass = i.was ? 'now sale' : 'now';
        var label = qty ? 'Add another (' + qty + ')' : 'Add to order';

        return '<div class="pc">' + newTag +
            '<div class="img">' + pic + '</div>' +
            '<h3>' + i.name + '</h3>' +
            '<div class="pr"><span class="' + priceClass + '">' + i.price + ' px</span>' + oldPrice + '</div>' +
            '<button class="add" data-add="' + i.id + '">' + label + '</button>' +
            '</div>';
    }).join("") : '<div class="none">Nothing on the menu matches that.</div>';
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


    orderTotal = total;
    var short = total > balance;
    $("ballnote").className = "bal" + (short ? " bad" : "");
    $("ballnote").textContent = any
        ? (short ? "You need " + (total - balance) + " more px." : "You will have " + (balance - total) + " px left.")
        : "";
    $("go").disabled = !any || short
}

$("go").addEventListener("click", function () {
    var name = $("who").ariaValueMax.trim();
    balance -= orderTotal;
    $("bal").textContent = balance;
    $("ok").textContent = "Odrder #" + oderNo + " placed" + (name ? "for " + name : "") + ".";
    oderNo++;
    cart = {}
    $("note").value = "";
    drawGrid();
    drawOrder();
});


drawChips();
drawGrid();
drawOrder();