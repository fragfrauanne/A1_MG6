const tasks = [
    { question: "der Radiergummi", answer: "Ihren / deinen - meinen" },
    { question: "die Zigaretten", answer: "Ihre / deine - meine" },
    { question: "die Fahrkarte", answer: "Ihre / deine - meine" },
    { question: "das Handy", answer: "Ihr / dein - mein" },
    { question: "der Bleistift", answer: "Ihren / deinen - meinen" },
    { question: "der (An)Spitzer", answer: "Ihren / deinen - meinen" },
    { question: "das Buch", answer: "Ihr / dein - mein" },
    { question: "die Kamera", answer: "Ihre / deine - meine" },
    { question: "die EC-Karte", answer: "Ihre / deine - meine" },
    { question: "der Ausweis", answer: "Ihren / deinen - meinen" },
    { question: "das Geld", answer: "Ihr / dein - mein" },
    { question: "die Hausaufgaben", answer: "Ihre / deine - meine" },
    { question: "der Schnellhefter", answer: "Ihren / deinen - meinen" },
    { question: "die Schere", answer: "Ihre / deine - meine" },
    { question: "der Regenschirm", answer: "Ihren / deinen - meinen" },
    { question: "das Fahrrad", answer: "Ihr / dein - mein" },
    { question: "der Schlüssel", answer: "Ihren / deinen - meinen" },
    { question: "die Uhr", answer: "Ihre / deine - meine" }
];

const container = document.getElementById("cardsContainer");
const fireworks = document.getElementById("fireworks");

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createCards(tasks) {
    container.innerHTML = "";

    shuffle(tasks).forEach(task => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">${task.question}</div>
                <div class="card-back">
                    <p>${task.answer}</p>
                    <div>
                        <button class="correctBtn">✅</button>
                        <button class="wrongBtn">❌</button>
                    </div>
                </div>
            </div>
        `;

        // Klicken auf die Karte dreht sie um, wenn sie noch nicht umgedreht ist
        card.addEventListener("click", () => {
            if (!card.classList.contains("flipped")) {
                card.classList.add("flipped");
            }
        });

        // Beim "Richtig"-Button entfernen wir die Karte
        card.querySelector(".correctBtn").onclick = (e) => {
            e.stopPropagation(); // Verhindert, dass das Klicken auf den Button auch das Klicken auf die Karte auslöst
            card.remove();
            checkEnd();
        };

        // Beim "Falsch"-Button soll die Karte nach 1 Sekunde wieder umgedreht und neu positioniert werden
        card.querySelector(".wrongBtn").onclick = (e) => {
            e.stopPropagation();
            setTimeout(() => {
                card.classList.remove("flipped");
                repositionCard(card);
            }, 1000);
        };

        container.appendChild(card);
    });
}

// Diese Funktion entfernt die Karte aus dem Container und fügt sie an einer zufälligen Position wieder ein.
function repositionCard(card) {
    // Zuerst entfernen wir die Karte aus dem Container
    container.removeChild(card);
    // Bestimme die Anzahl der aktuell vorhandenen Karten
    const children = container.children;
    // Wähle einen zufälligen Index zwischen 0 und der Anzahl der vorhandenen Karten (inklusive Möglichkeit, am Ende einzufügen)
    const randomIndex = Math.floor(Math.random() * (children.length + 1));
    if (randomIndex === children.length) {
        container.appendChild(card);
    } else {
        container.insertBefore(card, children[randomIndex]);
    }
}

// Überprüft, ob alle Karten entfernt wurden und das Feuerwerk angezeigt werden soll.
function checkEnd() {
    if (container.children.length === 0) {
        fireworks.style.display = "block";
        setTimeout(() => { fireworks.style.display = "none"; }, 4000);
    }
}

createCards(tasks);