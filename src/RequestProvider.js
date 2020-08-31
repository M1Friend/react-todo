class RequestProvider {
  requestUrl = 'https://my-json-server.typicode.com/mcactus/react-todo/todos/'

  static async runRequest(method = 'GET', data = '', urlPart = '') {
    const safeUrlPart = String(urlPart);
    let requestParams = {
      method: method,
      headers: {
        'Content-type' : 'application/json; charset=UTF-8'
      }
    }

    if(data) {
      requestParams.body = data;
    }

    const response = await fetch(this.requestUrl + safeUrlPart, requestParams)
    .then(request => {console.log(request.text())});
    // return response.json();
  }

  static async getList() {
    return await this.runRequest();
  }

  static async createResorce(data) {
    return await this.runRequest('POST', data);
  }

  static async updateResource(data) {
    if(!data.id) throw new Error('Data object should contain an ID of updating resource');

    return await this.runRequest('PUT', data, data.id);
  }

  static async deleteResorce(id) {
    return await this.runRequest('DELETE', {}, id)
  }
}

export default RequestProvider;