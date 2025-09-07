
const cartConteinar = document.getElementById('cart-conteiner');

cartConteinar.addEventListener('click', (evt) => {
    if(evt.target.localName === 'h3'){
        // console.log(evt.target.id)
        showModal(evt.target.id)
    }
    if(evt.target.localName === 'button'){
        console.log(evt.target)
    }
})


const showModal = (id) => {
    document.getElementById('my_modal_5').showModal();
    // console.log(id);
const plantsDetailUrl = `https://openapi.programming-hero.com/api/plant/${id}`;
    fetch(plantsDetailUrl)
    .then(response => response.json())
    .then(data => {
        console.log(data.plants);
        const plants = data.plants;
        const modalCart = document.getElementById('modal-cart');
        modalCart.innerHTML = `
            <h3 class="text-xl font-semibold">${plants.name}</h3>
            <img class="w-full h-[220px] object-cover rounded-md" src="${plants.image}" alt="">
            <span class=" block"><b>Category: </b>${plants.category}</span>
            <span class="block"><b>Price: </b>৳${plants.price}</span>
            <p class=""><b>Description: </b>${plants.description}</p>
        `
})
}

// All Plants Conteinar function 
const allPlantsUrl = 'https://openapi.programming-hero.com/api/plants';
fetch(allPlantsUrl)
.then(response => response.json())
.then(allPlants => {
    allPlantsShow(allPlants.plants)
})

const allPlantsShow = (allPlants) => {
    // const cartConteinar = getID('cart-conteiner')
    allPlants.forEach(plant => {
        // console.log(plant.id)
        cartConteinar.innerHTML += `
            <div class="cart bg-[#FFFFFF] rounded-lg p-4 space-y-3">
                    <img class="w-full h-40 object-cover rounded-md" src="${plant.image}" alt="">
                    <div class="cart-content space-y-2">
                        <h3 id="${plant.id}" class="text-[14px] text-[#1F2937] font-semibold">${plant.name}</h3>
                        <p class="text-[12px] text-[#1F2937] line-clamp-3">${plant.description}</p>
                        <div class="flex justify-between">
                            <span class="text-sm text-[#15803D] font-medium bg-[#DCFCE7] py-[6px] px-3 rounded-2xl">${plant.category}</span>
                            <span class="text-sm text-[#1F2937] font-semibold">৳${plant.price}</span>
                        </div>
                    </div>
                    <button class="bg-[#15803D] text-[#FFFFFF] font-medium w-full h-[44px] rounded-3xl cursor-pointer hover:bg-[#0f5529]">Add to Cart</button>
            </div>
        `
    })
}

// All categories function 

const categoriesUrl = 'https://openapi.programming-hero.com/api/categories';
fetch(categoriesUrl)
.then(response => response.json())
.then(data => {
    categoriesShow(data.categories);
})

const categoriesShow = (categories) => {
    // console.log(categories);
    const categoryContainer = document.getElementById('categories-conteinar');
    categories.forEach(category => {
        categoryContainer.innerHTML +=`
            <li id="${category.id}" class="categories-btn font-medium text-black hover:text-[#FFFFFF] hover:bg-[#15803D] p-2 mb-1 rounded-lg cursor-pointer">${category.category_name}</li>
        `
    })
    
    categoryContainer.addEventListener('click', (evt) => {
        const categoryList = document.querySelectorAll('.categories-btn');
        categoryList.forEach(list => {
            // console.log(list.id)
            list.classList.remove('bg-[#15803D]', 'text-[#FFFFFF]');
        })
        if(evt.target.localName === 'li'){
            evt.target.classList.remove('text-black');
            evt.target.classList.add('bg-[#15803D]', 'text-[#FFFFFF]');
            categoryCart(evt.target.id)
        }
    })
}

const categoryCart = (id) => {
    const categoryCartUrl = `https://openapi.programming-hero.com/api/category/${id}`;
    // console.log(categoryCartUrl);
    fetch(categoryCartUrl)
    .then(response => response.json())
    .then(data => {
        // console.log(data.plants);
        showCategoryCart(data.plants)
    })
}

const showCategoryCart = (plants) => {
    cartConteinar.innerHTML = '';
    plants.forEach(plant => {
        cartConteinar.innerHTML += `
            <div class="cart bg-[#FFFFFF] rounded-lg p-4 space-y-3">
                    <img class="w-full h-40 object-cover rounded-md" src="${plant.image}" alt="">
                    <div class="cart-content space-y-2">
                        <h3 id="${plant.id}" class="text-[14px] text-[#1F2937] font-semibold">${plant.name}</h3>
                        <p class="text-[12px] text-[#1F2937] line-clamp-3">${plant.description}</p>
                        <div class="flex justify-between">
                            <span class="text-sm text-[#15803D] font-medium bg-[#DCFCE7] py-[6px] px-3 rounded-2xl">${plant.category}</span>
                            <span class="text-sm text-[#1F2937] font-semibold">৳${plant.price}</span>
                        </div>
                    </div>
                    <button class="bg-[#15803D] text-[#FFFFFF] font-medium w-full h-[44px] rounded-3xl cursor-pointer hover:bg-[#0f5529]">Add to Cart</button>
            </div>
        `
    })
}

