const mainContainer = document.querySelector('.child_container_tafseer');
const mainHeadContainer = document.getElementById('container_tafseer');
const tafseerSingleSuraDiv = document.querySelector('.tafseer_single_sura_div');
const loader = document.querySelector('.loader_parent_div');


async function fetchTafseer(e) {
    //All Tafseer Author Name And Tafseer API Fetch Data
    const dataFetch = await fetch(`https://cdn.jsdelivr.net/gh/spa5k/tafsir_api@main/tafsir/editions.json`);
    const response = await dataFetch.json()
    response.forEach((e, index) => {
        for (let i = 0; i < 1; i++) {
            createDiv(e, index)
        }
    });
}

function createDiv(e, index) {

    const template = `<div class="single_tafseer_div">
          <h2>${index + 1 + "."}</h2>
          <h2>${e.author_name}</h2>
          <h2>${e.language_name}</h2>
          <h2>${e.name}</h2>
        </div>`;

    const createDiv = document.createElement('div');
    createDiv.innerHTML = template;
    mainContainer.appendChild(createDiv)


    createDiv.addEventListener('click', async () => {
        tafseerSingleSuraDiv.innerHTML = '';
        //All Sura List Fetch
        const fetchData = await fetch(`https://api.quran.com/api/v4/chapters?language=bn`);
        const res = await fetchData.json()
        // console.log(res);

        for (const chapter of res.chapters) {
            await createTafseerDiv(chapter, e.slug)
        }
    })

    async function createTafseerDiv(chapter, slug) {
        const template = `
            <div class="single_sura_index " >
                <p class="sura_number">${chapter.id}.</p>
                <p class="ar">${chapter.name_arabic}</p>
                <p class="en">${chapter.name_simple}</p>
                <p class="total_ayat">Ayah: ${chapter.verses_count}</p>
            </div>
        `;

        let createDiv = document.createElement('div');
        createDiv.classList.add('tafseerText');
        createDiv.innerHTML = template;
        tafseerSingleSuraDiv.appendChild(createDiv);

        createDiv.addEventListener('click', async (e) => {
            const fetchUrl = `https://cdn.jsdelivr.net/gh/spa5k/tafsir_api@main/tafsir/${slug}/${chapter.id}.json`;
            const response = await fetch(fetchUrl)
            const tafseerData = await response.json()
            console.log(tafseerData);
        })
    }
}


fetchTafseer()