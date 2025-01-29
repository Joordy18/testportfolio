document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('contactForm');
    if (form) {
        form.onsubmit = async function(event) {
            event.preventDefault(); // Empêche l'envoi du formulaire

            // Récupérer les données de chaque élément du formulaire
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Stocker les données
            let data =
                'Name: ' + name + '\r\n' +
                'Email: ' + email + '\r\n' +
                'Message: ' + message;

            try {
                // Demander l'accès au fichier
                const handle = await window.showSaveFilePicker({
                    suggestedName: 'formResult.txt',
                    types: [{
                        description: 'Text Files',
                        accept: {'text/plain': ['.txt']}
                    }]
                });

                // Créer un flux d'écriture
                const writable = await handle.createWritable();

                // Écrire les données dans le fichier
                await writable.write(data);

                // Fermer le fichier
                await writable.close();
            } catch (err) {
                console.error('Erreur lors de l\'écriture du fichier:', err);
            }
        };
    }
});