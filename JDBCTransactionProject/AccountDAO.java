import java.sql.Connection;
import java.sql.DriverManager;

public class AccountDAO {

    private final String url = "jdbc:mysql://localhost:3306/bank_db";
    private final String user = "root";

    // Replace with your actual MySQL password
    private final String password = "Sravanthi@135";

    public Connection getConnection() throws Exception {
        Class.forName("com.mysql.cj.jdbc.Driver");
        return DriverManager.getConnection(url, user, password);
    }
    public void transferMoney(int fromAccount, int toAccount, double amount) {

    Connection conn = null;

    try {

        conn = getConnection();

        // Start transaction
        conn.setAutoCommit(false);

        String debitQuery =
                "UPDATE accounts SET balance = balance - ? WHERE account_id = ?";

        java.sql.PreparedStatement debitStmt =
                conn.prepareStatement(debitQuery);

        debitStmt.setDouble(1, amount);
        debitStmt.setInt(2, fromAccount);

        int debitRows = debitStmt.executeUpdate();

        String creditQuery =
                "UPDATE accounts SET balance = balance + ? WHERE account_id = ?";

        java.sql.PreparedStatement creditStmt =
                conn.prepareStatement(creditQuery);

        creditStmt.setDouble(1, amount);
        creditStmt.setInt(2, toAccount);

        int creditRows = creditStmt.executeUpdate();

        if (debitRows > 0 && creditRows > 0) {

            conn.commit();

            System.out.println("Transaction Successful!");

        } else {

            conn.rollback();

            System.out.println("Transaction Failed. Rolled Back.");
        }

    } catch (Exception e) {

        try {
            if (conn != null) {
                conn.rollback();
                System.out.println("Error occurred. Transaction Rolled Back.");
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }

        e.printStackTrace();

    } finally {

        try {
            if (conn != null) {
                conn.setAutoCommit(true);
                conn.close();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
}