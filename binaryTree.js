// Binary Tree Node constructor
function Node(value, left, right, parent = "", children = []) {
    this.value = value;
    this.right = right;
    this.left = left;
    this.parent = parent;
    this.children = children;
    this.isRight = null;
    this.isLeft = null;
}

// Create the binary tree structure
function createTree(arr) {
    // Build the binary tree structure
    for (var i = 1; i < arr.length; i++) {
        nodeDirection(arr[0], arr[i]);
    }

    // Populate additional data for visualization
    createData(arr[0]);

    // Remove any existing graph before drawing a new one
    remove();

    try {
        // Attempt to draw the graph visualization
        drawGraph(arr);
    } catch {
        console.log("No Input");
    }
}

// Remove existing graph visualization
function remove() {
    var graph = document.querySelector('svg');
    if (graph) { graph.parentElement.removeChild(graph); }
}

// Determine the direction of the new node based on its value
function nodeDirection(root, node) {
    var a = Number(node.value);
    var b = Number(root.value);
    if (a < b) {
        if (root.left == null) {
            root.left = node;
            node.isLeft = true;
        } else {
            nodeDirection(root.left, node);
        }
    } else if (a > b) {
        if (root.right == null) {
            root.right = node;
            node.isRight = true;
        } else {
            nodeDirection(root.right, node);
        }
    }
}

// Populate additional data for visualization (e.g., empty nodes)
function createData(node) {
    if (node == null) { return; }

    if (node.left) {
        node.children.push(node.left);
        node.left.parent = node;
        if (!node.right) {
            let newNode = new Node("Empty", null, null);
            newNode.isRight = true;
            node.children.push(newNode);
            newNode.parent = node;
        }
    }

    if (node.right) {
        node.children.push(node.right);
        node.right.parent = node;
        if (!node.left) {
            let newNode = new Node("Empty", null, null);
            newNode.isLeft = true;
            node.children.unshift(newNode);
            newNode.parent = node;
        }
    }

    createData(node.left);
    createData(node.right);
}

// Create binary tree nodes from input list
function createNodes(list) {
    new_list = [];

    for (var i = 0; i < list.length; i++) {
        if (list[i] == "") { continue; }
        new_list.push(new Node(list[i], null, null));
    }

    // Create and visualize the binary tree
    createTree(new_list);

    return new_list;
}