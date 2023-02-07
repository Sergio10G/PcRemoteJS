import java.awt.MouseInfo;
import java.awt.Point;
import java.awt.Robot;

public class App {
    public static void main(String[] args) throws Exception {
        Robot r = new Robot();

        Point mouseLocation = MouseInfo.getPointerInfo().getLocation();
        System.out.println("X: " + mouseLocation.getX() + ", Y: " + mouseLocation.getY());
        r.mouseMove(0, 0);
        
    }
}
