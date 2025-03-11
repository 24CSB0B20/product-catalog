class Product {
    constructor(id, name, price, image, description) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
        this.description = description;
    }

    createProd() {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product", "slide-in");
        productDiv.setAttribute("data-id", this.id);

        const img = document.createElement("img");
        img.setAttribute("src", this.image);
        img.setAttribute("alt", this.name);
        
        const title = document.createElement("h3");
        title.textContent = this.name;

        const price = document.createElement("p");
        price.textContent = `₹${this.price.toFixed(2)}`;

        const hoverContainer = document.createElement("div");
        hoverContainer.classList.add("hover-container");
        
        const description = document.createElement("div");
        description.classList.add("description");
        description.textContent = this.description;
        
        const button = document.createElement("button");
        button.classList.add("add-to-cart");
        button.textContent = "Add to Cart";
        
        hoverContainer.appendChild(description);
        hoverContainer.appendChild(button);
        
        productDiv.appendChild(img);
        productDiv.appendChild(title);
        productDiv.appendChild(price);
        productDiv.appendChild(hoverContainer);

        button.addEventListener("click", () => cart.addItem(this));
        return productDiv;
    }
}

class Cart {
    constructor() {
        this.items = [];
    }

    addItem(product) {
        const timestamp = new Date().toLocaleString();
        this.items.push({ ...product, timestamp });
        this.renderCart();
    }

    removeItem(index) {
        this.items.splice(index, 1);
        this.renderCart();
    }

    renderCart() {
        const cartList = document.getElementById("cart-items");
        const cartTotal = document.getElementById("cart-total");
        if (!cartList || !cartTotal) return;
        
        cartList.innerHTML = "";
        let total = 0;
        
        this.items.forEach((item, index) => {
            total += item.price;
            const cartItem = document.createElement("li");
            cartItem.classList.add("cart-item", "slide-in") 
            const img = document.createElement("img");
            img.setAttribute("src", item.image);
            img.setAttribute("alt", item.name);
            img.classList.add("cart-img");

            const details = document.createElement("div");
            details.classList.add("cart-details");
            details.innerHTML = `<strong>${item.name}</strong> - ₹${item.price.toFixed(2)} <br> <small>${item.timestamp}</small>`;
            
            const removeButton = document.createElement("button");
            removeButton.textContent = "Remove";
            removeButton.classList.add("remove-item");
            removeButton.addEventListener("click", () => this.removeItem(index));
            
            cartItem.appendChild(img);
            cartItem.appendChild(details);
            cartItem.appendChild(removeButton);
            cartList.appendChild(cartItem);
        });
        
        cartTotal.innerText = `Total: ₹${total.toFixed(2)}`;
    }
}

const products = [
    new Product(1, "Laptop", 80000, "laptop.webp", "A powerful laptop for all your needs."),
    new Product(2, "Phone", 50000, "iphone.png", "A smartphone with amazing features."),
    new Product(3, "Headphones", 5000, "headphones.jpeg", "Noise-cancelling headphones for the best experience."),
    new Product(4, "Smartwatch", 2000, "watch.webp", "A smartwatch to track your fitness and more."),
    new Product(5, "Water Bottle", 500, "bottle.webp", "A water bottle to quench your thirst"),
    new Product(6, "Electronics Kit", 2000, "electronics.webp", "A kit for the hobbyist electrical engineer."),
    new Product(7, "Bluetooth Speaker", 4000, "bluetoothspeaker.jpg", "A industry grade speaker for all music."),
];

const cart = new Cart();

const productContainer = document.getElementById("products-container");
if (productContainer) {
    products.forEach((product, index) => {
        productContainer.appendChild(product.createProd());
    });
}
