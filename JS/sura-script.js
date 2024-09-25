const suraContainer = document.getElementById("sura-container");
const headSuraContainer = document.createElement('div');
headSuraContainer.classList.add('head_sura_conteiner');
suraContainer.appendChild(headSuraContainer);

async function fetchData() {
    try {
        const response = await fetch("https://api.quran.com/api/v4/chapters?language=bn");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json()
        result.chapters.forEach(chapter => {
            createSingleDiv(chapter)
        });

        // Add Event Listener When Click Any Div & Fetch Data
        const allP = document.querySelectorAll('.single_sura_index ')
        allP.forEach((e, index) => e.addEventListener('click', (e) => {
            window.location.href = `read-quran.html?chapter_number=${index + 1}`;
        }));

    } catch (error) {
        console.error("There was a problem with the fetch operation:", error)

    }
}
fetchData()
function createSingleDiv(chapter) {
    const template = `
        <div class="single_sura_index">
            <p class="sura_number">${chapter.id}.</p>
            <p class="ar">${chapter.name_arabic}</p>
            <p class="en">${chapter.name_simple}</p>
            <p class="total_ayat">Ayah: ${chapter.verses_count}</p>
            <p class="revelation_place">Rev. Pl.: ${chapter.revelation_place}</p>
        </div>
    `;

    headSuraContainer.insertAdjacentHTML('beforeend', template);
}