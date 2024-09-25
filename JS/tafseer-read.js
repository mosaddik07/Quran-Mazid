window.addEventListener('DOMContentLoaded', () => {
    const storedAyah = localStorage.getItem('tafseerAyah');

    if (storedAyah) {
        const ayahs = JSON.parse(storedAyah);
        // displayTafseerAyah(ayahs);
    } else {
        console.log('No Tafseer data found in localStorage.');
    }
});

// function displayTafseerAyah(ayahs) {
//     const tafseerDisplay = document.querySelector('.tafseer_display');
//     tafseerDisplay.innerHTML = ''; // আগের ডেটা ক্লিয়ার

//     ayahs.forEach(ayah => {
//         const p = document.createElement('p');
//         p.textContent = ayah;
//         tafseerDisplay.appendChild(p);
//     });
// }
