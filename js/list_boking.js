// Togel Class Active
const navbarNav = document.querySelector(".navbar-nav");

// Ketika hamburger menu diklik
document.querySelector("#hamburger-menu").onclick = () => {
    navbarNav.classList.toggle("active");
};

//klik diluar hamburger untuk exit
const hamburger = document.querySelector("#hamburger-menu");

document.addEventListener("click", function (e) {
    if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
        navbarNav.classList.remove("active");
    }
});


//Get Data jadi tabel
const tbody = document.querySelector('tbody')
// const detail = document.getElementById('detail')
const searchForm = document.getElementById('search')
let usersData = [];

const loadData = async () => {
    try {
        const url = await fetch('http://localhost:3000/list');
        usersData = await url.json();
        // console.log(usersData)
        loadUserData(usersData);
    } catch (err) {
        console.log(err)
    }
}


const loadUserData = (data) => {
    let no = 1;
    const output = data.map((el) => {
        return `
        <tr>
            <td>` + (no++) + `</td>
            <td>${el.name}</td>
            <td>${el.email}</td>
            <td>${el.time}</td>
            <td>${el.date}</td>
            <td><button class="delete-button" onclick="deleteRow(this, ${el.id})">Delete</button></td>
        </tr>
        `
    }).join('')
    tbody.innerHTML = output;
}

function deleteRow(button, id) {
    var row = button.parentNode.parentNode;
    row.style.opacity = "0";

    fetch(`http://localhost:3000/id`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
        
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("success:", data);
        
        })
    // Optional: You can add additional effects or actions here 

    setTimeout(function () {
        row.parentNode.removeChild(row);
    }, 500); // Add a delay for a fade-out effect (500 milliseconds in this example)
}


// function showDetail(id) {
//     fetch('http://localhost:3000/list' + id)
//         .then((res) => res.json())
//         .then((data) => {
//             detail.innerHTML = ''
//             detail.insertAdjacentHTML('beforeend', `
//                     <ul>
//                         <li>${data.name}</li>
//                         <li>${data.people}</li>
//                         <li>${data.email}</li>
//                         <li>${data.address.city}</li>
//                         <li>${data.phone}</li>
//                     </ul>
//             `)
//         })
// }

searchForm.addEventListener('keyup', (e) => {
    const value = e.target.value.toLowerCase();
    const input = usersData.filter((data) => {
        return (
            data.name.toLowerCase().includes(value)
        )
    })
    loadUserData(input)
})

loadData()
