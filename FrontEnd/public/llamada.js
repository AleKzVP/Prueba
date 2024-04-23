export default async function llamada(url, data) {
    // Configuración de la solicitud
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
  
    try {
      // Realizar la solicitud fetch
      const response = await fetch(url, options);
      
      if (!response.ok) {
        throw new Error('Ocurrió un error al enviar los datos');
      }
      
      const responseData = await response.json();
      
      console.log('Respuesta del servidor:', responseData);
      
      return responseData;
    } catch (error) {
      console.error('Error:', error.message);
      throw error;
    }
  }
  