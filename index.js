// Get input values and create the binary tree
const output = document.getElementById("tree");

function getInput() {
    const value = document.getElementById("inp").value;
    var arr = value.split(" ")
    var num = [];

    for (var i = 0; i < arr.length; i++) {
        if (!isNaN(arr[i]) && arr[i] != "\n") {
            num.push(arr[i])
        }
    }
    return num;
}

function action() {
    // Get input values and create the binary tree structure
    var result = getInput();
    var root = createNodes(result);
    return root;
}