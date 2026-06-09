async function SalvarEvento() {
    const nome = document.getElementById("nome_evento").value;
    const descricao = document.getElementById("descricao").value;
    const data_inicio = document.getElementById("data_inicio").value;
    const data_fim = document.getElementById("data_fim").value;
    const local = document.getElementById("local").value;
    const limite_participantes = document.getElementById("limite_participantes").value;
    const evento = {
        nome_evento: nome,
        descricao,
        data_inicio,
        data_fim,
        local,
        limite_participantes
    };

    // Campos Obrigatórios
    if (nome === "" || descricao === "" || data_inicio === "" || data_fim === "" || local === "" || limite_participantes === "") {
        alert("Não foi possível criar um novo evento. Preencha todos os campos obrigatórios.");
        return;
    }

    // Tamanho Mínimo
    if (nome.length < 5) {
        alert("O nome do evento deve ter no mínimo 5 caracteres.");
        return;
    } 
    if (descricao.length < 10) {
        alert("A descrição do evento deve ter no mínimo 10 caracteres.");
        return;
    }
    if (local.length < 5) {
        alert("O local do evento deve ter no mínimo 5 caracteres.");
        return;
    } 

    // Datas Válidas
    if (new Date(data_fim) < new Date(data_inicio)) {
        alert("A data de término não pode ser anterior à data de início, insira uma data válida!");
        return;
    }

    // Limite Numérico
    if (limite_participantes < 1) {
        alert("O limite de participantes deve ser maior que 0.");
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/eventos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(evento)
        });

        if (!response.ok) {
            throw new Error("Erro ao salvar evento");
        }

        const resultado = await response.json();

        alert("Evento criado com sucesso!");
        console.log(resultado);

        window.location.href = "/Pages/PaginaPrincipal.html";

    } catch (error) {
        console.error(error);
        alert("Erro ao criar evento.");
    }
}