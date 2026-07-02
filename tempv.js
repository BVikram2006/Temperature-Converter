function convertTemperatureValue(value, fromUnit, toUnit) {
    if (isNaN(value)) return null;
    
    // Convert to Celsius first
    let celsius;
    switch(fromUnit) {
        case 'Celsius': celsius = value; break;
        case 'Fahrenheit': celsius = (value - 32) * 5/9; break;
        case 'Kelvin': celsius = value - 273.15; break;
        default: return null;
    }
    
    // Convert from Celsius to target
    switch(toUnit) {
        case 'Celsius': return celsius;
        case 'Fahrenheit': return (celsius * 9/5) + 32;
        case 'Kelvin': return celsius + 273.15;
        default: return null;
    }
}

function getUnitSymbol(unit) {
    const symbols = { 'Celsius': '°C', 'Fahrenheit': '°F', 'Kelvin': 'K' };
    return symbols[unit] || '';
}

function convertTemperature() {
    let temp = parseFloat(document.getElementById("temperatureInput").value);
    let fromUnit = document.getElementById("fromUnit").value;
    let toUnit = document.getElementById("toUnit").value;
    
    if (isNaN(temp)) {
        document.getElementById("result").innerHTML = "⚠️ Enter a valid number";
        return;
    }
    
    let result = convertTemperatureValue(temp, fromUnit, toUnit);
    
    if (result === null) {
        document.getElementById("result").innerHTML = "❌ Error";
        return;
    }
    
    document.getElementById("result").innerHTML = `${result.toFixed(2)}${getUnitSymbol(toUnit)}`;
}

// Auto-convert on input change
let timeout;
function setupAutoConvert() {
    const inputs = ['temperatureInput', 'fromUnit', 'toUnit'];
    inputs.forEach(id => {
        document.getElementById(id).addEventListener('input', () => {
            clearTimeout(timeout);
            timeout = setTimeout(convertTemperature, 300);
        });
        document.getElementById(id).addEventListener('change', () => {
            clearTimeout(timeout);
            timeout = setTimeout(convertTemperature, 150);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setupAutoConvert();
    convertTemperature();
});