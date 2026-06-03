import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class VirtualThreadDemo {

    public static void main(String[] args) {

        int taskCount = 5000;

        System.out.println("Task Count: " + taskCount);

        long startTime = System.currentTimeMillis();

        ExecutorService executor = createExecutor();

        for (int i = 1; i <= taskCount; i++) {
            int taskId = i;

            executor.submit(() -> {
                System.out.println("Task " + taskId +
                        " executed by " + Thread.currentThread().getName());
            });
        }

        executor.shutdown();

        while (!executor.isTerminated()) {
            // wait
        }

        long endTime = System.currentTimeMillis();

        System.out.println("\nExecution Time: " + (endTime - startTime) + " ms");
    }

    private static ExecutorService createExecutor() {

        try {
            // Try Java 21 Virtual Threads via reflection
            Class<?> executorClass = Class.forName("java.util.concurrent.Executors");

            return (ExecutorService)
                    executorClass
                            .getMethod("newVirtualThreadPerTaskExecutor")
                            .invoke(null);

        } catch (Exception e) {
            // fallback for Java 17
            System.out.println("Virtual Threads NOT available. Using Fixed Thread Pool.");

            return Executors.newFixedThreadPool(100);
        }
    }
}