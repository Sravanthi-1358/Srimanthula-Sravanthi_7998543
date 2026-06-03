import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

class MyTask implements Callable<String> {

    private int taskId;

    public MyTask(int taskId) {
        this.taskId = taskId;
    }

    @Override
    public String call() throws Exception {
        Thread.sleep(1000); // simulate work
        return "Task " + taskId + " executed by " + Thread.currentThread().getName();
    }
}

public class CallableDemo {

    public static void main(String[] args) {

        ExecutorService executor = Executors.newFixedThreadPool(3);

        Future<String> f1 = executor.submit(new MyTask(1));
        Future<String> f2 = executor.submit(new MyTask(2));
        Future<String> f3 = executor.submit(new MyTask(3));
        Future<String> f4 = executor.submit(new MyTask(4));
        Future<String> f5 = executor.submit(new MyTask(5));

        try {
            System.out.println(f1.get());
            System.out.println(f2.get());
            System.out.println(f3.get());
            System.out.println(f4.get());
            System.out.println(f5.get());
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }

        executor.shutdown();
    }
}