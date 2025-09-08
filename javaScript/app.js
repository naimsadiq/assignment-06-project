
const cartConteinar = document.getElementById('cart-conteiner');
let price = 0;

cartConteinar.addEventListener('click', (evt) => {
    if(evt.target.localName === 'h3'){
        showModal(evt.target.id)
    }
    if(evt.target.localName === 'button'){
        addCart(evt.target.id)
    }
})

const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("cart-show-conteinar").classList.add("hidden");
  } else {
    document.getElementById("cart-show-conteinar").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};



const addCartList = document.getElementById('add-cart-list');
addCartList.addEventListener('click', (evt) => {
    if(evt.target.localName === 'i'){
        const cartList = evt.target.parentNode.parentNode;
        let cartIteamPrice = parseInt(evt.target.parentNode.parentNode.childNodes[1].childNodes[3].childNodes[1].innerText);
        price -= cartIteamPrice;
        document.getElementById('total-price').innerText = price;
        cartList.remove();
    }
})


const addCart = (id) => {
    const addCartUrl = `https://openapi.programming-hero.com/api/plant/${id}`;
    fetch(addCartUrl)
    .then(response => response.json())
    .then(data => {
        const plants = data.plants;
        const addCartList = document.getElementById('add-cart-list');
        addCartList.innerHTML += `
            <div class="cart-list bg-[#F0FDF4] py-2 px-3 flex justify-between items-center rounded-lg my-2 space-y-2">
                <div>
                    <h4 class="text-sm text-[#1F2937] font-semibold mb-1">${plants.name}</h4>
                    <div class="text-[#1F2937]">৳<span id="available-price">${plants.price}</span></div>
                </div>
                <div class="delete-icon">
                    <i class="fa-solid fa-xmark text-red-500 cursor-pointer"></i>
                </div>
            </div>
        `
    alert(`${plants.name} has been added to the cart. `);
    const totalPrice = document.getElementById('total-price');
    price += plants.price;
    totalPrice.innerText = price;
})
}


const showModal = (id) => {
    document.getElementById('my_modal_5').showModal();
const plantsDetailUrl = `https://openapi.programming-hero.com/api/plant/${id}`;
    fetch(plantsDetailUrl)
    .then(response => response.json())
    .then(data => {
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
manageSpinner(true);
// All Plants Conteinar function 
const allPlantsUrl = 'https://openapi.programming-hero.com/api/plants';
fetch(allPlantsUrl)
.then(response => response.json())
.then(allPlants => {
    allPlantsShow(allPlants.plants)
})

const allPlantsShow = (allPlants) => {
    allPlants.forEach(plant => {
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
                    <button id="${plant.id}" class="bg-[#15803D] text-[#FFFFFF] font-medium w-full h-[44px] rounded-3xl cursor-pointer hover:bg-[#0f5529]">Add to Cart</button>
            </div>
        `
    })
    manageSpinner(false);
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
            <li id="${category.id}" class="md:w-full w-[150px]  shadow-lg shadow-indigo-500/20  sm:shadow-none flex justify-center items-center md:flex-none md:justify-start categories-btn font-medium md:text-base text-sm text-black md:hover:text-[#FFFFFF] hover:bg-[#15803D] p-2 mb-1 rounded-lg cursor-pointer">${category.category_name}</li>
        `
    })
    
    categoryContainer.addEventListener('click', (evt) => {
        const categoryList = document.querySelectorAll('.categories-btn');
        categoryList.forEach(list => {
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
    fetch(categoryCartUrl)
    .then(response => response.json())
    .then(data => {
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
                    <button id="${plant.id}" class="bg-[#15803D] text-[#FFFFFF] font-medium w-full h-[44px] rounded-3xl cursor-pointer hover:bg-[#0f5529]">Add to Cart</button>
            </div>
        `
    })
}