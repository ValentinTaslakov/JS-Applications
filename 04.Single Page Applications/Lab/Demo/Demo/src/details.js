// get info about single recipe by id
// display all information about recipe

export async function showDetailsView(id) {

    [...document.querySelectorAll('section')].forEach(s => s.style.display = 'none');

    const recipe = await getRcipeById(id);

    document.getElementById('details-view').style.display = 'block';

    displayRecipeData(recipe);

}

async function getRcipeById(id) {
    const response = await fetch('http://localhost:3030/data/recipes/' + id);
    const data = await response.json();

    return data;
}

function displayRecipeData(recipe) {
    document.getElementById('recipe-name').textContent = recipe.name;

    const ingrediantFragment = document.createDocumentFragment();
    for (const item of recipe.ingredients) {
        const element = document.createElement('li');
        element.textContent = item;
        ingrediantFragment.appendChild(element);
    }
    document.getElementById('recipe-ingredients').replaceChildren(ingrediantFragment);

    const stepsFragment = document.createDocumentFragment();
    for (const item of recipe.steps) {
        const element = document.createElement('li');
        element.textContent = item;
        stepsFragment.appendChild(element);
    }

    document.getElementById('recipe-steps').replaceChildren(stepsFragment);
}