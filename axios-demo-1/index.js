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

async function updateRequest(){
    const updatedPost = {
        title:'Updated the new post',
        body:'Hello from new post',
        userId:10
    };
    //encapsulate within the try catch later
    const response = await axios.put("https://jsonplaceholder.typicode.com/posts/1", updatedPost);
    console.log("the updated request is ", response.data);
}

getData();
getDataForMoreParameters();
updateRequest();
promiseAllForConcurrentReq();
cancelRequests();
deletePosts();
errorHandlingExample();

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

async function deletePosts() {
    const response = await axios.delete("https://jsonplaceholder.typicode.com/posts/1");
    console.log("Deletion status", response.status);
}


async function errorHandlingExample() {
    try
    {
        axios.get("https://jsonplaceholder.typicode.com/unknown-endpoint");
    }
    catch(error)
    {
        if(error.response)
        {
            console.log("Error from response", error.response.status, error.response.message);
        }
        else if(error.request)
        {
            console.log("Error from request",error.request.status, error.request.message);
        }else
        {
            console.log("No request setup",error.message);
        }
    }
}