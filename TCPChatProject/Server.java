import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;

public class Server {

    public static void main(String[] args) {

        try {

            ServerSocket serverSocket = new ServerSocket(5000);

            System.out.println("Server started...");
            System.out.println("Waiting for client connection...");

            Socket socket = serverSocket.accept();

            System.out.println("Client connected!");

            BufferedReader reader =
                    new BufferedReader(
                            new InputStreamReader(socket.getInputStream()));

            String message = reader.readLine();

            System.out.println("Client says: " + message);

            // Send reply to client
            PrintWriter writer =
                    new PrintWriter(socket.getOutputStream(), true);

            writer.println("Hello Client! Message received.");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}