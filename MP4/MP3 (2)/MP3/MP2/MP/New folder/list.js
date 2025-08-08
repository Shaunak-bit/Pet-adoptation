// const product = [
//     {
//         id: 1,
//         image: 'dog1.png',
//         title: 'Dog1',
//         category: 'dog'
//     },
//     {
//         id: 2,
//         image: 'Dog 8.jpeg',
//         title: 'Dog2',
//         category: 'dog'
//     },
//     {
//         id: 3,
//         image: 'indian-dog.webp',
//         title: 'Dog3',
//         category: 'dog'
//     },
//     {
//         id: 4,
//         image: 'Dog4.jpeg',
//         title: 'Cat1',
//         category: 'cat'
//     },
//     {
//         id: 5,
//         image: 'Cat3.jpeg',
//         title: 'Cat2',
//         category: 'cat'
//     },
   
// ];

const gallery = document.querySelector('.gallery');

gallery.innerHTML = product.map((item) => {
    return `
        <div class="content" data-category="${item.category}">
            <img src="${item.image}" alt="${item.title}">
            <p>${item.title}</p>
            <button class="card-btn">Adopt</button>
        </div>
    `;
}).join('');



const filterDropdown = document.getElementById('categoryFilter');

filterDropdown.addEventListener('change', function () {
    const selected = this.value;
    const items = document.querySelectorAll('.gallery .content');

    items.forEach(item => {
        const category = item.getAttribute('data-category');
        if (selected === '1' || selected === 'all') {
            item.style.display = 'block';
        } else if (selected === '2' && category === 'dog') {
            item.style.display = 'block';
        } else if (selected === '3' && category === 'cat') {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
});



