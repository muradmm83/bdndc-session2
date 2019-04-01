const createPromise = (value, time) => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            if (value >= 0) res(value);
            else rej('Value was less than zero!');
        }, time);
    });
}

// using promise the old way
createPromise(10, 3000)
    .then(v => console.log(v))
    .catch(err => console.log(err));

// chaining promises
/*
    v1: returned from first promise (10, 1000)
    v2: returned from second promise (v1 + 5, 3000)
    v3: returned from third promise (v2 + 5, 2000)

    Any rejection will immedialty go to catch and halt any furhten execution
*/
createPromise(10, 1000)
    .then(v1 => {
        return createPromise(v1 + 5, 3000)
    })
    .then(v2 => {
        return createPromise(v2 + 5, 2000)
    })
    .then(v3 => console.log(v3))
    .catch(err => console.log(err));

// chainin promises - invoke a rejection 
/*
    v1: returned from first promise (10, 1000)
    v2: returned from second promise (v1 - 100, 3000) will reject
    v3: returned from third promise (v2 + 5, 2000)

    Any rejection will immedialty go to catch and halt any furhten execution

    Note: this chaining will completes before the first one, try to think why :)
*/
createPromise(10, 1000)
    .then(v1 => {
        return createPromise(v1 - 100, 3000)
    })
    .then(v2 => {
        return createPromise(v2 + 5, 2000)
    })
    .then(v3 => console.log(v3))
    .catch(err => console.log(err));

// using prmises with async & way which I'm totally inlove with

const promisesOnSteroid = async () => {
    try {
        let v1 = await createPromise(10, 1000);
        let v2 = await createPromise(10, 2000);
        let v3 = await createPromise(10, 2000);
        let v4 = await createPromise(10, 2000);
        let v5 = await createPromise(10, 2000);

        console.log(v1 + v2 + v3 + v4 + v5)
    } catch (err) { // rejection will be catched here

    }
}

promisesOnSteroid();

/*
    pro tip: You can use Promise.all(...arryOfPrmises) and will resovle to an array of values
    resulted from each promise resolve, otherwise it will reject as soon as one promise rejects
*/

const promiseAll = async () => {
    try {
        let promises = [];

        for (let i = 1; i <= 100; i++) {
            promises.push(createPromise(i, 1000));
        }

        let result = await Promise.all(promises);

        console.log(result);
    } catch (err) {
        console.log(err);
    }
}

promiseAll();