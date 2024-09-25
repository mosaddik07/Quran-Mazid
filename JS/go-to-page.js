const form = document.querySelector('form')
const suraNo = document.getElementById('sura_numb');
const ayatNo = document.getElementById('ayat_numb');
const submitButton = document.getElementById('submit_btn');
const result = document.querySelector('.result_text');
const searchDiv = document.querySelector('.child_container_go_to_page');


form.addEventListener('submit', async (e) => {
    e.preventDefault()

    //input Validation checking...
    if (!suraNo.value || !ayatNo.value) {
        alert('Both Surah and Ayah numbers are required');
        return
    }

    const suraNumb = parseInt(suraNo.value);
    const ayatNumb = parseInt(ayatNo.value);

    //  সুরা নম্বর ১ থেকে ১১৪ এবং আয়াত নম্বর ১ বা এর বেশি হতে হবে
    if (isNaN(suraNumb) || suraNumb < 1 || suraNumb > 114) {
        alert("Please enter a valid Surah number (between 1 and 114)");
        return
    }

    if (isNaN(ayatNumb) || ayatNumb < 1) {
        alert('Please enter a valid Ayah number (1 or greater)');
        return;
    }

    const url = `https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ara-quranacademy/${suraNumb}/${ayatNumb}.json`;

    try {
        const fetchData = await fetch(url);
        // If status is not 200 (e.g. 404, 500), throw an error
        if (!fetchData.ok) {
            throw new Error('Ayah not found');
        }
        const response = await fetchData.json();
        searchDiv.style.display = "none";
        result.style.display = "block";


        result.textContent = response.text;
    } catch (error) {
        // If there is an error (e.g. Surah or Ayah not found)
        alert('Please enter a valid Surah and Ayah number.');
        console.error('Error:', error);
    }
})