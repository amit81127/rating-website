const axios = require('axios');

async function testWinnerPagination() {
  try {
    const baseURL = 'http://localhost:5000'; 
    
    console.log('Testing Winner Page 1...');
    const res1 = await axios.get(`${baseURL}/allParticipantsByVotes?page=1&limit=2`);
    console.log('Page 1 Data Length:', res1.data.data.length);
    console.log('Page 1 Meta:', res1.data.meta);

    console.log('\nTesting Winner Page 2...');
    const res2 = await axios.get(`${baseURL}/allParticipantsByVotes?page=2&limit=2`);
    console.log('Page 2 Data Length:', res2.data.data.length);
    console.log('Page 2 Meta:', res2.data.meta);

  } catch (err) {
    console.error('Error:', err.message);
    if (err.response) {
        console.error('Response data:', err.response.data);
    }
  }
}

testWinnerPagination();
