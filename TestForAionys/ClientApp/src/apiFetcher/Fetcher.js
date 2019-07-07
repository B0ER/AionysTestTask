export class Fetcher {
  checkPrefix(prefix) {
    switch (prefix) {
      case "visits":
        return true;

      case "clients":
        return true;

      default:
        console.error('Prefix not found!');
        return false;
    }
  }

  async getAll(prefix) {
    if (this.checkPrefix(prefix)) {
      let response = await fetch(`api/${prefix}/`);
      let result = response.json();
      return result;
    }
  }

  async insert(prefix, data) {
    if (this.checkPrefix(prefix)) {
      let response = await fetch(`api/${prefix}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      let result = response.json();
      return result;
    }
  }
}