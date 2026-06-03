import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class LambdaSortExample {
    public static void main(String[] args) {
        
        // Create a list of strings
        List<String> names = new ArrayList<>();
        names.add("Ravi");
        names.add("Priya");
        names.add("Kiran");
        names.add("Anu");

        // Sort the list using a lambda expression
        Collections.sort(names, (a, b) -> a.compareTo(b));

        // Display the sorted list
        System.out.println("Sorted List:");
        for (String name : names) {
            System.out.println(name);
        }
    }
}