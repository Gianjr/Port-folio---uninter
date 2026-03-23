// Captura o formulário
const form = document.getElementById("formContato");

form.addEventListener("submit", function(event) {
    event.preventDefault(); // impede envio real

    // Pegando valores
    let nome = document.getElementById("nome").value.trim();
    let email = document.getElementById("email").value.trim();
    let mensagem = document.getElementById("mensagem").value.trim();

    // Validação simples
    if (!nome || !email || !mensagem) {
        alert("Preencha todos os campos!");
        return;
    }

    // Validação de email simples
    if (!email.includes("@") || !email.includes(".")) {
        alert("E-mail inválido!");
        return;
    }

    // Pega mensagens existentes do localStorage
    let mensagens = [];
    const storage = localStorage.getItem("mensagens");
    if (storage) {
        try {
            mensagens = JSON.parse(storage);
            if (!Array.isArray(mensagens)) mensagens = [];
        } catch(e) {
            mensagens = [];
        }
    }

    // Cria nova mensagem
    const novaMensagem = {
        nome: nome,
        email: email,
        mensagem: mensagem,
        data: new Date().toLocaleString()
    };

    // Adiciona ao array existente
    mensagens.push(novaMensagem);

    // Salva de volta no localStorage
    localStorage.setItem("mensagens", JSON.stringify(mensagens));

    // Mostra no console todas as mensagens acumuladas
    console.clear(); // opcional: limpa o console para ver apenas as mensagens atuais
    console.log("Mensagens armazenadas:");
    mensagens.forEach((msg, index) => {
        console.log(`${index + 1}. [${msg.data}] ${msg.nome} (${msg.email}): ${msg.mensagem}`);
    });

    // Feedback para o usuário
    alert("Mensagem salva localmente com sucesso!");

    // Limpa campos
    form.reset();
});