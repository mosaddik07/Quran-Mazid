const loader = document.querySelector('.loader_parent_div')
document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search)
    const chapterNumber = urlParams.get('chapter_number');

    if (chapterNumber) {
        loader.classList.add('show')
        suraFecth(chapterNumber);
    } else {
        {
            document.getElementById('read_quran').innerHTML = '<p>No chapter selected.</p>';
        }
    }
});

async function suraFecth(index) {
    try {
        const url = `https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=${index}`
        const url2 = `https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/eng-miraneesorigina/${index}.json`;


        const versesContainer = document.getElementById('read_quran');

        const fetchData = await fetch(url);
        const response = await fetchData.json();

        response.verses.forEach(async (e, index) => {
            const fetchData = await fetch(url2);
            const response = await fetchData.json();


            const indexNumb = (index + 1).toLocaleString('ar-EG');
            const verseElement = document.createElement('p');
            verseElement.classList.add('sura_text');
            verseElement.textContent = indexNumb + "_ " + e.text_uthmani;
            versesContainer.appendChild(verseElement);

            const tafseerBtn = document.createElement('button');
            tafseerBtn.innerHTML = "See Tafseer  ↓";
            tafseerBtn.classList.add('tafseerBtn')
            versesContainer.appendChild(tafseerBtn)


            const verseElement2 = document.createElement('p');
            verseElement2.classList.add('sura_text_english');
            verseElement2.textContent = index + 1 + ". " + response.chapter[index].text;
            versesContainer.appendChild(verseElement2);

            let originalText = verseElement2.textContent;
            let tafseerVisible = false;


            tafseerBtn.addEventListener('click', async (element) => {

                if (!tafseerVisible) {

                    loader.classList.add('show')
                    const input = e.verse_key;
                    const suraNo = input.split(':')[0];
                    const ayatNo = input.split(':')[1];

                    const url = `https://cdn.jsdelivr.net/gh/spa5k/tafsir_api@main/tafsir/bn-tafseer-ibn-e-kaseer/${suraNo}/${ayatNo}.json`

                    try {
                        const tafseerFetch = await fetch(url)
                        const response = await tafseerFetch.json()
                        verseElement2.textContent = response.text;
                        tafseerVisible = true;
                        tafseerBtn.textContent = `Hide fTafseer ↑`

                    } catch (error) {
                        console.error('Error fetching tafseer:', error)
                        verseElement2.textContent = 'Error loading tafseer.';

                    } finally {
                        loader.classList.remove('show')
                    }
                } else {

                    tafseerBtn.textContent = 'Show Tafseer ↓';
                    tafseerVisible = false;
                    verseElement2.textContent = originalText;
                    loader.classList.remove('show');
                }
            })
        });

    } catch (error) {
        console.error("Error fetching verses:", error);
        document.getElementById('read_quran').innerHTML = '<p>Error loading verses.</p>';
    } finally {
        document.querySelector('.loader_parent_div').classList.remove('show')
    }
}

// idea:_____Font Family Change-------------
const fontFamilyChange = document.querySelector('.font_family_change');

const fonts = [
    '"Amiri", serif',
    '"Amiri Quran", serif',
    '"Lateef", serif',
    '"Markazi Text", serif',
    '"Scheherazade New", serif'
];

let currentFontIndex = 0;

fontFamilyChange.addEventListener('click', () => {
    currentFontIndex = (currentFontIndex + 1) % fonts.length;
    document.documentElement.style.setProperty("--amiri", fonts[currentFontIndex]);
});


// info:___________Back Page_________
function backPageBtn() {
    window.history.back()
}