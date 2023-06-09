//object calculator menggambarkan data dan kondisi dari kalkulatornya
const calculator = {
    displayNumber: '0', //angka yang muncul pada kalkulator diambil darisini
    operator: null, //akan diberikan nilai ketika pengguna melakukan aksi
    firstNumber: null,
    isWaitForSecondNumber: false, // kondisi kalkulator sedang menunggu pengguna menentukan angka kedua perhitungan
};

//fungsi update angka pada layar
function updateDisplay() {
    document.querySelector('#displayNumber').innerText = calculator.displayNumber
}

//fungsi menghapus data kalkulator
function clearCalculator() {
    calculator.displayNumber = '0';
    calculator.operator = null;
    calculator.firstNumber = null;
    calculator.isWaitForSecondNumber = false;
}

//fungsi memasukan angka
function inputDigit(digit) {
    if (calculator.displayNumber === '0') {
        calculator.displayNumber = digit;
    } else {
        calculator.displayNumber += digit
    }
}

//fungsi variabel buttons menginisialisasikan nilai seluruh elemen button yang ada
// dan berikan event click pada tiap elementnya
const buttons = document.querySelectorAll('.button');

for (const button of buttons) {
    button.addEventListener('click', function (event) {
        //mendapatkan objek elemen yg di klik
        const target = event.target;

        if (target.classList.contains('clear')) {
            clearCalculator();
            updateDisplay();
            return;
        }

        if (target.classList.contains('negative')) {
            inverseNumber();
            updateDisplay();
            return;
        }

        if (target.classList.contains('equals')) {
            performCalculation();
            updateDisplay();
            return;
        }

        if (target.classList.contains('operator')) {
            handleOperator(target.innerText);
            return;
        }

        inputDigit(target.innerText);
        updateDisplay();
    })
}

function inverseNumber() {
    if (calculator.displayNumber === '0') {
        return;
    }
    calculator.displayNumber = calculator.displayNumber * -1;
}

function handleOperator(operator) {
    if (!calculator.isWaitForSecondNumber) {
        calculator.operator = operator;
        calculator.isWaitForSecondNumber = true;
        calculator.firstNumber = calculator.displayNumber;

        // mengatur ulang nilai display number supaya tombol selanjutnya dimulai dari angka pertama lagi
        calculator.displayNumber = '0';
    } else {
        alert('operator sudah diterapkan')
    }
}

function performCalculation() {
    if (calculator.firstNumber == null || calculator.operator == null) {
        alert('anda belum menetapkan operator');
        return;
    }

    let result = 0;
    if (calculator.operator === '+') {
        result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
    } else {
        result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber);
    }
     // objek yang akan dikirimkan sebagai argumen fungsi putHistory()
    const history = {
    firstNumber: calculator.firstNumber,
    secondNumber: calculator.displayNumber,
    operator: calculator.operator,
    result: result
    }
    putHistory(history);
    calculator.displayNumber = result
    renderHistory();
}
