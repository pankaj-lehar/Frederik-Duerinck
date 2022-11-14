require('jest-fetch-mock').enableMocks()

const findServer = require('./index')

const url1 = "https://does-not-work.perfume.new";
const url2 = "https://gitlab.com";
const url3 = "http://app.scnt.me";
const url4 = "https://offline.scentronix.com";

it('All servers available', async () => {
    fetch.mockResponseOnce(JSON.stringify({url:url1,status:200 }));
    fetch.mockResponseOnce(JSON.stringify({url:url2,status:200 }));
    fetch.mockResponseOnce(JSON.stringify({url:url3,status:200 }));
    fetch.mockResponseOnce(JSON.stringify({url:url4,status:200 }));


    const result = await findServer()
    
    expect(result).toEqual({ url: url1, priority: 1 })
})

it('Second and third server available', async () => {
    fetch.mockResponseOnce(JSON.stringify({url:url1,status:402 }));
    fetch.mockResponseOnce(JSON.stringify({url:url2,status:200 }));
    fetch.mockResponseOnce(JSON.stringify({url:url3,status:200 }));
    fetch.mockResponseOnce(JSON.stringify({url:url4,status:402 }));
 

    const result = await findServer()
    
    expect(result).toEqual({ url: url3, priority: 3 })
})

it('All servers offline', async () => {
    fetch.mockResponseOnce(JSON.stringify({url:url1,status:402 }));
    fetch.mockResponseOnce(JSON.stringify({url:url2,status:402 }));
    fetch.mockResponseOnce(JSON.stringify({url:url3,status:402 }));
    fetch.mockResponseOnce(JSON.stringify({url:url4,status:402 }));

    const promise = findServer()
    
   await expect(promise).rejects.toThrowError("No servers are online")
})