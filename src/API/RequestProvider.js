class RequestProvider {
  static requestUrl = 'https://my-json-server.typicode.com/mcactus/react-todo/todos/';

  static async runRequest(method = 'GET', data = '', urlPart = '') {
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

  static getList() {
    return this.runRequest();
  }

  static createResource(data) {
    return this.runRequest('POST', data);
  }

  static updateResource(data) {
    if(!data.id) throw new Error('Data object should contain an ID of updating resource');

    return this.runRequest('PUT', data, data.id);
  }

  static deleteResource(id) {
    return this.runRequest('DELETE', {}, id)
  }
}

export default RequestProvider;