// Base class
class Animal {
    void makeSound() {
        System.out.println("Animal makes a sound");
    }
}

// Subclass
class Dog extends Animal {
    @Override
    void makeSound() {
        System.out.println("Bark");
    }
}

public class InheritanceExample {
    public static void main(String[] args) {

        // Create Animal object
        Animal animal = new Animal();

        // Create Dog object
        Dog dog = new Dog();

        // Call methods
        animal.makeSound();
        dog.makeSound();
    }
}