class Book:
    def __init__(self, title, author, available=True):
        self.title = title
        self.author = author
        self.available = available

    def display_info(self):
        print(f"Title: {self.title}, Author: {self.author}")

    def borrow(self):
        self.available = False
        print(f"{self.title} has been borrowed.")


book1 = Book("The Hobbit", "J.R.R. Tolkien")
book1.display_info()
book1.borrow()
