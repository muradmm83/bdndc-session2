/*
    for more information about blockexplorer.js
    go to https://www.npmjs.com/package/blockexplorer
*/
const be = require('blockexplorer');


const getBlockHash = function (index) {
    // use blockexplorer to get block hash

    return be.blockIndex(index);
}

const getBlock = function (hash) {
    // use blockexplorer to get block

    return be.block(hash);
}

const getTransactions = function (...tx) {
    // use blockexplorer to get tranasctions

    let transactionPromises = tx.map(t => be.tx(t));

    return Promise.all(transactionPromises);
}

const main = async function () {
    // run your code here, consider this as the main method in C#, Java

    let blockIndex = 2600; // you could use any index you like

    // call your functions here (getBlockHash, getBlock, & getTransactions)

    try {
        let hash = JSON.parse(await getBlockHash(blockIndex)).blockHash;
        let block = JSON.parse(await getBlock(hash));

        let tranasctions = await getTransactions(block.tx);

        console.log(tranasctions);
    } catch (err) {
        console.log(err)
    }
};

main();