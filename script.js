const tableBody = document.getElementById('data-body');
const searchInput = document.getElementById('searchInput');
let jsonData = []; // To store data from all .json files
//row number function

function addCell(row, content, th = false) {
    const cell = document.createElement(th ? 'th' : 'td');
    cell.appendChild(document.createTextNode(content));
    row.appendChild(cell);
}

function populateTable(data, searched = false) {
    const idColumn = document.getElementById('column-id');
    idColumn.classList.toggle('hidden', !searched);

    // remove all elements from table body
    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
    }

    data.forEach((item, idx) => {
        const row = document.createElement('tr');

        if (searched) addCell(row, idx + 1, true);
        addCell(row, item.rank, !searched);
        addCell(row, item.username);
        addCell(row, item.fullname);
        addCell(row, item.institution);
        addCell(row, `${item.problem_total_points} (${item.total_fine})`);
        addCell(row, item.problem_list.filter(i => i.is_solved).map(i => i.number_to_alpha).join(' '));

        tableBody.appendChild(row);
    });
}

// Fetch and combine data from all .json files
async function fetchAndCombineData() {
    jsonData = await fetch('data.json').then(res => res.json());
    jsonData = jsonData.map((item, idx) => ({ ...item, rank: idx + 1 }));
    populateTable(jsonData);
}

fetchAndCombineData();

let searchTimeout = null;
searchInput.addEventListener('input', () => {
    searchTimeout = setTimeout(() => {
        clearTimeout(searchTimeout);

        const searchTerm = searchInput.value.toLowerCase().replace(/\s+/g, ' ');
        if (!searchTerm) {
            populateTable(jsonData);
            return;
        }

        const filteredData = jsonData.filter(item =>
            item.username.toLowerCase().includes(searchTerm) ||
            item.fullname.toLowerCase().includes(searchTerm) ||
            item.institution.toLowerCase().includes(searchTerm)
        );
        populateTable(filteredData, true);
    }, 300);
});
