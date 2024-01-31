import React, {useEffect, useState} from 'react';
import { getTokenSpotify } from '../services/spotifyServices';
import { getTopSongs } from '../services/songServices';
import './home.css';


export function Home(){
    const [upload, setUpload] = useState(true);
    const [songs, setSongs] = useState(null);
    const [originalSongs, setOriginalSongs] = useState(null);
    const [query, setQuery] = useState('');

    useEffect(function() {
        getTokenSpotify().then(function(answerToken) {
            getTopSongs(answerToken)
            .then(function(answerSongs) {
                console.log(answerSongs);
                setUpload(false);
                setSongs(answerSongs.tracks);
                setOriginalSongs(answerSongs.tracks);
            });
        });
    }, []);

    const searchSong = () => {
        // filter songs
        const FilterSongs = originalSongs.filter((song) =>
            song.name.toLowerCase().includes(query.toLowerCase())
        );
        setSongs(FilterSongs);
    };

    const [musician, setMusician] = useState({
        name: 'AC/DC',
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Linkin_Park_in_2017.jpg/220px-Linkin_Park_in_2017.jpg',
        history: 'AC/DC are an Australian rock band formed in 1973. They were founded by brothers Malcolm Young on rhythm guitar and Angus Young on lead guitar. Their current line-up comprises Angus, bassist Cliff Williams, drummer Phil Rudd, lead vocalist Brian Johnson and rhythm guitarist Stevie Young – nephew of Angus and Malcolm. Their music has been variously described as hard rock, blues rock and heavy metal, but the band calls it simply "rock and roll". They are cited as a formative influence on the new wave of British heavy metal bands, such as Iron Maiden and Saxon. AC/DC were inducted into the Rock and Roll Hall of Fame in 2003.',
    });

    if (upload) {
        return(
            <>
                <h1>Loading...</h1>
            </>
        )
    }else{
        return(
            <>
                <section className='banner'>
                    <img src={musician.img} alt={musician.name} />
                </section>
                <section className='row justify-content-center'>
                    <h1 className='text-center my-3'>{musician.name}</h1>
                    <h3 className='text-center my-5'>History</h3>
                    <p className='text-center px-2 col-md-4'>{musician.history}</p>
                </section>
                <section className='container'>
                    <div className='row justify-content-center'>
                        <input type="text" className="form-control my-3 col-md-8" placeholder='Enter a song' value={query} onChange={(event) => setQuery(event.target.value)} />
                        <button className='btn btn-dark col-md-2' onClick={searchSong}>Search</button>
                        <h2 className='text-center my-5'>Popular Songs</h2>
                        {
                            songs.map(function (song) {
                                return (
                                    <div className="col-md-6 mb-4">
                                        <div className="card h-100 mb-2 shadow my-5 p-1">
                                            <img src={song.album.images[0].url} alt={song.name} className="card-img-top" />
                                            <h3 className='text-center my-4 mb-2 '>{song.name}</h3>
                                            <audio src={song.preview_url} controls className='w-100'></audio>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </section>

                <hr className='my-5' />

                <footer>
                    <section className='container'>
                        <section className='row'>
                            <section className='col-md-12 text-center'>
                                <p className='text-center'>All Rights Reserved</p>
                            </section>
                        </section>
                    </section>
                </footer>
            </>
        )
    }
}
