document.addEventListener('DOMContentLoaded', function() {
    const typedTextSpan = document.querySelector(".texto-animado");
    if (!typedTextSpan) return;
    
    const textArray = ["Full-Stack", "Front-end", "Back-end", "Freelancer"];
    const typingDelay = 100;
    const erasingDelay = 150;
    const newTextDelay = 1000; 
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 500);
        }
    }

    if (textArray.length > 0) setTimeout(type, newTextDelay + 250);
});