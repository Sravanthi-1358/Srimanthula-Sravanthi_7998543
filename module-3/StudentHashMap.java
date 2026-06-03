import java.util.HashMap;
import java.util.Scanner;

public class StudentHashMap {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        HashMap<Integer, String> students = new HashMap<>();

        System.out.print("Enter the number of students: ");
        int n = sc.nextInt();
        sc.nextLine(); // consume newline

        // Add entries to HashMap
        for (int i = 1; i <= n; i++) {
            System.out.print("Enter Student ID: ");
            int id = sc.nextInt();
            sc.nextLine();

            System.out.print("Enter Student Name: ");
            String name = sc.nextLine();

            students.put(id, name);
        }

        // Retrieve name using ID
        System.out.print("\nEnter Student ID to search: ");
        int searchId = sc.nextInt();

        if (students.containsKey(searchId)) {
            System.out.println("Student Name: " + students.get(searchId));
        } else {
            System.out.println("Student ID not found.");
        }

        sc.close();
    }
}