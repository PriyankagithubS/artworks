let currentIndex = 0;
let artworks = [];

const fetchArtworks = () => {
    fetch('https://api.artic.edu/api/v1/artworks')
        .then(response => response.json())
        .then(data => {
            artworks = data.data;
            displayArtwork(currentIndex);
        })
        .catch(error => {
            console.error('Error fetching the artworks:', error);
        });
};
const displayArtwork = (index) => {
    if (artworks.length === 0) return;

    const artwork = artworks[index];
    document.getElementById('artwork-title').textContent = artwork.title;
    document.getElementById('artwork-image').src = `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`;
    document.getElementById('artwork-artist').textContent = `Artist: ${artwork.artist_display}`;
    document.getElementById('artwork-date').textContent = `Date: ${artwork.date_display}`;
    document.getElementById('artwork-description').textContent = artwork.thumbnail.alt_text;
    document.getElementById('place-origin').textContent = artwork.place_of_origin;
};

document.getElementById('next-button').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % artworks.length;
    displayArtwork(currentIndex);
});

fetchArtworks();
