// Seu arquivo JavaScript (app.js)

const baseUrl = 'https://low-carb-recipes.p.rapidapi.com/random';
let InfosRecipe = {};

async function buscarReceita() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'ac4a0b9821msh3e8627d96d7f0b2p12f1f0jsn30848489f307',
            'X-RapidAPI-Host': 'low-carb-recipes.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(baseUrl, options);
        const responseData = await response.json();
        InfosRecipe = responseData;
        exibirIngredientes(); // Chama a função para exibir os ingredientes na tela
    } catch (error) {
        console.error(error);
    }
}

function exibirIngredientes() {
    const recipeInfoDiv = document.getElementById('recipeInfo');

    // Verifica se InfosRecipe contém o nome da receita
    if (InfosRecipe.hasOwnProperty('name')) {
        const recipeName = InfosRecipe.name;

        // Verifica se InfosRecipe contém a lista de ingredientes
        if (InfosRecipe.hasOwnProperty('ingredients') && Array.isArray(InfosRecipe.ingredients)) {
            // Cria uma lista de ingredientes
            const ingredientList = InfosRecipe.ingredients.map(ingredient => `<li>${obterNomeIngrediente(ingredient)}</li>`).join('');

            // Verifica se InfosRecipe contém o modo de preparo
            if (InfosRecipe.hasOwnProperty('steps') && Array.isArray(InfosRecipe.steps)) {
                // Cria uma lista de passos de preparo
                const stepsList = InfosRecipe.steps.map(step => `<li>${step}</li>`).join('');

                // Verifica se InfosRecipe contém a imagem
                if (InfosRecipe.hasOwnProperty('image')) {
                    const recipeImage = InfosRecipe.image;

                    // Cria a estrutura HTML para exibir os ingredientes, modo de preparo, nome da receita e imagem
                    const infoString = `
                        <h2>${recipeName}</h2>
                        <img src="${recipeImage}" alt="${recipeName}"/>
                        <h3>Ingredientes:</h3>
                        <ul>${ingredientList}</ul>
                        <h3>Modo de Preparo:</h3>
                        <ol>${stepsList}</ol>
                    `;

                    // Atribui a string ao conteúdo da div
                    recipeInfoDiv.innerHTML = infoString;
                } else {
                    // Se não houver imagem, exibe apenas o nome da receita, ingredientes e modo de preparo
                    recipeInfoDiv.innerHTML = `
                        <h2>${recipeName}</h2>
                        <h3>Ingredientes:</h3>
                        <ul>${ingredientList}</ul>
                        <h3>Modo de Preparo:</h3>
                        <ol>${stepsList}</ol>
                        <p>Nenhuma imagem disponível para esta receita.</p>
                    `;
                }
            } else {
                // Se não houver modo de preparo, exibe apenas o nome da receita e os ingredientes
                recipeInfoDiv.innerHTML = `
                    <h2>${recipeName}</h2>
                    <h3>Ingredientes:</h3>
                    <ul>${ingredientList}</ul>
                    <p>Nenhum modo de preparo disponível para esta receita.</p>
                `;
            }
        } else {
            // Se não houver lista de ingredientes, exibe apenas o nome da receita
            recipeInfoDiv.innerHTML = `<h2>${recipeName}</h2><p>Nenhum ingrediente disponível para esta receita.</p>`;
        }
    } else {
        // Se não houver nome da receita, exibe uma mensagem adequada
        recipeInfoDiv.innerHTML = '<p>Nenhuma receita disponível.</p>';
    }
}

// Função para obter o nome do ingrediente usando a propriedade 'name'
function obterNomeIngrediente(ingrediente) {
    return ingrediente.hasOwnProperty('name') ? ingrediente.name : ingrediente;
}

// Adiciona um ouvinte de evento ao formulário para chamar buscarReceita() ao clicar no botão
document.getElementById('recipeForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita o comportamento padrão de recarregar a página ao enviar o formulário
    buscarReceita();
});
