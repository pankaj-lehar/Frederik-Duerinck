const fetch = require('node-fetch')
// axios.defaults.timeout = 5000;

async function findServer() {
    const mockList = require('./mock.json');

    let onlineServerResult = {
        url: "",
        priority: Infinity
    }

    const promiseList = mockList.map(item => fetchItem(item))

    await Promise.allSettled(promiseList)

    async function fetchItem(item) {
        url = item.url,
        priority = item.priority
        return fetch(`${url}`).then((response) => {
            if (response.status >= 200 && response.status < 300) {
                onlineServerResult = onlineServerResult.priority < priority ?
                    onlineServerResult : item
            }
        })
    }

    if (!onlineServerResult.url) {
        throw new Error("No servers are online .") 
    }

    console.log(onlineServerResult)
    return onlineServerResult
}

module.exports = findServer

findServer()