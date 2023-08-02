const myName = 'Nicolas';
const myAge = 12;

const sum = (a: number, b: number) => {
  return a + b;
};

sum(2, 4);

class Person {
  // public viene por defecto
  // public name;
  // private age;
  constructor(private age: number, private name: string) {
    this.age = age;
    this.name = name;
  }

  getSummary() {
    return `My name is ${this.name} and my age is ${this.age}`;
  }
}

const fabian = new Person(19, 'Fabian');
fabian.getSummary();
