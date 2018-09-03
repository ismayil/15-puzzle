var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
array = shuffle(array);
console.log("shuffled array", array)

var draggedItem;

var root = document.getElementById("root")

for (var i = 0; i < array.length; i++) {

    var div = document.createElement("div");

    div.className = "drop"

    div.addEventListener("dragover", prevent)

    div.addEventListener("dragenter", prevent)

    div.addEventListener("drop", dropHappened)

    div.setAttribute("data-id", i)

    root.appendChild(div);


    if (i < array.length - 1) {
        var childdiv = document.createElement("div");

        childdiv.className = "drag"

        childdiv.innerText = array[i]

        childdiv.setAttribute("draggable", "true")

        childdiv.addEventListener("click", move)

        childdiv.addEventListener("dragstart", function (e) {
            draggedItem = e.target;
        })

        div.appendChild(childdiv);
    }
    if (i == array.length - 1) {
        div.id = "empty"
    }
}

function move(e) {
    var currentIndex = e.target.parentNode.getAttribute("data-id");
    var newIndex = document.querySelector("#empty").getAttribute("data-id");

    console.log(currentIndex, newIndex)
    if (Math.abs(currentIndex - newIndex) == 1 || Math.abs(currentIndex - newIndex) == 4) {

        document.querySelector("div[data-id='" + newIndex + "'").appendChild(e.target)

        document.querySelector("div[data-id='" + currentIndex + "'").id = "empty"
        document.querySelector("div[data-id='" + newIndex + "'").removeAttribute("id")

        //document.querySelector(".remove-it").classList.remove("remove-it")
        checkResult();
    }

}


function dropHappened(e) {
    e.preventDefault();

    var fromIndex = draggedItem.parentNode.getAttribute("data-id");
    console.log("departure", fromIndex)
    var toIndex = e.target.getAttribute("data-id");
    console.log("arrive", toIndex)

    if (!e.target.hasChildNodes()
        && (Math.abs(fromIndex - toIndex) == 1 || Math.abs(fromIndex - toIndex) == 4)
    ) {
        draggedItem.parentNode.id = "empty"

        e.target.appendChild(draggedItem)

        e.target.removeAttribute("id")

        checkResult();
    } else {
        console.log("destination has a child node or wrong route")
    }

}

function prevent(e) {
    e.preventDefault();
}


function checkResult() {
    var drops = document.querySelectorAll(".drop");
    for (var i = 0; i < drops.length; i++) {
        //console.log(drops[i].hasChildNodes() && String(Number(drops[i].getAttribute("data-id")) + 1) != drops[i].querySelector("div").innerText)
        if (drops[i].hasChildNodes() && String(Number(drops[i].getAttribute("data-id")) + 1) != drops[i].querySelector("div").innerText) {
            return;
        }
    }
    setTimeout(function () {
        alert("Bravo, you win")
    }, 100)

}


function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}