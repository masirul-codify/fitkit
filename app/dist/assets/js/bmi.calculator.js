/*--------------------------------------------------
    BMI Calculator
---------------------------------------------------*/
function calculateBMI() {
    // Get the values from the input fields
    var weight = parseFloat(document.getElementById('weight').value);
    var height = parseFloat(document.getElementById('height').value);

    // Validate input fields
    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
        alert('Please enter valid weight and height.');
        return;
    }

    // Convert height from cm to meters
    height = height / 100;

    // Calculate the BMI
    var bmi = weight / (height * height);
    bmi = bmi.toFixed(2); // Round to 2 decimal places

    // Determine the meaning based on the BMI value
    var meaning = '';
    if (bmi < 18.5) {
        meaning = 'Underweight';
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        meaning = 'Normal weight';
    } else if (bmi >= 25 && bmi <= 29.9) {
        meaning = 'Overweight';
    } else if (bmi >= 30) {
        meaning = 'Obesity';
    }

    // Update the bmi_result and bmi_message input fields with the results
    document.getElementById('bmi_result').value = bmi;
    document.getElementById('bmi_message').value = meaning;
}

function reCalculate() {
    // Clear all input fields
    document.getElementById('weight').value = '';
    document.getElementById('height').value = '';
    document.getElementById('age').value = '';
    document.getElementById('sex').selectedIndex = 0;
    document.getElementById('activity').selectedIndex = 0;
    document.getElementById('bmi_result').value = '';
    document.getElementById('bmi_message').value = '';
}
