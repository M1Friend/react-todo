class RequestProvider {
  requestUrl = 'https://my-json-server.typicode.com/mcactus/react-todo/todos/'
  // static requestUrl = 'https://jsonplaceholder.typicode.com/todos/'

  async runRequest(method = 'GET', data = '', urlPart = '') {
    const safeUrlPart = String(urlPart);
    let requestParams = {
      method: method,
      headers: {
        'Content-type' : 'application/json; charset=UTF-8'
      }
    }

    if(data) {
      requestParams.body = JSON.stringify(data);
    }

    const response = await fetch(this.requestUrl + safeUrlPart, requestParams)
    return response.json();
  }

  async getList() {
    return await this.runRequest();
  }

  async createResource(data) {
    return await this.runRequest('POST', data);
  }

  async updateResource(data) {
    if(!data.id) throw new Error('Data object should contain an ID of updating resource');

    return await this.runRequest('PUT', data, data.id);
  }

  async deleteResource(id) {
    return await this.runRequest('DELETE', {}, id)
  }
}

export default new RequestProvider();