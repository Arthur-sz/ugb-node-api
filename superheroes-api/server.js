//Liga o servidor
const app = require("./src/app");//importa  o que o app.js exporta
const PORT = 3000;//define a porta que o servidor vai rodar

app.listen(PORT, () => { //abre a porta 3000 e fica esperando requisições
        console.log(`Server rodando em http://localhost:${PORT}`); //mostra no console que o servidor está rodando na porta 3000 que é iserida por {}
});