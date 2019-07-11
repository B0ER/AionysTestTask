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

  async delete(prefix, id) {
    if (this.checkPrefix(prefix)) {
      await fetch(`api/${prefix}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
  }

  async update(prefix, id, data) {
    if (this.checkPrefix(prefix)) {
      await fetch(`api/${prefix}/${id}/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

    }
  }

  async getAllCity() {
    let response = await fetch(`api/clients/cities`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    });

    let cities = await response.json();
    return cities;
  }

  async getAllFirstName() {
    let response = await fetch(`api/clients/firstnames`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    });

    let firstnames = await response.json();
    return firstnames;
  }
}