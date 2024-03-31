export class UserModel {
    constructor({ id, username, email, password }) {
      this.id = id;
      this.username = username;
      this.email = email;
      this.password = password;
      //user probably needs to have an image
    }
  
    isValid() {
      return this.username && this.email && this.password;
    }
  
    toJSON() {
      return {
        id: this.id,
        username: this.username,
        email: this.email,
        password: this.password,
      };
    }
  }
  