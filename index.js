// Importando as bibliotecas necessárias
const dotenv = require('dotenv');
const axios = require('axios');

// Carregando as variáveis de ambiente do arquivo .env
dotenv.config();

// Montando a URL da API com base nas variáveis de ambiente
const apiUrl = `${process.env.url}?q=${process.env.q}&appid=${process.env.appid}`;

// Fazendo uma requisição GET para a URL da API
axios.get(apiUrl)
  .then((response) => {
    const data = response.data[0]; // Os dados estão em um array, então pegamos o primeiro elemento
    const latitude = data.lat;
    const longitude = data.lon;
    
    // Exibindo a resposta da API com as coordenadas de latitude e longitude
    console.log('Resposta da API:');
    console.log(`Latitude: ${latitude}`);
    console.log(`Longitude: ${longitude}`);

    // Montando a URL da API "current" com base nas coordenadas obtidas
    const Urlcurrent = `${process.env.Urlcurrent}?lat=${latitude}&lon=${longitude}&appid=${process.env.appid}`;
    
    // Fazendo uma nova requisição GET para a Urlcurrent
    axios.get(Urlcurrent)
      .then((currentResponse) => {
        // Acessando informações de "feels_like" e "description" na resposta
        const feelsLike = currentResponse.data.main.feels_like;
        const description = currentResponse.data.weather[0].description;
       
        // Conversão para Celsius
        const feels_like_celsius =  feelsLike - 273.15;
       
        // Exibindo as informações de "feels_like" e "description"
        console.log(`Sensação Termica : ${feels_like_celsius.toFixed(2)} °C`);
        console.log(`Descrição do Tempo: ${description}`);


      })
      .catch((currentError) => {
        console.error('Erro ao buscar informações "current":', currentError);
      });
  })
  .catch((error) => {
    console.error('Erro ao buscar informações:', error);
  });
