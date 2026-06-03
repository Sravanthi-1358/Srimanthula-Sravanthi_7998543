import java.util.Arrays;
import java.util.List;

record Person(String name, int age) {}

public class RecordExample {
    public static void main(String[] args) {

        // Create record instances
        Person p1 = new Person("Ravi", 22);
        Person p2 = new Person("Priya", 18);
        Person p3 = new Person("Kiran", 25);

        // Print record instances
        System.out.println("Persons:");
        System.out.println(p1);
        System.out.println(p2);
        System.out.println(p3);

        // Store records in a List
        List<Person> people = Arrays.asList(p1, p2, p3);

        // Filter people with age >= 21 using Streams
        System.out.println("\nPeople aged 21 or above:");
        people.stream()
              .filter(person -> person.age() >= 21)
              .forEach(System.out::println);
    }
}