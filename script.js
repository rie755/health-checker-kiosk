// ===== Google Apps Script Web App URL =====
// Replace with your deployed URL after completing Part E
const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbycPYmhSt4NuWHbsfjZyP9vfLmxHd1UsSkcYHS7P3gZP10OWsxVt6l5jge-fMhUvejOGw/exec';

const form = document.getElementById('bmiForm');
const resultCard = document.getElementById('resultCard');
const resultCategory = document.getElementById('resultCategory');
const resultBMI = document.getElementById('resultBMI');
const resultMessage = document.getElementById('resultMessage');
const historyList = document.getElementById('historyList');

// In-memory array of past submissions (for the loop/history requirement)
const submissionHistory = [];

form.addEventListener('submit', function (e) {
  e.preventDefault();

  // Grab raw field values first
  const fields = {
    name: document.getElementById('name'),
    age: document.getElementById('age'),
    sex: document.getElementById('sex'),
    weight: document.getElementById('weight'),
    height: document.getElementById('height')
  };

  // ---- LOOP: validate every required field in one pass ----
  let isValid = true;
  const requiredIds = ['name', 'age', 'sex', 'weight', 'height'];

  for (let i = 0; i < requiredIds.length; i++) {
    const id = requiredIds[i];
    const el = fields[id];
    const errorEl = document.getElementById(id + 'Error');
    const rawValue = el.value.trim();

    el.classList.remove('invalid');
    errorEl.textContent = '';

    // ---- IF-ELSE: validate each field's content ----
    if (rawValue === '') {
      el.classList.add('invalid');
      errorEl.textContent = 'This field is required.';
      isValid = false;
    } else if ((id === 'age' || id === 'weight' || id === 'height') && (isNaN(rawValue) || Number(rawValue) <= 0)) {
      el.classList.add('invalid');
      errorEl.textContent = 'Enter a valid positive number.';
      isValid = false;
    } else if (id === 'age' && (Number(rawValue) < 1 || Number(rawValue) > 120)) {
      el.classList.add('invalid');
      errorEl.textContent = 'Age must be between 1 and 120.';
      isValid = false;
    }
  }

  // Stop here if any field failed validation
  if (!isValid) {
    resultCard.classList.add('hidden');
    return;
  }

  // All fields are valid — extract typed values
  const name = fields.name.value.trim();
  const age = parseInt(fields.age.value, 10);
  const sex = fields.sex.value;
  const weight = parseFloat(fields.weight.value);
  const heightCm = parseFloat(fields.height.value);

  // Compute BMI
  const heightM = heightCm / 100;
  const bmi = +(weight / (heightM * heightM)).toFixed(1);

  let category, message, colorClass, bgColor;

  // ---- SWITCH-CASE: classify BMI into a category ----
  switch (true) {
    case bmi < 18.5:
      category = 'Underweight';
      message = 'Consider a balanced, calorie-sufficient diet and consult a nutritionist if needed.';
      bgColor = '#5DADE2';
      break;
    case bmi < 25:
      category = 'Normal';
      message = 'Great! Keep up your healthy eating and exercise habits.';
      bgColor = '#58D68D';
      break;
    case bmi < 30:
      category = 'Overweight';
      message = 'Consider increasing physical activity and practicing mindful eating.';
      bgColor = '#F5B041';
      break;
    default:
      category = 'Obese';
      message = 'We recommend consulting a healthcare provider for a personalized plan.';
      bgColor = '#EC7063';
  }

  showResult(bmi, category, message, bgColor);
  addToHistory({ name, bmi, category });
  recordSubmission({ name, age, sex, weight, heightCm, bmi, category });

  form.reset();
});

function showResult(bmi, category, message, bgColor) {
  resultCard.style.backgroundColor = bgColor;
  resultCategory.textContent = category;
  resultBMI.textContent = `Your BMI is ${bmi}`;
  resultMessage.textContent = message;
  resultCard.classList.remove('hidden');
}

// ---- LOOP (also used here): rebuild the visible history list from the array ----
function addToHistory(entry) {
  submissionHistory.unshift(entry); // newest first
  historyList.innerHTML = '';

  submissionHistory.forEach(function (item) {
    const li = document.createElement('li');
    li.innerHTML = `<span>${item.name}</span><span>${item.bmi} (${item.category})</span>`;
    historyList.appendChild(li);
  });
}

function recordSubmission(record) {
  if (!WEB_APP_URL || WEB_APP_URL === 'YOUR_WEB_APP_URL') {
    console.warn('WEB_APP_URL not set yet — skipping Google Sheet recording.');
    return;
  }

  fetch(WEB_APP_URL, {
    method: 'POST',
    body: JSON.stringify(record)
  }).catch(function (err) {
    console.error('Could not record submission:', err);
  });
}