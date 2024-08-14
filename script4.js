const ELECTRON_DISTRIBUTION = [2, 8, 8, 18, 18, 32, 32];
const canvas = document.getElementById('atomCanvas');
const context = canvas.getContext('2d');

const SCREEN_WIDTH = window.innerWidth > 800 ? 800 : window.innerWidth - 40;
const SCREEN_HEIGHT = window.innerHeight > 600 ? 600 : window.innerHeight - 200;

canvas.width = SCREEN_WIDTH;
canvas.height = SCREEN_HEIGHT;

const CENTER_X = SCREEN_WIDTH / 2;
const CENTER_Y = SCREEN_HEIGHT / 2;
const ORBIT_RADIUS_INCREMENT = 40;
const ELECTRON_RADIUS = 5;
const NUCLEUS_RADIUS = 15;
const SPEED = 0.02;

let scale = 1; // Initial scale value

document.getElementById('changeAtomButton').addEventListener('click', function() {
    document.getElementById('changeAtomModal').style.display = 'flex';
});

document.getElementById('changeAtom').addEventListener('click', function() {
    const numElectrons = parseInt(document.getElementById('numElectrons').value);
    if (numElectrons >= 1 && numElectrons <= 118) {
        startSimulation(numElectrons);
        document.getElementById('changeAtomModal').style.display = 'none';
    } else {
        alert('Please enter a valid number of electrons (1-118).');
    }
});

document.getElementById('showInfoButton').addEventListener('click', function() {
    const numElectrons = parseInt(document.getElementById('numElectrons').value);
    fetch('elements.json')
        .then(response => response.json())
        .then(data => {
            const element = data[numElectrons];
            if (element) {
                showModal(element);
            } else {
                alert('Element with this number of electrons not found.');
            }
        });
});

document.getElementById('closeModal').addEventListener('click', function() {
    document.getElementById('modal').style.display = 'none';
});

document.getElementById('closeChangeAtomModal').addEventListener('click', function() {
    document.getElementById('changeAtomModal').style.display = 'none';
});

document.getElementById('zoomInButton').addEventListener('click', function() {
    scale *= 1.1;
    startSimulation(parseInt(document.getElementById('numElectrons').value));
});

document.getElementById('zoomOutButton').addEventListener('click', function() {
    scale /= 1.1;
    startSimulation(parseInt(document.getElementById('numElectrons').value));
});

function showModal(element) {
    document.getElementById('elementName').textContent = element.name;
    document.getElementById('elementSymbol').textContent = element.symbol;
    document.getElementById('elementAtomicNumber').textContent = element.atomic_number;
    document.getElementById('elementMass').textContent = element.mass;
    document.getElementById('elementValency').textContent = element.valency;
    document.getElementById('elementElectronConfiguration').textContent = element.electron_configuration;
    document.getElementById('elementMeltingPoint').textContent = element.melting_point;
    document.getElementById('elementBoilingPoint').textContent = element.boiling_point;
    document.getElementById('elementDiscoveredBy').textContent = element.discovered_by;
    document.getElementById('elementDiscoveryYear').textContent = element.discovery_year;
    document.getElementById('modal').style.display = 'flex';
}

function calculateElectronDistribution(numElectrons) {
    const distribution = [];
    for (let electronsInOrbit of ELECTRON_DISTRIBUTION) {
        if (numElectrons > 0) {
            const electrons = Math.min(numElectrons, electronsInOrbit);
            distribution.push(electrons);
            numElectrons -= electrons;
        } else {
            break;
        }
    }
    return distribution;
}

function startSimulation(numElectrons) {
    const electronDistribution = calculateElectronDistribution(numElectrons);

    class Electron {
        constructor(orbitRadius, angle, speed) {
            this.orbitRadius = orbitRadius;
            this.angle = angle;
            this.speed = speed;
        }

        update() {
            this.angle += this.speed;
            if (this.angle >= 2 * Math.PI) {
                this.angle -= 2 * Math.PI;
            }
        }

        draw() {
            const x = CENTER_X + this.orbitRadius * Math.cos(this.angle) * scale;
            const y = CENTER_Y + this.orbitRadius * Math.sin(this.angle) * scale;
            context.beginPath();
            context.arc(x, y, ELECTRON_RADIUS * scale, 0, 2 * Math.PI);
            context.fillStyle = 'blue';
            context.fill();
            context.stroke();
        }
    }

    const electrons = [];
    let currentRadius = ORBIT_RADIUS_INCREMENT;

    for (let orbit = 0; orbit < electronDistribution.length; orbit++) {
        const numElectrons = electronDistribution[orbit];
        const angleIncrement = 2 * Math.PI / numElectrons;
        for (let i = 0; i < numElectrons; i++) {
            const angle = i * angleIncrement;
            electrons.push(new Electron(currentRadius, angle, SPEED));
        }
        currentRadius += ORBIT_RADIUS_INCREMENT;
    }

    function drawNucleus() {
        context.beginPath();
        context.arc(CENTER_X, CENTER_Y, NUCLEUS_RADIUS * scale, 0, 2 * Math.PI);
        context.fillStyle = 'red';
        context.fill();
        context.stroke();
    }

    function drawOrbits() {
        for (let r = ORBIT_RADIUS_INCREMENT; r <= currentRadius; r += ORBIT_RADIUS_INCREMENT) {
            context.beginPath();
            context.arc(CENTER_X, CENTER_Y, r * scale, 0, 2 * Math.PI);
            context.strokeStyle = 'black';
            context.stroke();
        }
    }

    function animate() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawOrbits();
        drawNucleus();
        electrons.forEach(electron => {
            electron.update();
            electron.draw();
        });
        requestAnimationFrame(animate);
    }

    animate();
}

// Initialize with an example atom (e.g., Hydrogen with 1 electron)
startSimulation(1);
