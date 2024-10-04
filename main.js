document.addEventListener('DOMContentLoaded', function () {
    const name = document.querySelector('#name');
    const username = document.querySelector('#username');
    const avatar = document.querySelector('#avatar');
    const repos = document.querySelector('#repos');
    const followers = document.querySelector('#followers');
    const following = document.querySelector('#following');
    const link = document.querySelector('#link');

    const github = prompt('Digite seu usuário GitHub');

    if (!github) {
        alert('Nenhum usuário digitado, reinicie a página e tente novamente');
        setTimeout(function () {
            location.reload(true);
        }, 1000);
    } else {
        const api = `https://api.github.com/users/${github}`;

        document.getElementById("username").innerHTML = github;

        fetch(api)
            .then(function (res) {
                if (!res.ok) {
                    throw new Error(`Erro na requisição: ${res.status} - ${res.statusText}`);
                }
                return res.json();
            })
            .then(function (json) {
                if (json.public_repos === 0) {
                    alert("Esse usuário não tem nenhum repositório público.");
                } else {
                    name.innerText = json.name;
                    avatar.src = json.avatar_url;
                    following.innerText = json.following;
                    followers.innerHTML = json.followers;
                    repos.innerText = json.public_repos;
                    link.href = json.html_url;
                }
            })
            .catch(function (error) {
                console.error('Erro ao buscar os dados:', error);
                alert('Ocorreu um erro ao buscar os dados. Verifique o nome de usuário e tente novamente.');
            });
    }
});
