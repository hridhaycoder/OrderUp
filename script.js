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

function drawGrid() {
    $("grid").innerHTML = ITEMS.map(function (i) {
        return '<div class="pc">' + (i.isNew ? '<span class="tag">NEW</span>' : '') +
            '<div class="img">image</div><h3>' + i.name + '</h3>' +
            '<div class="pr"><span class="now' + (i.was ? ' sale' : '') + '">' + i.price + ' px</span>' +
            (i.was ? '<span class="old">' + i.was + ' px</span>' : '') + '</div>' +
            '<button class="add" data-add="' + i.id + '">Add to order</button></div>';
    }).join("");
}

drawGrid();