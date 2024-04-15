import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.scss';

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav ul')

menuToggle.addEventListener('click', function(){
    nav.classList.toggle('slide'); 
});
menuToggle.addEventListener('keypress', function(event) {
    if (event.keyCode === 13) {
        nav.classList.toggle('slide');
    }
});
const getRestaurant = async () => {
    try{
        const response = await fetch('./data/DATA.json');
        const resJSON = await response.json();
        const restaurants = resJSON.restaurants;
        let idx = 6;
        restaurants.forEach(r => {
            document.querySelector('.container-list-resto').innerHTML += `
                <div class="card" tabindex="${idx}">
                    <div class="card-head">
                        <div class="card-kota">
                            <p>${r.city}</p>
                        </div>
                        <img src="${r.pictureId}" alt="Foto Restoran ${r.name}" class="card-img">
                    </div>

                    <div class="card-body">
                        <p class="card-rate">Rating: ${r.rating}</p>
                        <p class="card-name">${r.name}</p>
                        <p class="card-desk">${r.description}</p>
                    </div>
                    <div class="card-footer" id="card-footer-${r.id}" style="margin-top:30px">
                        <div class="interior">
                            <a class="btn" id="btn-${r.id}" tabindex="${idx++}" onclick="setModalDetail('${r.name}','${r.pictureId}','${r.city}','${r.description}','${r.rating}')" href="#open-modal">Detail</a>
                        </div>
                    </div>
                </div>
            `;
            idx += 2;
        });
    }catch(error){
        alert(error);
        return [];
    }
};
getRestaurant();