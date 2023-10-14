const tableBody = document.getElementById('data-body');
const searchInput = document.getElementById('searchInput');
let jsonData = []; // To store data from all .json files
//row number function

function populateTable(data) {
    tableBody.innerHTML = '';
    let counter = 1;

    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${counter}</td>
            <td>${item.username}</td>
            <td>${item.fullname}</td>
            <td>${item.institution}</td>
            <td>${item.total_fine}</td>
            <td>${item.problem_total_points}</td>
        `;
        tableBody.appendChild(row);
        counter++;
    });
}

// Fetch and combine data from all .json files
async function fetchAndCombineData() {
    jsonData = [];

    for (let page = 1; page <= 13; page++) {
        const response = await fetch(`${page}.json`);
        const data = await response.json();
        jsonData = jsonData.concat(data.results);
    }

    populateTable(jsonData);
}

fetchAndCombineData();

searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredData = jsonData.filter(item => 
        item.username.toLowerCase().includes(searchTerm) ||
        item.fullname.toLowerCase().includes(searchTerm) ||
        item.institution.toLowerCase().includes(searchTerm)
    );
    populateTable(filteredData);
});
