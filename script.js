
function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}

function openModal(id) {
    document.getElementById(id).style.display = 'block';
}

function loadEventsFromExcel() {
    fetch('https://raw.githubusercontent.com/poojakore0606/eventattmv/main/events.xlsx')
    .then(res => res.arrayBuffer())
    .then(data => {
        const workbook = XLSX.read(data, { type: 'array' });
        const sheet = workbook.Sheets['Events'];
        const events = XLSX.utils.sheet_to_json(sheet);
        const container = document.getElementById('eventCards');
        events.forEach(event => {
            const card = document.createElement('div');
            card.className = 'event';
            card.innerHTML = `
                <h4>${event['Event Name']}</h4>
                <p>Date: ${event['Date']}</p>
                <p>Location: ${event['Location']}</p>
                <p>Time: ${event['Time']}</p>
                <p>Speaker: ${event['Speaker']}</p>
                <button onclick="showRegister('${event['Event Name']}', '${event['Date']}')">Register</button>
            `;
            container.appendChild(card);
        });
    });
}

function showRegister(eventName, eventDate) {
    document.getElementById('eventName').value = eventName;
    document.getElementById('eventDate').value = eventDate;
    openModal('registerModal');
}

document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const data = {
        Event: document.getElementById('eventName').value,
        Date: document.getElementById('eventDate').value,
        Name: document.getElementById('name').value,
        Email: document.getElementById('email').value,
        Contact: document.getElementById('contact').value,
        Class: document.getElementById('class').value,
        Year: document.getElementById('year').value
    };

    fetch("https://script.google.com/macros/s/AKfycbxLG8ETATwVyuX1nzpPFNihCo4mVIu335ijnOvQkuHUQY1PCNB2-oYfKAoa9cW6z3vi/exec", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.text())
    .then(result => {
        alert("Registration submitted successfully!");
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Failed to submit registration.");
    });

    closeModal('registerModal');
});

window.onload = loadEventsFromExcel;
