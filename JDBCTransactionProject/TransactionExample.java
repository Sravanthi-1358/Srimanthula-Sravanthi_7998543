public class TransactionExample {

    public static void main(String[] args) {

        AccountDAO dao = new AccountDAO();

        // Transfer ₹2000 from Account 1 to Account 2
        dao.transferMoney(1, 99, 2000);
    }
}