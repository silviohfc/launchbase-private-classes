const cards = document.querySelectorAll('.card_course')

for (let card of cards) {
    card.addEventListener('click', () => {
        const courseId = card.id
        window.location.href = `/courses/${courseId}`
    })
}