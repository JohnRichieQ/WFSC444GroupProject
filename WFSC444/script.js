document.getElementById('player-form').addEventListener('submit', function(event) {
    event.preventDefault();
    var playerName = document.getElementById('player-name').value;
    if (playerName) {
        var playerDiv = document.createElement('div');
        playerDiv.textContent = playerName + ': 0';
        document.getElementById('players').appendChild(playerDiv);
        var scoreButton = document.createElement('button');
        scoreButton.textContent = 'Add Score for ' + playerName;
        scoreButton.addEventListener('click', function() {
            var score = parseInt(playerDiv.textContent.split(': ')[1]) + 1;
            playerDiv.textContent = playerName + ': ' + score;
        });
        document.getElementById('score-buttons').appendChild(scoreButton);
    }
    document.getElementById('player-name').value = '';
});

document.getElementById('hint-form').addEventListener('submit', function(event) {
    event.preventDefault();
    var hintText = document.getElementById('hint-text').value;
    if (hintText) {
        var hintDiv = document.createElement('div');
        hintDiv.textContent = hintText;
        document.getElementById('hints').appendChild(hintDiv);
        saveHints();
    }
    document.getElementById('hint-text').value = '';
});

document.getElementById('hint-file').addEventListener('change', function(event) {
    var file = event.target.files[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function(e) {
            var hints = e.target.result.split('\n');
            for (var i = 0; i < hints.length; i++) {
                var hintDiv = document.createElement('div');
                hintDiv.textContent = hints[i];
                document.getElementById('hints').appendChild(hintDiv);
            }
            saveHints();
        };
        reader.readAsText(file);
    }
});

document.getElementById('start-game').addEventListener('click', function() {
    var hints = document.getElementById('hints').children;
    if (hints.length > 0) {
        var randomIndex = Math.floor(Math.random() * hints.length);
        document.getElementById('current-hint').textContent = 'Current Hint: ' + hints[randomIndex].textContent;
        document.getElementById('hints').removeChild(hints[randomIndex]);
    } else {
        document.getElementById('current-hint').textContent = 'No more hints. Please add more hints.';
    }
});

function saveHints() {
    var hints = Array.from(document.getElementById('hints').children).map(function(hintDiv) {
        return hintDiv.textContent;
    });
    localStorage.setItem('allHints', JSON.stringify(hints));
}

function loadHints() {
    var hints = JSON.parse(localStorage.getItem('allHints'));
    if (hints) {
        for (var i = 0; i < hints.length; i++) {
            var hintDiv = document.createElement('div');
            hintDiv.textContent = hints[i];
            document.getElementById('hints').appendChild(hintDiv);
        }
    }
}

function resetHints() {
    var hints = JSON.parse(localStorage.getItem('allHints'));
    if (hints) {
        document.getElementById('hints').innerHTML = '';
        for (var i = 0; i < hints.length; i++) {
            var hintDiv = document.createElement('div');
            hintDiv.textContent = hints[i];
            document.getElementById('hints').appendChild(hintDiv);
        }
    }
}

document.getElementById('reset-hints').addEventListener('click', resetHints);

loadHints();
