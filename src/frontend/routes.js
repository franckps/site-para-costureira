const express = require('express')
const axios = require('axios')

let myURL = `${process.env.URL}`

const api = axios.create({ baseURL: myURL });

const router = express.Router()

router.use((req, resp, next) => {
    req.token = '';
    req.profile = '';
    if(!!req.headers.cookie){
        let token = req.headers.cookie.split('token=')[1];
        if(!!token){
            token = token.split(';')[0];
            if(!!token)
                req.token = token.trim();
        }
        let profile = req.headers.cookie.split('profile=')[1];
        if(!!profile){
            profile = profile.split(';')[0];
            if(!!profile)
                req.profile = profile.trim();
        }
    }
    return next();
})
/**
 * Iniciais
 */
router.get('/', async (req, resp, next) => {
    let produtos = [];
    let servicos = [];
    if(!!req.query.pesquisa) {
        produtos = (await api.get(`product?browser=${req.query.pesquisa}`, { headers : {"Authorization": req.token} })).data;
        servicos = (await api.get(`service?browser=${req.query.pesquisa}`, { headers : {"Authorization": req.token} })).data;
    } else {
        produtos = (await api.get('product', { headers : {"Authorization": req.token} })).data;
        servicos = (await api.get('service', { headers : {"Authorization": req.token} })).data;
    }
    resp.render('index.ejs', { items: [
        ...produtos.map(element => { return {...element, 'tipo':'produto'} }), 
        ...servicos.map(element => { return {...element, 'tipo':'servico'} })
    ], profile: req.profile });
})

router.get('/produtos', async (req, resp, next) => {
    let produtos = [];
    if(!!req.query.pesquisa) {
        produtos = (await api.get(`product?browser=${req.query.pesquisa}`, { headers : {"Authorization": req.token} })).data;
    } else {
        produtos = (await api.get('product', { headers : {"Authorization": req.token} })).data;
    }
    resp.render('produtos-servicos.ejs', { items: [
        ...produtos.map(element => { return {...element, 'tipo':'produto'} })
    ], profile: req.profile });
})

router.get('/servicos', async (req, resp, next) => {
    let servicos = [];
    if(!!req.query.pesquisa) {
        servicos = (await api.get(`service?browser=${req.query.pesquisa}`, { headers : {"Authorization": req.token} })).data;
    } else {
        servicos = (await api.get('service', { headers : {"Authorization": req.token} })).data;
    }
    resp.render('produtos-servicos.ejs', { items: [
        ...servicos.map(element => { return {...element, 'tipo':'servico'} })
    ], profile: req.profile });
})

/**
 * Listas
 */
router.get('/cliente', async (req, resp, next) => {
    let clientes = []
    if(!!req.query.pesquisa)
        clientes = (await api.get(`customer?browser=${req.query.pesquisa}`, { headers : {"Authorization": req.token} })).data;
    else
        clientes = (await api.get('customer', { headers : {"Authorization": req.token} })).data;

    resp.render('./listas/cliente.ejs', {dados: clientes, profile: req.profile});
})
router.get('/usuario', async (req, resp, next) => {
    const usuarios = (await api.get('user', { headers : {"Authorization": req.token} })).data;
    resp.render('./listas/usuario.ejs', {dados: usuarios, profile: req.profile});
})
router.get('/produto', async (req, resp, next) => {
    const produtos = (await api.get('product', { headers : {"Authorization": req.token} })).data;
    resp.render('./listas/produto.ejs', {dados: produtos, profile: req.profile});
})
router.get('/servico', async (req, resp, next) => {
    const servicos = (await api.get('service', { headers : {"Authorization": req.token} })).data;
    resp.render('./listas/servico.ejs', {dados: servicos, profile: req.profile});
})
router.get('/pedido', async (req, resp, next) => {
    const pedidos = (await api.get('request', { headers : {"Authorization": req.token} })).data;
    resp.render('./listas/pedido.ejs', {dados: pedidos, profile: req.profile});
})

/**
 * Formularios
 */
//Cadastros
router.get('/cliente/cadastro', (req, resp, next) => {
    resp.render('./cadastro/cadastro-cliente.ejs', {profile: req.profile});
})
router.get('/usuario/cadastro', (req, resp, next) => {
    resp.render('./cadastro/cadastro-usuario.ejs', {profile: req.profile});
})
router.get('/produto/cadastro', (req, resp, next) => {
    resp.render('./cadastro/cadastro-produto.ejs', {profile: req.profile});
})
router.get('/servico/cadastro', (req, resp, next) => {
    resp.render('./cadastro/cadastro-servico.ejs', {profile: req.profile});
})
router.get('/pedido/produto/cadastro/:id', async (req, resp, next) => {
    if(!!req.params.id){
        produto = (await api.get(`product/${req.params.id}`, { headers : {"Authorization": req.token} })).data;
        resp.render('./cadastro/cadastro-pedido-produto.ejs', {product_id: req.params.id, amount: 1, produto, profile: req.profile});
    }
})
router.get('/pedido/servico/cadastro/:id', async (req, resp, next) => {
    if(!!req.params.id){
        servico = (await api.get(`service/${req.params.id}`, { headers : {"Authorization": req.token} })).data;
        resp.render('./cadastro/cadastro-pedido-servico.ejs', {service_id: req.params.id, servico, profile: req.profile});
    }
})
//Atualizar cadastros
router.get('/cliente/cadastro/:id', async (req, resp, next) => {
    cliente = (await api.get(`customer/${req.params.id}`, { headers : {"Authorization": req.token} })).data;
    resp.render('./atualizar/cadastro-cliente.ejs', { cliente, profile: req.profile });
})
router.get('/usuario/cadastro/:id', async (req, resp, next) => {
    usuario = (await api.get(`user/${req.params.id}`, { headers : {"Authorization": req.token} })).data;
    resp.render('./atualizar/cadastro-usuario.ejs', { usuario, profile: req.profile });
})
router.get('/produto/cadastro/:id', async (req, resp, next) => {
    produto = (await api.get(`product/${req.params.id}`, { headers : {"Authorization": req.token} })).data;
    resp.render('./atualizar/cadastro-produto.ejs', { produto, profile: req.profile });
})
router.get('/servico/cadastro/:id', async (req, resp, next) => {
    servico = (await api.get(`service/${req.params.id}`, { headers : {"Authorization": req.token} })).data;
    resp.render('./atualizar/cadastro-servico.ejs', { servico, profile: req.profile });
})

/**
 * Formularios login
 */
router.get('/login', (req, resp, next) => {
    resp.render('./login/cliente.ejs', {profile: req.profile});
})
router.get('/login/usuario', (req, resp, next) => {
    resp.render('./login/usuario.ejs', {profile: req.profile});
})


module.exports = router