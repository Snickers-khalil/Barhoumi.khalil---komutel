import http from "../http-common";

class ContactDataService {
  getAll() {
    return http.get("/contact/all");
  }

  get(id) {
    return http.get(`/contact/${id}`);
  }

  create(data) { 
    return http.post("/contact/add", data);
  }

  update(id, data) {
    return http.put(`/contact/${id}`, data);
  }

  delete(id) {
    return http.delete(`/contact/${id}`);
  }

}

export default new ContactDataService();