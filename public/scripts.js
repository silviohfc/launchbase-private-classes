const currentPage = location.pathname
const menuItems = document.querySelectorAll("header a")

for (item of menuItems) {
    if (currentPage.includes(item.getAttribute("href"))) {
        item.classList.add("active")
    }
}

function paginate(selectedPage, totalPages) {
    let pages = [],
        oldPage

    for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
        const firstAndLastPage = currentPage <= 2 || currentPage >= totalPages - 1
        const pagesAfterSelectedPage = currentPage <= selectedPage + 1
        const pagesBeforeSelectedPage = currentPage >= selectedPage - 1

        if (firstAndLastPage || pagesAfterSelectedPage && pagesBeforeSelectedPage) {
            if (oldPage && currentPage - oldPage > 2) {
                pages.push("...")
            }

            if (oldPage && currentPage - oldPage == 2) {
                pages.push(oldPage + 1)
            }

            if (currentPage == 1) {
                pages.push("<")
            }

            pages.push(currentPage)

            if (currentPage == totalPages) {
                pages.push(">")
            }
            
            oldPage = currentPage
        }
    }

    return pages
}
function createPagination(pagination) {
    const selectedPage = +pagination.dataset.page
    const total = +pagination.dataset.total
    const filter = pagination.dataset.filter
    
    const pages = paginate(selectedPage, total)
    
    let elements = ""
    
    for (let page of pages) {
        if(String(page).includes("...") || String(page).includes("<") || String(page).includes(">")) {
            elements += `<span>${page}</span>`
        } else if (page == selectedPage) {
            elements += `<a class="active" href="#">${page}</a>`
        } else if (filter) {
            elements += `<a href="?page=${page}&filter=${filter}">${page}</a>`
        } else {
            elements += `<a href="?page=${page}">${page}</a>`
        }
    }
    
    pagination.innerHTML = elements
}

const pagination = document.querySelector(".pagination")

if (pagination) {
    createPagination(pagination)
}