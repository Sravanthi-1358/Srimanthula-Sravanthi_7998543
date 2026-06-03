import java.util.Scanner;

public class StringReversal {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        // Input string
        System.out.print("Enter a string: ");
        String str = sc.nextLine();

        // Reverse using StringBuilder
        String reversed = new StringBuilder(str).reverse().toString();

        // Display result
        System.out.println("Reversed string: " + reversed);

        sc.close();
    }
}