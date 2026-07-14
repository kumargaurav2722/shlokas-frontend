class Product:
    def __init__(self, name, price):
        self.name = name
        self.price = price

    def display_info(self):
        print(f"Product: {self.name}, Price: ${self.price:.2f}")

    def apply_discount(self, discount_percent):
        discounted_price = self.price * (1 - discount_percent / 100)
        print(f"{self.name} with {discount_percent}% discount: ${discounted_price:.2f}")


laptop = Product("Laptop", 1200.00)
laptop.display_info()
laptop.apply_discount(10)
