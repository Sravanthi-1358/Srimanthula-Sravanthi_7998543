import java.util.Random;
import java.util.Scanner;

public class NumberGuessingGame {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Random random = new Random();
        char playAgain;

        do {
            int secretNumber = random.nextInt(100) + 1;
            int guess = 0;
            int attempts = 0;

            System.out.println("\n=== Number Guessing Game ===");
            System.out.println("I have chosen a number between 1 and 100.");
            System.out.println("Try to guess it!");

            while (guess != secretNumber) {
                System.out.print("Enter your guess: ");
                guess = sc.nextInt();
                attempts++;

                if (guess < secretNumber) {
                    System.out.println("Too low! Try again.");
                } else if (guess > secretNumber) {
                    System.out.println("Too high! Try again.");
                } else {
                    System.out.println("\nYou guessed it!");
                    System.out.println("The number was " + secretNumber);
                    System.out.println("Attempts: " + attempts);
                }
            }

            System.out.print("\nDo you want to play again? (Y/N): ");
            playAgain = sc.next().charAt(0);

        } while (playAgain == 'Y' || playAgain == 'y');

        System.out.println("\nThanks for playing!");
        sc.close();
    }
}