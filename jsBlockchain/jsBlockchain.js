const SHA256 = require("crypto-js/sha256");

class Block{
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.Hash = this.calculateHash();
    }

    calculateHash(){
            // SHA256 cryptographic function to calculate Hash
        return SHA256(this.index+this.timestamp+this.previousHash+JSON.stringify(this.data)).toString();
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(0, "28/09/2021" , "This is genesis Block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length-1];
    }

    // newBlock = new Block();

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().Hash;
        newBlock.Hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    // New Block Object
    // Hash of the previous Block
    // calculate the hash of current block
}

let block1 = new Block(1,"28/09/2021",{myBalence : 100});
let block2 = new Block(2,"29/09/2021",{myBalence : 50});

let myblockchain = new Blockchain();

myblockchain.addBlock(block1);
myblockchain.addBlock(block2);


//let myblockchain = new Blockchain();

console.log(JSON.stringify(myblockchain,null,4));
