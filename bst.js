const NodeFactory = (data = 0, left = null, right = null) => ({data, left, right});

const Tree = (arr = []) => {

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

    let treeRoot = buildTree(arr);

    const root = () => (treeRoot);

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

    const levelOrder = (func = undefined) => {
        
        const queue = [];
        const arr = [];
        queue.push(treeRoot);
        while(queue[0])
        {
            if(queue[0].left)
            queue.push(queue[0].left);

            if(queue[0].right)
            queue.push(queue[0].right);

            if(func)
            {
                func(queue[0]);
            }
            arr.push(queue[0].data);
            queue.shift();
        }

        if(!func)
        return arr;
    }

    const inOrder = (func = undefined,arr = [],root = treeRoot) => {

        if(root.left)
        inOrder(func,arr,root.left);
        
        if(func) func(root);
        else arr.push(root.data);

        if(root.right) inOrder(func,arr,root.right);
        
        if(!func) return arr;
    }

    const preOrder = (func = undefined, arr = [], root = treeRoot) => {
        if(func) func(root);
        else arr.push(root.data);
        if(root.left) preOrder(func,arr,root.left);
        if(root.right) preOrder(func, arr, root.right);
        if(!func) return arr;
    }

    const postOrder = (func = undefined, arr = [], root = treeRoot) => {
        if(root.left) postOrder(func,arr,root.left);
        if(root.right) postOrder(func,arr,root.right);
        if(func) func(root);
        else arr.push(root.data);

        if(!func) return arr;

    }

    const find = (value, root = treeRoot) => {

        if(root.data === value)
        return root;

        if(value < root.data)
        return find(value,root.left);

        return find(value,root.right);
    }

    const height = (node) => {

        if(!node) return -1;
        
        return 1+Math.max(height(node.left), height(node.right));
    }

    const depth = (node, root = treeRoot, d = 0) => {

        if(root.data === node.data) return d;
        if(node.data < root.data) return depth(node,root.left,d+1);
        return depth(node,root.right,d+1);

    }

    const checkBalance = (root) => {

        if(!root) return 0;
        let lh = checkBalance(root.left);
        if(lh == -1) return -1;
        let rh = checkBalance(root.right);
        if(rh == -1) return -1;

        if(Math.abs(lh - rh) > 1)
        return -1;

        return Math.max(lh,rh)+1;

    }

    const isBalanced = () => checkBalance(treeRoot) > 0;     

    const rebalance = () => {

        const arr = inOrder();
        treeRoot = {...buildTree(arr)};
        return treeRoot;
    }

    const prettyPrint = (node = treeRoot, prefix = "", isLeft = true) => {
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
    
    

    return {root,buildTree,insert,remove,levelOrder,inOrder,preOrder,postOrder,find, height,depth,isBalanced,rebalance,prettyPrint};
}

const createArray = () => {

    const arr = [];
    for(let i = 0; i < 20;i+=1)
    {
        arr.push(Math.floor(Math.random() * 100));
    }
    return arr;
}

let bst = Tree(createArray());
console.log(`Balanced : ${bst.isBalanced()}\n`);
console.log(`InOrder : ${bst.inOrder()}\nPreOrder : ${bst.preOrder()}\nPostOrder : ${bst.postOrder()}\n`);

const unbalance = () => {
    for(let i = 0; i < 10; i+=1)
    {
        bst.insert(Math.floor(Math.random()*100));
    }
}

unbalance();
console.log(`Balanced : ${bst.isBalanced()}\n`);
console.log(bst.root().data);
bst.rebalance();
console.log(bst.root().data);
console.log(`Balanced : ${bst.isBalanced()}\n`);
console.log(`InOrder : ${bst.inOrder()}\nPreOrder : ${bst.preOrder()}\nPostOrder : ${bst.postOrder()}\n`);

