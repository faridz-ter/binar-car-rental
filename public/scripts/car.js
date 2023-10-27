document.getElementById('inputDriver').addEventListener('focus', darkenBackground);
document.getElementById('inputDate').addEventListener('focus', darkenBackground);
document.getElementById('inputTimepick').addEventListener('focus', darkenBackground);
document.getElementById('inputDriver').addEventListener('blur', resetBackground);
document.getElementById('inputDate').addEventListener('blur', resetBackground);
document.getElementById('inputTimepick').addEventListener('blur', resetBackground);

function darkenBackground() {
    document.getElementById('bg-black').style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    document.getElementById('bg-black').style.width = '100%';
    document.getElementById('bg-black').style.height = '100%';
}
function resetBackground() {
    document.getElementById('bg-black').style.backgroundColor = 'none';
    document.getElementById('bg-black').style.width = '0';
    document.getElementById('bg-black').style.height = '0';
}

class Car {
    constructor() {
        this.carList = document.getElementById('cars-list');
        this.searchBtn = document.getElementById('search-btn');
        this.driver = document.getElementById('inputDriver');
        this.date = document.getElementById('inputDate');
        this.timePick = document.getElementById('inputTimepick');
        this.passanger = document.getElementById('inputPenumpang');

        this.searchBtn.disabled = true;
        this.driver.addEventListener('input', this.checkFormValidity);
        this.date.addEventListener('input', this.checkFormValidity);
        this.timePick.addEventListener('input', this.checkFormValidity);
    }

    async init() {
        await this.load();
        document.body.onload = this.allCars;
        this.searchBtn.onclick = this.filterCars;
    };

    allCars = () => {
        let listCars = "";
        Component.list.map((car) => {
            listCars += car.render();
            this.carList.innerHTML = listCars;
        });
    }
    filterCars = () => {
        let listCars = "";
        let dateTimePick = new Date(`${this.date.value} ${this.timePick.value}`);
        let driver = this.driver.value === 'true' ? true : false;

        const filter = Component.list.filter((car) =>
            new Date(car.availableAt) >= dateTimePick &&
            car.capacity >= this.passanger.value
        ).map((car) => {
            listCars += car.render();
            this.carList.innerHTML = listCars;
        });
        if (filter.length === 0) {
            this.carList.innerHTML = '';
        };
    };
    checkFormValidity = () => {
        const isFormValid =
            this.driver.value !== "" &&
            this.date.value !== "" &&
            this.timePick.value !== "";
        this.searchBtn.disabled = !isFormValid;
    }
    async load() {
        const cars = await Binar.listCars();
        Component.init(cars);
    };
};

const car = new Car();

car.init();