const mainContainer = document.querySelector('.para_index_conteiner');
const resultPara = document.querySelector('.result_para');

// Function to convert English numbers to Arabic
function convertToArabicNumbers(number) {
    const arabicDigits = '٠١٢٣٤٥٦٧٨٩';
    return number.toString().split('').map(digit => arabicDigits[digit] || digit).join('');
}

function createDiv(h3) {
    const createDiv = document.createElement('div');
    const template = `<h2 id="index_numb">${h3}</h2>`;

    createDiv.classList.add('para_index_single_div');
    createDiv.innerHTML = template;
    mainContainer.appendChild(createDiv);

    createDiv.addEventListener('click', async () => {
        const h2Element = createDiv.querySelector('h2');
        try {
            const dataFetch = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ara-quranbazzi/juzs/${h2Element.innerHTML}.json`);

            const response = await dataFetch.json();

            // Clear previous results
            resultPara.innerHTML = '';

            // Hide all para_index_single_div elements
            document.querySelectorAll('.para_index_single_div').forEach(div => {
                div.style.display = 'none';
            });

            // Display each ayah with a border and index number in Arabic
            response.juzs.forEach((e, index) => {
                const ayahDiv = document.createElement('div');
                ayahDiv.classList.add('ayah_div');

                // Set index number in Arabic and add ayah text
                ayahDiv.innerHTML = `
                    <div class="ayah_index">${convertToArabicNumbers(index + 1)}</div>
                    <div class="ayah_text">${e.text}</div>
                `;

                resultPara.appendChild(ayahDiv);
            });

            resultPara.style.display = "block";
            mainContainer.style.backgroundImage = "white"


        } catch (error) {
            console.log("Error", error);
        }
    });
}

for (let i = 1; i <= 30; i++) {
    createDiv(i);
}
