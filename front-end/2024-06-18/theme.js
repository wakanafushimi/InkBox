feather.replace();

var html = document.documentElement;
var radios = document.getElementsByName('themes'); 

// Function to apply Vanta.js birds effect
var vantaEffect;

function applyVantaEffect() {
    if (vantaEffect) {
        vantaEffect.destroy();
    }
    vantaEffect = VANTA.BIRDS({
        el: "#background",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        scale: 1.00,
        scaleMobile: 1.00,
        backgroundColor: 0x110f20,
        color1: 0x568dac,
        color2: 0x9473b3,
        birdSize: .5,
        separation: 70.00
    });
}

// Event listeners for theme radio buttons
for (var i = 0; i < radios.length; i++) {
    radios[i].addEventListener('change', function() {
        html.classList.remove('dark-theme', 'birds-theme');
        if (this.id === 'dark-theme') {
            html.classList.add('dark-theme');
            if (vantaEffect) {
                vantaEffect.destroy();
                vantaEffect = null;
                document.getElementById('background').style.display = 'none';
            }
        } else if (this.id === 'birds-theme') {
            html.classList.add('birds-theme');
            document.getElementById('background').style.display = 'block';
            applyVantaEffect();
        }
        // Save theme choice to localStorage
        localStorage.setItem('theme', this.id);
    });
}

window.addEventListener('load', function() {
    // Check localStorage for saved theme preference
    var savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark-theme') {
        document.getElementById('dark-theme').checked = true;
        html.classList.add('dark-theme');
    } else {
        document.getElementById('birds-theme').checked = true;
        html.classList.add('birds-theme');
        applyVantaEffect();
    }
});