const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/

// https://www.geeksforgeeks.org/implementation-binary-search-tree-javascript/
class BinarySearchTree {
  constructor() {
    this.rootElement = null
  }

  root() {
    return this.rootElement ? this.rootElement : null
  }

  add(data) {
    this.rootElement = insertNode(this.rootElement, data)

    function insertNode(node, data){
      if (!node) {
        return new Node(data)
      }
      if (node.data === data) {
        return node
      }
      if (data < node.data) {
        node.left = insertNode(node.left, data)
      } else {
        node.right = insertNode(node.right, data)
      }
      return node
    }
  }

  has(data) {
    return searchWithIn(this.rootElement, data);

    function searchWithIn(node, data) {
      if (!node) {
        return false
      }

      if (node.data === data) {
        return true
      }

      return node.data > data ? searchWithIn(node.left, data) : searchWithIn(node.right, data)

    }
  }

  find(data) {
    return findData(this.rootElement, data)

    function findData(node, data) {
      if (!node) {
        return node
      }
      if (node.data === data) {
        return node
      }
      return node.data < data ? findData(node.right, data) : findData(node.left, data)
    }
  }

  remove(data) {
    this.rootElement = removeNode(this.rootElement, data);

    function removeNode(node, data) {
      if (!node) {
        return null
      }
      if (data < node.data) {
        node.left = removeNode(node.left, data)
        return node;
      } else if (node.data < data) {
        node.right = removeNode(node.right, data)
        return node
      } else {
        if (!node.left && !node.right) {
          return null
        }

        if (!node.left) {
          node = node.right
          return node
        }

        if (!node.right) {
          node = node.left
          return node
        }

        let minFromRight = node.right;
        while (minFromRight.left) {
          minFromRight = minFromRight.left;
        }
        node.data = minFromRight.data;
        node.right = removeNode(node.right, minFromRight.data)
        return node
      }
    }
  }


  min() {
    if (!this.rootElement) {
      return null;
    }
    let current = this.rootElement;
    while (current.left) {
      current = current.left;
    }
    return current.data;
  }

  max() {
    if (!this.rootElement) {
      return null;
    }
    let current = this.rootElement;
    while (current.right) {
      current = current.right;
    }
    return current.data;
  }
}

module.exports = {
  BinarySearchTree
};