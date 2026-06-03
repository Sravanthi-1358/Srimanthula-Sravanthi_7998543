public class TypeCastingExample {
    public static void main(String[] args) {

       
        double num1 = 25.75;
        int intValue = (int) num1;

        
        int num2 = 50;
        double doubleValue = (double) num2;

        System.out.println("Original double value: " + num1);
        System.out.println("After casting to int: " + intValue);

        System.out.println("Original int value: " + num2);
        System.out.println("After casting to double: " + doubleValue);
    }
}