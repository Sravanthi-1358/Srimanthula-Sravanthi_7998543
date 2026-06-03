public class PatternMatchingSwitch {

    public static void checkType(Object obj) {

        if (obj instanceof Integer) {
            System.out.println("Integer value: " + obj);
        } else if (obj instanceof String) {
            System.out.println("String value: " + obj);
        } else if (obj instanceof Double) {
            System.out.println("Double value: " + obj);
        } else if (obj instanceof Boolean) {
            System.out.println("Boolean value: " + obj);
        } else if (obj == null) {
            System.out.println("Object is null");
        } else {
            System.out.println("Unknown type");
        }
    }

    public static void main(String[] args) {
        checkType(100);
        checkType("Hello Java");
        checkType(99.99);
        checkType(true);
        checkType(null);
    }
}