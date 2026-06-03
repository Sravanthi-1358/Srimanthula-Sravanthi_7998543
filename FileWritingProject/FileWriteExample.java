import java.io.FileWriter;
import java.io.IOException;
import java.util.Scanner;

public class FileWriteExample {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        try {
            // Prompt user input
            System.out.print("Enter a string: ");
            String input = sc.nextLine();

            // Create FileWriter object
            FileWriter writer = new FileWriter("output.txt");

            // Write input to file
            writer.write(input);

            // Close writer
            writer.close();

            System.out.println("Data has been successfully written to output.txt");

        } catch (IOException e) {
            System.out.println("An error occurred while writing to the file.");
            e.printStackTrace();
        }

        sc.close();
    }
}