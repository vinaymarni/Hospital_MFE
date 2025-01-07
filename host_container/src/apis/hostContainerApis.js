export const getAvailableRemotes = async (onUpdateData) => {
    let availableRemotes = [];
    const allRemotes = {
      panel_one: 'http://localhost:8081/remoteEntry.js',
      panel_two: 'http://localhost:8082/remoteEntry.js',
      panel_three: 'http://localhost:8083/remoteEntry.js',
      panel_four: 'http://localhost:8084/remoteEntry.js',
      panel_login: 'http://localhost:8085/remoteEntry.js',
    };
  
    const promises = Object.entries(allRemotes).map(async ([key, url]) => {
      try {
        await fetch(url, { method: 'HEAD' })
        .then((response) => {
          if(response) {
            availableRemotes = [...availableRemotes, key]
          };
        })
        .catch((error) => {
          console.warn(`Remote ${key} not available: ${error}`);
        })
      } catch {
        console.warn(`Remote not available: ${key} at ${url}`);
      }
    });
    await Promise.all(promises);
    onUpdateData("activeRemotes", new Set([...availableRemotes]));
    // return availableRemotes;
  };