const tafseerDisplay = document.querySelector('.tafseer_display')
document.addEventListener('DOMContentLoaded', () => {
    tafseerDisplay.innerHTML = localStorage.getItem('templates')
})