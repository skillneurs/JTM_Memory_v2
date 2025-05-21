const galleryContainer = document.querySelector('.gallery_container');
const galleryControlsContainer = document.querySelector('.gallery_controls');
const galleryControls = ['previous','next'];
const galleryItems = document.querySelectorAll('.gallery_item');

class Carouse1 {

    constructor(container, items, controls){
        this.carouse1Container = container;
        this.carouse1Controls = controls;
        this.carouse1Array = [...items];
    }

    updateGallery(){
        this.carouse1Array.forEach(el => {
            el.classList.remove('gallery_item_1');
            el.classList.remove('gallery_item_2');
            el.classList.remove('gallery_item_3');
            el.classList.remove('gallery_item_4');
            el.classList.remove('gallery_item_5');
        });

        this.carouse1Array.slice(0, 5).forEach((el , i) => {
            el.classList.add(`gallery_item_${i+1}`);
        });
    }

    setCurrentState(direction){
        if (direction.className == 'gallery_controls_previous') {
            this.carouse1Array.unshift(this.carouse1Array.pop());
        } else {
            this.carouse1Array.push(this.carouse1Array.shift());
        }
        this.updateGallery();
    }

setControls() {
    this.carouse1Controls.forEach(control => {
        const button = document.createElement('button');
        button.className = `gallery_controls_${control}`;

        if (control === 'previous') {
            button.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" class="svg"  fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor" class="size-6" >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
            `;
        } else {
            button.innerHTML = `
                <svg  xmlns="http://www.w3.org/2000/svg" class="svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
            `;
        }

        galleryControlsContainer.appendChild(button);
    });
}



    useControls(){
        const triggers = [...galleryControlsContainer.childNodes];
        triggers.forEach(control =>{
            control.addEventListener('click', e =>{
                e.preventDefault();
                this.setCurrentState(control);
            });
        });
    }
}
const exempleCarousel1 = new Carouse1(galleryContainer, galleryItems, galleryControls);
exempleCarousel1.setControls();
exempleCarousel1.useControls();

const link1 = document.querySelector('.gallery_item_1');
link1.addEventListener("click", function () {
    window.location = "home.html";
});
const link3 = document.querySelector(".gallery_item_3");
link3.addEventListener("click", function () {
    window.location = "homeLOL.html";
});
