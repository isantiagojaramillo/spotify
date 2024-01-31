export async function getTopSongs(token){

    try {
        const URL_TOPTRACKS_SERVICE = "https://api.spotify.com/v1/artists/711MCceyCBcFnzjGY4Q7Un/top-tracks?market=us";
        const REQUEST_SONGS = {
            method:"GET",
            headers:{ "Authorization": token }
        };

        let answerService = await fetch(URL_TOPTRACKS_SERVICE, REQUEST_SONGS);
        if (!answerService.ok) {
            throw new Error(`Error getting songs ${answerService.statusText}`);
        }
        let songs = await answerService.json();
        return songs;

    } catch (error) {
        console.error("Error getting songs: ", error);
        throw error;
    }



}
