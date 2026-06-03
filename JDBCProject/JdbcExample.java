import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class JdbcExample {

    public static void main(String[] args) {

        String url = "jdbc:mysql://localhost:3306/student_db";
        String user = "root";        // change if your MySQL username is different
        String password = "Sravanthi@135";    // change if your MySQL password is different

        try {
            // 1. Load Driver (optional for newer versions, but safe to include)
            Class.forName("com.mysql.cj.jdbc.Driver");

            // 2. Create connection
            Connection conn = DriverManager.getConnection(url, user, password);

            // 3. Create statement
            Statement stmt = conn.createStatement();

            // 4. Execute query
            String query = "SELECT * FROM students";
            ResultSet rs = stmt.executeQuery(query);

            // 5. Print results
            System.out.println("Student Records:");
            while (rs.next()) {
                int id = rs.getInt("id");
                String name = rs.getString("name");
                int age = rs.getInt("age");
                String dept = rs.getString("department");

                System.out.println(id + " | " + name + " | " + age + " | " + dept);
            }

            // 6. Close connection
            conn.close();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}