export async function getTokenSpotify(){

    //1. prepare (where to?, to do what? and what data?)
    const URL_TOKEN_SERVICE = "https://accounts.spotify.com/api/token";
    const METHOD_HTTP = "POST";
    const CLIENT_ID = "49fad88f5c2947ef877e9379b51433ea";
    const CLIENT_SECRET = "e4faf36b851e409f9becd13975afc4aa";
    const GRANT_TYPE = "client_credentials";

    const REQUEST_TOKEN={
        method: METHOD_HTTP,
        headers:{
            "Content-type": "application/x-www-form-urlencoded"
        },
        body: `grant_type=${GRANT_TYPE}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
    }

    try {
        //2. start communication and go to the backend with the request
        let answerServer=await fetch(URL_TOKEN_SERVICE, REQUEST_TOKEN);
        if (!answerServer.ok) {
            throw new Error(`Error getting token: ${answerServer.statusText}`);
        }
        let answerToken = await answerServer.json();
    
        //3. deliver the result to the component to print it on screen.
        console.log(answerServer); 
        // return answerToken;
        return `${answerToken.token_type} ${answerToken.access_token}`;
        
    } catch (error) {
        console.error("Error getting token: "+ error);
    }

}