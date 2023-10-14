const tableHead = document.getElementById('data-head');
const tableBody = document.getElementById('data-body');
const searchInput = document.getElementById('searchInput');
let jsonData = []; // To store data from all .json files
//row number function

function populateTable(data, searched = false) {
    tableHead.innerHTML = `
        <tr>
            ${searched ? '<th>ID</th>' : ''}
            <th>Rank</th>
            <th>Username</th>
            <th>Team Name</th>
            <th>Institution</th>
            <th>Solved</th>
            <th>Problems</th>
        </tr>
    `;

    tableBody.innerHTML = '';

    data.forEach((item, idx) => {
        const row = document.createElement('tr');
        row.innerHTML = `
           ${searched ? `<th>${idx + 1}</th>` : ''}
            <td>${item.rank}</td>
            <td>${item.username}</td>
            <td>${item.fullname}</td>
            <td>${item.institution}</td>
            <td>${item.problem_total_points} (${item.total_fine})</td>
            <td>${item.problem_list.filter(i => i.is_solved).map(i => i.number_to_alpha).join(' ')}</td>
        `;
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

searchInput.addEventListener('input', () => {
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
});
