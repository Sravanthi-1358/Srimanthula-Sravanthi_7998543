public class JdbcExample {
    public static void main(String[] args) {

        StudentDAO dao = new StudentDAO();

        dao.insertStudent("Kiran", 23, "CSE");
    }
}