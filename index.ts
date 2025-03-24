// Simple logging decorator
function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(`Calling ${propertyKey} with:`, args);
    return originalMethod.apply(this, args);
  };
}

class Example {
  @log
  greet(name: string) {
    return `Hello ${name}!`;
  }
}

// Usage
const example = new Example();
example.greet("world"); // Logs: "Calling greet with: ['world']"