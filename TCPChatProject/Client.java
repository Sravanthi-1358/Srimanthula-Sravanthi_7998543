import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;

public class Client {

    public static void main(String[] args) {

        try {

            Socket socket = new Socket("localhost", 5000);

            System.out.println("Connected to server!");

            // Send message to server
            PrintWriter writer =
                    new PrintWriter(socket.getOutputStream(), true);

            writer.println("Hello Server!");

            System.out.println("Message sent to server.");

            // Receive reply from server
            BufferedReader reader =
                    new BufferedReader(
                            new InputStreamReader(socket.getInputStream()));

            String reply = reader.readLine();

            System.out.println("Server says: " + reply);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}