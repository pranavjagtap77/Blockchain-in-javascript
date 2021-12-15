const SHA256 = require("crypto-js/sha256");

class Block{
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.Hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash(){
            // SHA256 cryptographic function to calculate Hash
        return SHA256(this.index+this.timestamp+this.previousHash+JSON.stringify(this.data)+this.nonce).toString();
    }

    mineNewBlock(difficulty){
        while(this.Hash.substring(0,difficulty) !== Array(difficulty+1).join("0")){
            this.nonce++;
            this.Hash = this.calculateHash();
        }
            console.log("A new block is mined with hash : " + this.Hash);
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 5;
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
       // newBlock.Hash = newBlock.calculateHash();
       newBlock.mineNewBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    // New Block Object
    // Hash of the previous Block
    // calculate the hash of current block

    checkBlockchainValid(){
        for(var i=1 ; i<this.chain.length; i++){
            let currentBlock = this.chain[i];
            let previousBlock = this.chain[i-1];

            if(currentBlock.Hash !== currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.Hash){
                return false;
            }
        }
        return true;
    }
}

let block1 = new Block(1,"28/09/2021",{myBalence : 100});
let block2 = new Block(2,"29/09/2021",{myBalence : 50});

let myblockchain = new Blockchain();

console.log("The first block creation : ");
myblockchain.addBlock(block1);

console.log("The Second block creation : ");
myblockchain.addBlock(block2);


//let myblockchain = new Blockchain();

console.log(JSON.stringify(myblockchain,null,4));
/*console.log("Check for the block is valid : "+myblockchain.checkBlockchainValid());

myblockchain.chain[1].data = {myBalence : 77777};
console.log(JSON.stringify(myblockchain,null,4));
console.log("Check for the block is valid : "+myblockchain.checkBlockchainValid());
*/

