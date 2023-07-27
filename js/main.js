const apiKey = 'key';
const apiUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

function getMeaning() {
  const wordInput = document.getElementById('wordInput').value;
  const url = `${apiUrl}${wordInput}`;

  fetch(url, {
    headers: {
      'Authorization': `Bearer ${apiKey}`
    }
  })
  .then(response => response.json())
  .then(data => {
    const resultContainer = document.getElementById('resultContainer');
    resultContainer.innerHTML = '';

    if (Array.isArray(data) && data.length > 0) {
      const primeiraDefinicao = data[0].meanings[0].definitions[0].definition;
      const palavra = data[0].word;
      
      const significadoElement = document.createElement('p');
      significadoElement.textContent = `Significado de "${palavra}": ${primeiraDefinicao}`;
      resultContainer.appendChild(significadoElement);
    } else {
      const erroElement = document.createElement('p');
      erroElement.textContent = `Não foi possível encontrar o significado da palavra "${wordInput}".`;
      resultContainer.appendChild(erroElement);
    }
  })
  .catch(error => {
    console.error('Erro ao obter dados da API:', error);
  });
}
