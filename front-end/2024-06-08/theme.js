   
    feather.replace();

    // JavaScript to add classnames to the HTML-element on toggle
    var html = document.documentElement;
    var radios = document.getElementsByName('themes'); 

    // Variable to store the Vanta effect instance
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
            birdSize: 1,
            separation: 600.00
        });
    }

    for (var i = 0; i < radios.length; i++) {
        radios[i].addEventListener('change', function() {
            html.classList.remove('light-theme', 'dark-theme', 'birds-theme');
            if (this.id === 'light-theme') {
                html.classList.add('light-theme');
                if (vantaEffect) {
                    vantaEffect.destroy();
                    vantaEffect = null;
                    document.getElementById('background').style.display = 'none';
                }
            } else if (this.id === 'dark-theme') {
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
        });
    }

window.addEventListener('load', function() {
    document.getElementById('birds-theme').checked = true;
    html.classList.add('birds-theme');
    applyVantaEffect(); 
});
