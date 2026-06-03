import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

public class StudentDAO {

    private final String url = "jdbc:mysql://localhost:3306/student_db";
    private final String user = "root";

    // Replace with your actual MySQL password
    private final String password = "Sravanthi@135";

    // Get database connection
    public Connection getConnection() throws Exception {
        Class.forName("com.mysql.cj.jdbc.Driver");
        return DriverManager.getConnection(url, user, password);
    }

    // Insert a new student
    public void insertStudent(String name, int age, String department) {

        String sql = "INSERT INTO students (name, age, department) VALUES (?, ?, ?)";

        try (Connection conn = getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setString(1, name);
            pstmt.setInt(2, age);
            pstmt.setString(3, department);

            int rows = pstmt.executeUpdate();

            if (rows > 0) {
                System.out.println("Student inserted successfully!");
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // Update student department using student ID
    public void updateStudent(int id, String newDepartment) {

        String sql = "UPDATE students SET department = ? WHERE id = ?";

        try (Connection conn = getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setString(1, newDepartment);
            pstmt.setInt(2, id);

            int rows = pstmt.executeUpdate();

            if (rows > 0) {
                System.out.println("Student updated successfully!");
            } else {
                System.out.println("Student ID not found!");
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}