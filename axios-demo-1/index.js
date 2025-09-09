const axios = require('axios'); //import also works the same

async function getData()
{
    try
    {
        const response = axios.get(""); //http request made
        console.log((await response).data);
    }
    catch (error)
    {
        console.error("Erro during the fetching of url", error.message);
    }
}

async function getDataForMoreParameters() {
    const newPost =  {
        title:'My new post',
        body: 'Hello post',
        userId: 1
    };
    const response = await axios.post("https://jsonplaceholder.typicode.com/posts",newPost);
    console.log("the request response is ", response.data);
}

getData();
getDataForMoreParameters();
promiseAllForConcurrentReq();
cancelRequests();

async function promiseAllForConcurrentReq(){
    const [post1,post2] = await Promise.all(
        [
            //array of objects where you can specify the things you wish to perform
            axios.get('https://jsonplaceholder.typicode.com/posts/1'),
            axios.get('https://jsonplaceholder.typicode.com/posts/2')
        ]
    );
    console.log(post1.data, post2.data);
}

async function cancelRequests() {
    const controller = new AbortController();

    setTimeout(() => controller.abort(), 1000);//cancel after 1s (1000ms
    
    try{
        await axios.get('https://jsonplaceholder.typicode.com/posts/1',{
            signal:controller.signal
        });
    }
    catch(error)
        {
            console.error('Request canceled:', error.message);
        }
}