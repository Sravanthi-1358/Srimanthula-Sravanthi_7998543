// Interface Implementation Example

interface Playable {
    void play();
}

// Guitar class implementing Playable
class Guitar implements Playable {
    @Override
    public void play() {
        System.out.println("Playing the Guitar");
    }
}

// Piano class implementing Playable
class Piano implements Playable {
    @Override
    public void play() {
        System.out.println("Playing the Piano");
    }
}

// Main class
public class InterfaceExample {
    public static void main(String[] args) {
        Playable guitar = new Guitar();
        Playable piano = new Piano();

        guitar.play();
        piano.play();
    }
}