//tipos: I(informativo); A(alerta); S(Sucesso)
function mensagem(tipo='I', mensagem) {
    return alert(mensagem);
}

async function api(method = 'GET', recurso, body, headers = {}) {
    try{
        let response = await fetch('http://127.0.0.1:3333/' + recurso, {
            method: method,
            headers: {
                ...headers,
                'Authorization': getToken(),
            },
            body: body
        });

        let result = await response.json();

        return result;
    } catch (error) {
        console.log(error);
        return {message: 'Erro ao tentar realizar operação'};
    }
}

function changeProfile(event) {
    event = event? event : window.event;
    event.preventDefault();

    let profile = document.getElementById('profile');
    let profileImage = document.getElementsByClassName('profile')[0];
    let newImageURL = URL.createObjectURL(profile.files[0]);
    profileImage.style.backgroundImage = 'url('+newImageURL+')';
}

function changeImage(event) {
    event = event? event : window.event;
    event.preventDefault();

    let imagem = document.getElementById('image');
    let inputImage = document.getElementsByClassName('image')[0];
    let newImageURL = URL.createObjectURL(imagem.files[0]);
    inputImage.style.backgroundImage = 'url('+newImageURL+')';
}

function setToken(token) {
    localStorage.setItem('token', 'Bearer ' + token);
    let date = new Date();
    let days = 100;
    date.setTime(date.getTime() + (days*24*60*60*1000));
    expires = "; expires=" + date.toUTCString();
    document.cookie = "token=Bearer " + token  + expires + "; path=/";
}
function getToken() {
    return localStorage.getItem('token');
}
function deleteToken() {
    localStorage.removeItem('token');
    document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function setProfile(profile) {
    localStorage.setItem('profile', profile);
    let date = new Date();
    let days = 100;
    date.setTime(date.getTime() + (days*24*60*60*1000));
    expires = "; expires=" + date.toUTCString();
    document.cookie = "profile=" + profile  + expires + "; path=/";
}
function getProfile() {
    return localStorage.getItem('profile');
}
function deleteProfile() {
    localStorage.removeItem('profile');
    document.cookie = 'profile=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function setImage(image) {
    localStorage.setItem('image', image);
}
function getImage() {
    return localStorage.getItem('image');
}
function deleteImage() {
    localStorage.removeItem('image');
}

function setId(id) {
    localStorage.setItem('id', id);
}
function getId() {
    return localStorage.getItem('id');
}
function deleteId() {
    localStorage.removeItem('id');
}

function logon(dados) {
    setToken(dados.token);
    setProfile(dados.profile);
    setImage(dados.image);
    setId(dados.id);

    return goToHome();
}

function logout() {
    deleteToken();
    deleteProfile();
    deleteImage();
    deleteId();

    return goToHome();
}

function openDetalhes(params = {}) {
    if(typeof params == 'string')
        params = {conteudo: params}
    let cabecalho = !!params.cabecalho? params.cabecalho : 'Detalhes';
    let conteudo = !!params.conteudo? params.conteudo : '';

    let detalhesContainerFundo = document.getElementById('detalhes-container-fundo');
    let detalhesContainer = document.getElementById('detalhes-container');

    let detalhesOpen = document.getElementById('detalhes-open');

    let detalhesCabecallho = detalhesContainer.getElementsByClassName('titulo')[0];
    let detalhesConteudo = detalhesContainer.getElementsByClassName('conteudo')[0];

    detalhesCabecallho.innerHTML = cabecalho;
    detalhesConteudo.innerHTML = conteudo;

    detalhesOpen.checked = true;

}

function goToRoute(route = '/web') {
    let href = window.location.href
    let home = href.split('/')[0] + '//' + href.split('/')[2] + route;
    window.location = home
}

function goToHome() {
    goToRoute();
}



function mascaraPhone(event) {
    event = event? event : window.event;

    let phone = event.target.value;

    phone = new String(phone);
    let phoneNumber = phone.replace(/[^0-9]/g,'');
    let arrPhone = [];
    arrPhone.push(phoneNumber.substr(0,2))
    if(phoneNumber.length <= 10) {
        arrPhone.push(phoneNumber.substr(2,4))
        arrPhone.push(phoneNumber.substr(6,4))
    } else {
        arrPhone.push(phoneNumber.substr(2,5))
        arrPhone.push(phoneNumber.substr(7,4))
    }
    let retorno = '';
    if(!!arrPhone[0])
        retorno += `(${arrPhone[0]}`;
    if(!!arrPhone[1])
        retorno += `) ${arrPhone[1]}`;
    if(!!arrPhone[2])
        retorno += `-${arrPhone[2]}`;
    event.target.value = retorno;
}