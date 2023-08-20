const fetchButton = document.getElementById('fetchButton');
const artistNameInput = document.getElementById('artistName');
const songList = document.getElementById('songList');
const audioPlayer = document.getElementById('audioPlayer');

fetchButton.addEventListener('click', fetchAndPlay);

function fetchAndPlay() {
    const artistName = artistNameInput.value;
    if (!artistName) {
        alert('Please enter an artist name.');
        return;
    }

    const apiUrl = `https://itunes.apple.com/search?term=${encodeURIComponent(artistName)}&entity=song`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            songList.innerHTML = '';
            data.results.forEach(song => {
                const li = document.createElement('li');
                li.textContent = `${song.trackName} - ${song.artistName}`;
                li.addEventListener('click', () => playSong(song.previewUrl));
                songList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert('An error occurred while fetching data.');
        });
}

function playSong(previewUrl) {
    audioPlayer.src = previewUrl;
    audioPlayer.play();
}
// // Replace 'YOUR_API_KEY' with your actual API key
// const apiKey = 'YOUR_API_KEY';
// const songCodes = ['songCode1', 'songCode2', 'songCode3']; // Replace with actual song codes

// const playlistContainer = document.getElementById('playlist');

// // Loop through song codes and fetch song data from the API
// songCodes.forEach(songCode => {
//   fetch(`https://api.example.com/songs/${songCode}?apikey=${apiKey}`)
//     .then(response => response.json())
//     .then(songData => {
//       const songTitle = songData.title;
//       const artist = songData.artist;
//       const audioUrl = songData.audioUrl;

//       const songElement = document.createElement('div');
//       songElement.innerHTML = `
//         <h3>${songTitle}</h3>
//         <p>${artist}</p>
//         <audio controls>
//           <source src="${audioUrl}" type="audio/mpeg">
//           Your browser does not support the audio element.
//         </audio>
//       `;

//       playlistContainer.appendChild(songElement);
//     })
//     .catch(error => {
//       console.error('Error fetching song data:', error);
//     });
// });