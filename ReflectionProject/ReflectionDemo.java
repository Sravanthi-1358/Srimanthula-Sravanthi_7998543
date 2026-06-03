import java.lang.reflect.Method;
import java.lang.reflect.Parameter;

public class ReflectionDemo {

    public static void main(String[] args) {

        try {

            // Load class dynamically
            Class<?> cls = Class.forName("TestClass");

            System.out.println("Class Name: " + cls.getName());

            // Create object dynamically
            Object obj = cls.getDeclaredConstructor().newInstance();

            // Get all methods
            Method[] methods = cls.getDeclaredMethods();

            System.out.println("\nMethods in TestClass:");

            for (Method method : methods) {

                System.out.println("\nMethod Name: " + method.getName());

                // Print parameters
                Parameter[] params = method.getParameters();

                System.out.print("Parameters: ");

                if (params.length == 0) {
                    System.out.println("None");
                } else {
                    for (Parameter p : params) {
                        System.out.print(p.getType().getSimpleName() + " ");
                    }
                    System.out.println();
                }

                // Invoke methods dynamically
                if (method.getName().equals("sayHello")) {
                    method.invoke(obj);
                }

                if (method.getName().equals("greet")) {
                    method.invoke(obj, "Sravanthi");
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}