// ===== WEATHER =====
function loadWeather() {
    const el = document.getElementById('weather-display');
    el.innerHTML = `<div class="loading-state"><div class="spinner"></div><p>Loading weather…</p></div>`;
    fetch('./data/weather.json')
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => {
            console.error('Error loading weather:', error);
            displayWeatherError();
        });
}

function displayWeather(weather) {
    document.getElementById('weather-display').innerHTML = `
        <div class="weather-current">
            <div class="weather-icon">${weather.icon}</div>
            <div class="weather-temp">${weather.temperature}°F</div>
            <div class="weather-location">${weather.location}</div>
            <div class="weather-condition">${weather.condition}</div>
        </div>`;
}

function displayWeatherError() {
    document.getElementById('weather-display').innerHTML =
        `<p class="widget-error">Weather data is unavailable right now.</p>`;
}

// ===== QUOTES ===== 
let allQuotes = [];
let currentQuoteIndex = -1;
const quoteButton = document.getElementById('new-quote-btn');

function displayRandomQuote() {
    const display = document.getElementById('quotes-display');
    if (allQuotes.length === 0) {
        display.innerHTML = `<p class="widget-error">No quotes to show.</p>`;
        return;
    }
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * allQuotes.length);
    } while (randomIndex === currentQuoteIndex && allQuotes.length > 1);
    currentQuoteIndex = randomIndex;
    const quote = allQuotes[randomIndex];
    display.innerHTML = `
        <div class="quote-card">
            <div class="quote-text">"${quote.text}"</div>
            <div class="quote-author">— ${quote.author}</div>
        </div>`;
}

function loadQuotes() {
    fetch('./data/quotes.json')
        .then(response => response.json())
        .then(quotes => {
            allQuotes = quotes;
            displayRandomQuote();
            if (allQuotes.length > 0) {
                quoteButton.disabled = false;
            }
        })
        .catch(error => {
            console.error('Error loading quotes:', error);
            displayQuotesError();
        });
}

function displayQuotesError() {
    document.getElementById('quotes-display').innerHTML =
        `<p class="widget-error">Quotes are unavailable right now.</p>`;
}

quoteButton.addEventListener('click', displayRandomQuote);

// ===== THEME =====
function initializeTheme() {
    if (localStorage.getItem('dashboardTheme') === 'dark') {
        document.body.classList.add('theme-dark');
    }
}
function toggleTheme() {
    const isDark = document.body.classList.toggle('theme-dark');
    if (isDark) {
        localStorage.setItem('dashboardTheme', 'dark');
    } else {
        localStorage.setItem('dashboardTheme', 'light');
    }
}
document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
initializeTheme();

// ===== TASKS ===== 
function loadTasks() {
    const tasksJSON = localStorage.getItem('dashboardTasks');
    return tasksJSON ? JSON.parse(tasksJSON) : [];
}
function saveTasks(tasks) {
    localStorage.setItem('dashboardTasks', JSON.stringify(tasks));
}
function addTask(taskText) {
    const tasks = loadTasks();
    tasks.push({ text: taskText, completed: false, id: Date.now() });
    saveTasks(tasks);
    displayTasks();
}
function toggleTask(index) {
    const tasks = loadTasks();
    tasks[index].completed = !tasks[index].completed;
    saveTasks(tasks);
    displayTasks();
}
function deleteTask(index) {
    const tasks = loadTasks();
    if (confirm(`Delete task: "${tasks[index].text}"?`)) {
        tasks.splice(index, 1);
        saveTasks(tasks);
        displayTasks();
    }
}
function displayTasks() {
    const tasks = loadTasks();
    const list = document.getElementById('task-list');
    list.innerHTML = '';
    displayTaskStats(tasks);

    if (tasks.length === 0) {
        const empty = document.createElement('li');
        empty.textContent = 'No tasks yet. Add one above.';
        list.appendChild(empty);
        return;
    }

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'task-item';
        if (task.completed) {
            li.classList.add('completed');
        }

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.setAttribute('aria-label', `Mark "${task.text}" complete`);
        checkbox.addEventListener('change', () => toggleTask(index));

        const text = document.createElement('span');
        text.textContent = task.text;

        const deleteBtn = document.createElement('button');
        deleteBtn.type = 'button';
        deleteBtn.className = 'btn-danger';
        deleteBtn.textContent = 'Delete';
        deleteBtn.setAttribute('aria-label', `Delete "${task.text}"`);
        deleteBtn.addEventListener('click', () => deleteTask(index));

        li.append(checkbox, text, deleteBtn);
        list.appendChild(li);
    });
}

function displayTaskStats(tasks) {
    const stats = document.getElementById('task-stats');
    const total = tasks.length;
    if (total === 0) {
        stats.textContent = 'Add a task to start tracking progress.';
        return;
    }
    const completed = tasks.filter(task => task.completed).length;
    const pending = tasks.filter(task => !task.completed).length;
    const percent = Math.round((completed / total) * 100);
    stats.textContent = `${total} total · ${completed} completed · ${pending} pending · ${percent}% done`;
}

document.getElementById('task-form').addEventListener('submit', event => {
    event.preventDefault();
    const input = document.getElementById('task-input');
    const text = input.value.trim();
    if (text === '') {
        return;
    }
    addTask(text);
    input.value = '';
    input.focus();
});

// ===== STARTUP =====
loadWeather();
loadQuotes();
displayTasks();
