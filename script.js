const statusSelectBtn = document.querySelector(".status-bar");
const statusOptions = document.querySelectorAll(".status-option");
const statusBtnText = document.querySelector(".status-btn-text");
const statusDropdown = document.querySelector('.status-drop-down')
const distributionSelectBtn = document.querySelector(".distribution-bar");
const distributionOptions = document.querySelectorAll(".distribution-option");
const distributionBtnText = document.querySelector(".distribution-btn-text");
const distributionDropdown = document.querySelector('.distribution-drop-down')
const selectAllOrders = document.getElementById('select-all')
const mainContent = document.querySelector(".content");
const orderBtn = document.querySelector('.orders');
const searchBar = document.querySelector('.search');
const noOfOrder = document.querySelector('.selected-orders')


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


let searchFilter = "";
let orderSelected = 0;

searchBar.addEventListener("input", (e) => {
    searchFilter = e.target.value
    renderMainContent(allOrders);
});


statusSelectBtn.addEventListener("click", () => {
    statusDropdown.classList.toggle("hide");
    distributionDropdown.classList.add("hide");
});


statusOptions.forEach(option => {
    option.addEventListener("click", () => {
        const selectedOption = option.querySelector('.option-text').innerText;
        statusBtnText.innerText = selectedOption;
        statusDropdown.classList.add("hide");
        renderMainContent(allOrders);
    });
});

distributionSelectBtn.addEventListener("click", () => {
    distributionDropdown.classList.toggle("hide");
    statusDropdown.classList.add("hide");
});

distributionOptions.forEach(option => {
    option.addEventListener("click", () => {
        const selectedOption = option.querySelector('.option-text').innerText;
        distributionBtnText.innerText = selectedOption;
        distributionDropdown.classList.add("hide");
        renderMainContent(allOrders);
    });
});

window.addEventListener("click", (e) => {
    if (!statusSelectBtn.contains(e.target)) {
        statusDropdown.classList.add("hide");
    }

    if (!distributionSelectBtn.contains(e.target)) {
        distributionDropdown.classList.add('hide');
    }
});


orderBtn.addEventListener('click', () => {
    const refinedData = [];
    const titleKeys = Object.keys(allOrders[0]);
    refinedData.push(titleKeys);

    allOrders.forEach(e => {

        if (document.getElementById(e.ref) && document.getElementById(e.ref).checked) {
            refinedData.push(Object.values(e));
        }
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


selectAllOrders.addEventListener('change', () => {
    let count = 0;
    if (selectAllOrders.checked) {
        for (let i = 0; i < allOrders.length; i++) {
            const row = document.getElementById(`${allOrders[i].ref}`);
            if (row) {
                row.checked = true;
                count++;
            }
        }
        noOfOrder.innerHTML = `(${count} order selected)`;
    }
    else {
        for (let i = 0; i < allOrders.length; i++) {
            const row = document.getElementById(`${allOrders[i].ref}`);
            if (row) {
                row.checked = false;
            }
        }
        noOfOrder.innerHTML = `(0 order selected)`;
    }
});

function renderMainContent(allOrders) {
    noOfOrder.innerHTML = `(0 order selected)`;
    selectAllOrders.checked = false;
    let html = `
        <div class="labels dark order-head">
          <div class="ref">

            <input type="checkbox" id="vehicle2" class="opacity" name="vehicle1" value="Bike" />

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

    for (let i = 0; i < allOrders.length; i++) {


        searchFilter = searchFilter.toLowerCase();
        const customerName = allOrders[i].customer.toLowerCase();
        const productName = allOrders[i].products.toLowerCase();
        const status = allOrders[i].status.toLowerCase();
        const distribution = allOrders[i].distribution.toLowerCase();
        const customerCheck = customerName.includes(searchFilter);
        const productcheck = productName.includes(searchFilter);
        const statusCheck = statusBtnText.innerHTML.includes('Status') || status.includes((statusBtnText.innerHTML).toLowerCase());
        const distributionCheck = distributionBtnText.innerHTML.includes('Distribution') || distribution.includes(distributionBtnText.innerHTML.toLowerCase());

        if ((customerCheck || productcheck) && distributionCheck && statusCheck) {

            html += addElement(orderId++, allOrders[i]);
        }
    }

    mainContent.innerHTML = html;
    allOrders.forEach(e => {

        const singleOrder = document.getElementById(e.ref);
        if (singleOrder) {

            singleOrder.addEventListener('change', () => {
                if (singleOrder.checked) orderSelected++;
                else orderSelected--;
                noOfOrder.innerHTML = `(${orderSelected} order selected)`;
            })
        }
    });
}

function addElement(i, { ref, customer, products, date, distribution, status, price }) {
    return `
        <div class="labels ${i & 1 ? 'dark' : ''}">
          <div class="ref">
            <input type="checkbox" id=${ref} name=${ref}/>

            <label for=${ref}> ${ref}</label>
          </div>
          <div class="customer">${customer}</div>
          <div class="products">${products}</div>
          <div class="date">${date}</div>
          <div class="distribution">${distribution}</div>
          <div class="status">${status}</div>
          <div class="price">${price}</div>
        </div>`
}

renderMainContent(allOrders);


