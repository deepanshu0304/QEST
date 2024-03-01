const mainContent = document.getElementsByClassName("content");

const statusSelectBtn = document.querySelector(".status-bar");
const statusOptions = document.querySelectorAll(".status-option");
const statusBtnText = document.querySelector(".status-btn-text");
const statusDropdown = document.querySelector('.status-drop-down')
const distributionSelectBtn = document.querySelector(".distribution-bar");
const distributionOptions = document.querySelectorAll(".distribution-option");
const distributionBtnText = document.querySelector(".distribution-btn-text");
const distributionDropdown = document.querySelector('.distribution-drop-down')
const selectAllOrders = document.querySelector('#select-all')
console.log(selectAllOrders);
selectAllOrders.checked = true;
console.log(selectAllOrders.checked);

selectAllOrders.addEventListener('change', () => {
    console.log('deepanshu');
})


const orderBtn = document.getElementsByClassName('orders');
const searchBar = document.querySelector('.search');


let filter = "";
const allOrders = [
    {
        ref: 234,
        customer: "Deepanshu G",
        products: "Orbea Orco M30",
        date: "08 Aug 2020",
        distribution: "Banglore",
        status: "Delivered",
        price: 900.0,
    },
    {
        ref: 121,
        customer: "Suranjana G",
        products: "S Works Tarmac SL7",
        date: "12 Aug 2020",
        distribution: "Patna",
        status: "Out for Delivery",
        price: 400.00,
    },
    {
        ref: 24,
        customer: "Deepanshu G",
        products: "Orbea Orco M30",
        date: "08 Aug 2020",
        distribution: "Banglore",
        status: "Placed",
        price: 900.0,
    },
    {
        ref: 455,
        customer: "Anangha P",
        products: "Pinarello Gan Disk (x2)",
        date: "06 Aug 2020",
        distribution: "Hyderabad",
        status: "In transit",
        price: 2300.0,
    },
    {
        ref: 134,
        customer: "Deepanshu G",
        products: "Orbea Orco M30",
        date: "08 Aug 2020",
        distribution: "Banglore",
        status: "In transit",
        price: 900.0,
    }
]


function addElement(i, id, cus, pro, da, dis, sta, pri) {
    const row = document.createElement('div');
    row.classList.add('labels')
    if (i & 1)
        row.classList.add('dark');

    const ref = document.createElement('div');
    ref.classList.add('ref');
    const input = document.createElement('input');
    input.type = 'checkbox'
    input.name = 'vehicle1'
    input.value = `$id`;
    input.setAttribute("id", id);
    const label = document.createElement('label');
    label.for = "vehicle1"
    label.innerHTML = id;
    ref.appendChild(input);
    ref.appendChild(label);
    row.appendChild(ref);

    const customer = document.createElement('div');
    customer.classList.add('customer');
    customer.innerHTML = cus
    row.appendChild(customer);

    const products = document.createElement('div');
    products.classList.add('products');
    products.innerHTML = pro
    row.appendChild(products);

    const date = document.createElement('div');
    date.classList.add('date');
    date.innerHTML = da
    row.appendChild(date);

    const distribution = document.createElement('div');
    distribution.classList.add('customer');
    distribution.innerHTML = dis
    row.appendChild(distribution);

    const statuss = document.createElement('div');
    statuss.classList.add('status');
    statuss.innerHTML = sta
    row.appendChild(statuss);

    const price = document.createElement('div');
    price.classList.add('price');
    price.innerHTML = pri
    row.appendChild(price);


    mainContent[0].appendChild(row);
}



function renderMainContent(allOrders) {

    mainContent[0].innerHTML = `<div class="all-orders">
          <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />

          <label for="vehicle1"> All orders</label>
        </div>
        <div class="labels dark">
          <div class="ref">
            <input type="checkbox" id="vehicle2" name="vehicle1" value="Bike" />

            <label for="vehicle1"> Ref. ID</label>
          </div>
          <div class="customer">Customer</div>
          <div class="products">Products</div>
          <div class="date">Date</div>
          <div class="distribution">Distribution</div>
          <div class="status">Status</div>
          <div class="price">Price (in Rs)</div>
        </div>`
    let orderId = 0;
    // console.log(statusBtnText.innerHTML);
    for (let i = 0; i < allOrders.length; i++) {


        const customerName = allOrders[i].customer.toLowerCase();
        const productName = allOrders[i].products.toLowerCase();
        filter = filter.toLowerCase();
        const status = allOrders[i].status.toLowerCase();
        // console.log(status);
        const distribution = allOrders[i].distribution.toLowerCase();
        const distributionCheck = distributionBtnText.innerHTML.includes('Distribution') || distribution.includes(distributionBtnText.innerHTML.toLowerCase());
        const statusCheck = statusBtnText.innerHTML.includes('Status') || status.includes((statusBtnText.innerHTML).toLowerCase());
        if ((customerName.includes(filter) || productName.includes(filter)) && distributionCheck && statusCheck) {

            addElement(orderId++, allOrders[i].ref, allOrders[i].customer, allOrders[i].products, allOrders[i].date, allOrders[i].distribution, allOrders[i].status, allOrders[i].price);
        }
    }
}

renderMainContent(allOrders);






orderBtn[0].addEventListener('click', () => {

    const refinedData = [];
    const titleKeys = Object.keys(allOrders[0]);
    refinedData.push(titleKeys);

    allOrders.forEach(e => {

        if (document.getElementById(e.ref) && document.getElementById(e.ref).checked)
            refinedData.push(Object.values(e));
    });

    let csvContent = '';
    refinedData.forEach(e => {
        csvContent += e.join(',') + '\n';
    });

    const blob = new Blob([csvContent], {
        type: 'text/csv;charset=utf-8,'
    });

    const objUrl = URL.createObjectURL(blob);

    const a = document.createElement('a')
    a.href = objUrl
    a.download = "deepu"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
});







statusSelectBtn.addEventListener("click", () => {
    statusDropdown.classList.toggle("htaado");
    distributionDropdown.classList.add("htaado");
})
distributionSelectBtn.addEventListener("click", () => {
    distributionDropdown.classList.toggle("htaado");
    statusDropdown.classList.add("htaado");
})

statusOptions.forEach(option => {
    option.addEventListener("click", () => {
        const selectedOption = option.querySelector('.option-text').innerText;

        statusBtnText.innerText = selectedOption;

        statusDropdown.classList.add("htaado");
        renderMainContent(allOrders);

    });
})
distributionOptions.forEach(option => {
    option.addEventListener("click", () => {
        const selectedOption = option.querySelector('.option-text').innerText;

        distributionBtnText.innerText = selectedOption;

        distributionDropdown.classList.add("htaado");
        renderMainContent(allOrders);

    });
})





searchBar.addEventListener("input", (e) => {
    console.log(e.target);
    console.log(e.target.value);
    filter = e.target.value
    renderMainContent(allOrders);
});



window.addEventListener("click", (e) => {
    if (!statusSelectBtn.contains(e.target))
        statusDropdown.classList.add("htaado");
       
    if (!distributionSelectBtn.contains(e.target)) {
        distributionDropdown.classList.add('htaado');
    }
});
