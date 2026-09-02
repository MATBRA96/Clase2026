alert("JavaScript funciona");

const pupilas = document.querySelectorAll(".pupila");
document.addEventListener("mousemove", (e) => {
    pupilas.forEach((pupila) => {
        const ojo = pupila.parentElement;
        const rect = ojo.getBoundingClientRect();
        const centroX = rect.left + rect.width / 2;
        const centroY = rect.top + rect.height / 2;
        const dx = e.clientX - centroX;
        const dy = e.clientY - centroY;
        const angulo = Math.atan2(dy, dx);
        const distancia = 12;
        const moverX = Math.cos(angulo) * distancia;
        const moverY = Math.sin(angulo) * distancia;
        pupila.style.transform =
            `translate(calc(-50% + ${moverX}px), calc(-50% + ${moverY}px))`;
    });
});
