function convert() {
    const atomicMass = parseFloat(document.getElementById('atomic-mass').value);
    const inputValue = parseFloat(document.getElementById('input-value').value);
    const inputType = document.getElementById('input-type').value;
    
    const avogadroNumber = 6.022 * Math.pow(10, 23);
    let result;

    switch(inputType) {
        case 'mole':
            result = `
                Mass: ${(inputValue * atomicMass).toFixed(5)} g<br>
                Atoms: ${(inputValue * avogadroNumber).toFixed(5)} x 10^23<br>
                Volume: ${(inputValue * 22.4).toFixed(5)} L (at STP/NTP)
            `;
            break;
        case 'atoms':
            result = `
                Moles: ${(inputValue / avogadroNumber).toFixed(5)} mol<br>
                Mass: ${(inputValue / avogadroNumber * atomicMass).toFixed(5)} g<br>
                Volume: ${(inputValue / avogadroNumber * 22.4).toFixed(5)} L (at STP/NTP)
            `;
            break;
        case 'volume':
            result = `
                Moles: ${(inputValue / 22.4).toFixed(5)} mol<br>
                Mass: ${(inputValue / 22.4 * atomicMass).toFixed(5)} g<br>
                Atoms: ${(inputValue / 22.4 * avogadroNumber).toFixed(5)} x 10^23
            `;
            break;
        case 'mass':
            result = `
                Moles: ${(inputValue / atomicMass).toFixed(5)} mol<br>
                Atoms: ${(inputValue / atomicMass * avogadroNumber).toFixed(5)} x 10^23<br>
                Volume: ${(inputValue / atomicMass * 22.4).toFixed(5)} L (at STP/NTP)
            `;
            break;
        default:
            result = 'Invalid input type';
    }

    document.getElementById('output').innerHTML = result;
    openDialog();
}

function openDialog() {
    document.getElementById('output-dialog').style.display = 'block';
}

function closeDialog() {
    document.getElementById('output-dialog').style.display = 'none';
}
