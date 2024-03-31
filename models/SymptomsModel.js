export class SymptomsModel {
    constructor({ id, name, description,location }) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.location = location;
      this.age = age;
    
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
  