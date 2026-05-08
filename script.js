async function copiarDica(chave) {
    try {
        // 1. Ajuste do caminho para a pasta json/
        const caminhoArquivo = `json/${chave}.json`;

        // 2. Busca o arquivo dentro da pasta especificada
        const response = await fetch(caminhoArquivo);
        
        if (!response.ok) {
        throw new Error(`Arquivo não encontrado em: ${caminhoArquivo}`);
        }

        const dados = await response.json();

        // 3. Verifica se a chave existe no JSON e copia
        if (dados[chave]) {
        const texto = dados[chave];
        await navigator.clipboard.writeText(texto);
        
        // Feedback visual opcional
        console.log(`Sucesso: "${texto}" copiado de ${caminhoArquivo}`);
        alert(`Prompt de ${chave} copiado para a área de transferência!`);
        } else {
        alert(`Chave "${chave}" não encontrada dentro do arquivo.`);
        }

    } catch (err) {
        console.error("Erro na requisição:", err);
        alert("Erro ao carregar o arquivo. Verifique se a pasta 'json' e o arquivo existem.");
    }
    }

    // Inicialização dos botões
    document.addEventListener("DOMContentLoaded", () => {
    const botoes = document.querySelectorAll("[data-dica]");
    
    botoes.forEach(botao => {
        botao.addEventListener("click", (e) => {
        // Captura o valor do atributo data-dica (ex: dicas-de-casa)
        const chave = e.target.getAttribute("data-dica");
        copiarDica(chave);
        });
    });
});