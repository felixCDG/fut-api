document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('searchButton').addEventListener('click', async function() {
      const searchQuery = document.getElementById('search').value.toLowerCase().trim();
      if (searchQuery === "") {
        alert("Digite o nome da competição");
        return;
      }
  
      // Lista das ligas e suas respectivas URLs
      const leagues = {
        'premier league': 'https://raw.githubusercontent.com/openfootball/football.json/master/2020-21/en.1.json',
        'la liga': 'https://raw.githubusercontent.com/openfootball/football.json/master/2020-21/es.1.json',
        'serie a': 'https://raw.githubusercontent.com/openfootball/football.json/master/2020-21/it.1.json',
        'bundesliga': 'https://raw.githubusercontent.com/openfootball/football.json/master/2020-21/de.1.json',
        'ligue 1': 'https://raw.githubusercontent.com/openfootball/football.json/master/2020-21/fr.1.json',
      };
  
      const apiUrl = leagues[searchQuery];
      if (!apiUrl) {
        alert("Liga não encontrada! Tente outra.");
        return;
      }
  
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
  
        if (data.matches && data.matches.length > 0) {
          const resultContainer = document.getElementById('resultContainer');
          resultContainer.innerHTML = ''; // Limpar resultados anteriores
  
          // Criar um card para a liga
          const card = createCard(data);
          resultContainer.appendChild(card);
        } else {
          alert("Nenhuma competição encontrada");
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        alert("Ocorreu um erro ao buscar as competições.");
      }
    });
  });
  
  function createCard(data) {
    const card = document.createElement('div');
    card.classList.add('card');
  
    const img = document.createElement('img');
    img.src = 'https://via.placeholder.com/50'; // Imagem placeholder (você pode atualizar para a imagem real da liga)
    img.alt = 'Logo da liga';
  
    const name = document.createElement('h3');
    name.textContent = data.name;
  
    const button = document.createElement('button');
    button.textContent = 'Acessar aqui';
    button.addEventListener('click', () => {
      // Remover o card
      card.remove();
  
      // Exibir a tabela de classificação
      displayStandings(data);
    });
  
    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(button);
  
    return card;
  }
  
  function displayStandings(data) {
    const resultContainer = document.getElementById('resultContainer');
  
    // Criar uma tabela para as classificações
    const table = document.createElement('table');
    table.classList.add('standings-table');
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = `
      <th>Posição</th>
      <th>Time</th>
      <th>Escudo</th>
      <th>Pontos</th>
    `;
    table.appendChild(headerRow);
  
    // Adicionar as equipes à tabela
    data.standings[0].table.forEach((team, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${team.team.name}</td>
        <td><img src="${team.team.crestUrl}" alt="${team.team.name}" width="30" height="30"></td>
        <td>${team.points}</td>
      `;
      table.appendChild(row);
    });
  
    // Adicionar a tabela ao container de resultados
    resultContainer.appendChild(table);
  }
  