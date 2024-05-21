// Function to parse CSV data and populate the table
function parseCSV(csvData) {
    const rows = csvData.split('\n');
    const tableBody = document.querySelector('#csvTable tbody');

    rows.forEach(row => {
        const columns = row.split(',');
        const tr = document.createElement('tr');
        
        columns.forEach(column => {
            const td = document.createElement('td');
            td.textContent = column;
            tr.appendChild(td);
        });
        
        tableBody.appendChild(tr);
    });
}

// Function to read CSV file
function readCSV(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        const csvData = e.target.result;
        parseCSV(csvData);
    };
    reader.readAsText(file);
}

// Event listener for file input change
document.querySelector('input[type="file"]').addEventListener('change', function(e) {
    const file = e.target.files[0];
    readCSV(file);
});

let csvData = '';

function parseCSV(data) {
    csvData = data; // Store the CSV data globally
    const rows = data.split('\n');
    const tableBody = document.querySelector('#csvTable tbody');
    tableBody.innerHTML = ''; // Clear the table before adding new rows

    rows.forEach(row => {
        const columns = row.split(',');
        const tr = document.createElement('tr');
        
        columns.forEach(column => {
            const td = document.createElement('td');
            td.textContent = column;
            tr.appendChild(td);
        });
        
        tableBody.appendChild(tr);
    });
}

// Function to read CSV file
function readCSV(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        parseCSV(e.target.result);
    };
    reader.readAsText(file);
}

// Function to add a new row to the CSV data
function addRow(rowData) {
    csvData += `\n${rowData}`;
    parseCSV(csvData);
}

// Function to delete a row from the CSV data
function deleteRow(rowIndex) {
    const rows = csvData.split('\n');
    if (rowIndex >= 0 && rowIndex < rows.length) {
        rows.splice(rowIndex, 1);
        csvData = rows.join('\n');
        parseCSV(csvData);
    } else {
        alert("Invalid row index");
    }
}

// Function to download the modified CSV data
function downloadCSV() {
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'modified_data.csv';
    a.click();
    URL.revokeObjectURL(url);
}

// Event listener for file input change
document.querySelector('input[type="file"]').addEventListener('change', function(e) {
    const file = e.target.files[0];
    readCSV(file);
});

// Event listener for add data form
document.querySelector('#addDataForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const newRowData = document.querySelector('#newRowData').value;
    addRow(newRowData);
    document.querySelector('#newRowData').value = ''; // Clear the input field
});

// Event listener for delete data form
document.querySelector('#deleteDataForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const rowIndex = parseInt(document.querySelector('#rowIndex').value, 10);
    deleteRow(rowIndex);
    document.querySelector('#rowIndex').value = ''; // Clear the input field
});

// Event listener for download CSV button
document.querySelector('#downloadCSV').addEventListener('click', downloadCSV);
