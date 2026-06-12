let balance = 100;
const symbols = ['🍒', '🍋', '🍊', '🍇', '🔔', '💎', '7️⃣'];

function spinSlots() {
    const betInput = document.getElementById('bet');
    const betAmount = parseInt(betInput.value);
    const msg = document.getElementById('message');
    const btn = document.getElementById('spin-btn');
    
    // Validatie van de inzet
    if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance) {
        msg.innerHTML = "❌ <span style='color:red;'>Ongeldige inzet of onvoldoende saldo!</span>";
        return;
    }

    // Trek de inzet direct af
    balance -= betAmount;
    document.getElementById('balance').innerText = balance;
    
    // Zet knoppen tijdelijk uit en voeg het draai-effect toe
    btn.disabled = true;
    msg.innerText = "De rollen draaien...";
    
    const slots = [document.getElementById('slot1'), document.getElementById('slot2'), document.getElementById('slot3')];
    slots.forEach(s => s.classList.add('blur'));

    // Simuleer het draaien met een vertraging (1 seconde)
    setTimeout(() => {
        const results = [];
        
        // Kies 3 willekeurige symbolen
        slots.forEach((slot) => {
            slot.classList.remove('blur');
            const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
            slot.innerText = randomSymbol;
            results.push(randomSymbol);
        });

        // Winstbepaling logica
        if (results[0] === results[1] && results[1] === results[2]) {
            // 3 dezelfde = Grote prijs (10x de inzet)
            let winAmount = betAmount * 10;
            balance += winAmount;
            msg.innerHTML = `🎉 <strong>JACKPOT!</strong> Je wint €${winAmount}!`;
        } else if (results[0] === results[1] || results[1] === results[2] || results[0] === results[2]) {
            // 2 dezelfde = Kleine prijs (2x de inzet)
            let winAmount = betAmount * 2;
            balance += winAmount;
            msg.innerHTML = `💰 <strong>Mooi zo!</strong> 2 gelijke! Je wint €${winAmount}.`;
        } else {
            // Geen gelijke = Verloren
            msg.innerText = "💸 Helaas, niets gewonnen. Probeer het nog eens!";
        }

        // Update saldo display
        document.getElementById('balance').innerText = balance;
        
        // Check voor Game Over
        if (balance <= 0) {
            msg.innerHTML = "💀 <span style='color:red;'>Je bent blut! Herlaad de pagina om opnieuw te starten.</span>";
        } else {
            btn.disabled = false;
        }
    }, 1000);
}
