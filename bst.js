//remove needs to check if value is in tree, also if subtree is being deleted

const NodeFactory = (data = 0, left = null, right = null) => ({data, left, right});

const Tree = (arr = []) => {

    const inOrderArr = [];
    arr.sort();
    let i = 0;
    while(i < arr.length-1)
    {
        if(arr[i] == arr[i+1])
        {
            arr.splice(i,1);
        }
        else i++;
    }

    const buildTree = (arr) => {        
        
        if(!arr.length) return null;

        const root = NodeFactory(arr[Math.floor(arr.length/2)]);

        if(arr.length == 1) return root;

        root.left = buildTree(arr.slice(0,arr.length/2));
        root.right = buildTree(arr.slice(arr.length/2+1));

        return root;

    }

    let treeRoot = buildTree(arr);;

    const insert = (val,root = treeRoot) => {

        if(root.data === val)
        return;

        if(val < root.data)
        {
            if(root.left)
            {
                insert(val,root.left);
            }
            else {
                root.left = NodeFactory(val);
            }
        }
        else {
            if(root.right)
            {
                insert(val,root.right);
            }
            else{
                root.right = NodeFactory(val);
            }
        }
    }

    const getParent = (val, root = treeRoot) => {

        if((root.left && root.left.data === val) || (root.right && root.right.data === val))
        {
            return root;
        }

        if(val < root.data)
        return getParent(val, root.left);
        return getParent(val,root.right);
    }

    const remove = (val, root = treeRoot) => {

        if(!root) return;
        let temp,clone,parent,child;
        if(root.data === val)
        {
            if(root.left && root.right)
            {
                temp = root.right;
                while(temp.left)
                {
                    temp = temp.left;
                }
                root.data = temp.data;
                remove(temp.data,temp);
            }
            else if(root.left || root.right)
            {
                parent = getParent(val);
                if(root.left) child = root.left;
                else child = root.right;
                if(parent.left && parent.left.data === val)
                {
                    clone = JSON.parse(JSON.stringify(child));
                    parent.left = null;
                    parent.left = clone;
                    clone = '';
                }
                else 
                {
                    clone = JSON.parse(JSON.stringify(child));
                    parent.right = null;
                    parent.right = clone;
                    clone = '';
                }
            }
            else{
                temp = getParent(val);
                if(temp.left && temp.left.data === val)
                {
                    temp.left = null;
                }
                else temp.right = null;
            }
            return;
        }

        if(val < root.data)
        remove(val,root.left);
        else remove(val,root.right);

    }

    const levelOrder = () => {
        
        const queue = [];
        const arr = [];
        queue.push(treeRoot);
        while(queue[0])
        {
            if(queue[0].left)
            queue.push(queue[0].left);

            if(queue[0].right)
            queue.push(queue[0].right);

            arr.push(queue[0].data);
            queue.shift();
        }

        return arr;
    }

    const inOrder = (func,arr = [],root = treeRoot) => {

        if(root.left)
        inOrder(func,arr,root.left);
        
        func(root.data);
        arr.push(root.data);

        if(root.right) inOrder(func,arr,root.right);
        
        return arr;
    }
    

    return {treeRoot,buildTree,insert,remove,levelOrder,inOrder};
}

const bst1 = Tree([0,1,2,3,4]);

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

// bst1.insert(1.5);
// bst1.insert(2.5);
// bst1.insert(3);
// bst1.insert(3.75);
// bst1.insert(0);
// bst1.insert(.5);
// prettyPrint(bst1.treeRoot);
// bst1.remove(4);
prettyPrint(bst1.treeRoot);