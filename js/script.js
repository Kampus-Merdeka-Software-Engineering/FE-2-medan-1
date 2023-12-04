// focus the cursor on the email-address input
const emailField = document.getElementById("email-address-input");
emailField.focus({
  preventScroll: true,
});
// floating responsive Product cart
function toggleNavResponsive() {
  var sidenavWidth = document.getElementById("mySidenav").style.width;
  if (sidenavWidth === "0px" || sidenavWidth === "") {
    openNav();
  } else {
    closeNav();
  }
}
// Script JavaScript untuk toggle menu di tampilan mobile
document.getElementById('check').addEventListener('change', function() {
  const headerListNav = document.querySelector('.header-list-nav ul');
  headerListNav.classList.toggle('active');
});



// header Product cart
var cart = [];


// Fungsi untuk menampilkan dan mengupdate isi keranjang di sidenav
function displayCart() {
  var cartContent = document.getElementById("cart-content");
  cartContent.innerHTML = ""; // Membersihkan konten sebelum menambahkannya kembali

  for (var i = 0; i < cart.length; i++) {
    var product = cart[i];
    var productItem = document.createElement("div");
    productItem.innerHTML = `
      <p>${product.name} - Rp. ${product.price}/Pax</p>
      <button onclick="decreaseQuantity(${i})">-</button>
      <span>${product.quantity}</span>
      <button onclick="increaseQuantity(${i})">+</button>
      <button onclick="removeFromCart(${i})">Remove</button>
    `;
    cartContent.appendChild(productItem);
  }

  // Menampilkan total harga di bawah isi keranjang
  var totalElement = document.createElement("p");
  var totalAmount = calculateTotal().toLocaleString();
  totalElement.textContent = "Total: Rp. " + totalAmount;
  cartContent.appendChild(totalElement);

  // Menambahkan formulir Nama, Email, dan Nomor Telepon di bawah total
  var formHTML = `
  <div class="customer-form">
    <table>
        <thead>
            <tr>
                <th>Nama</th>
                <th><input type="text" id="name" placeholder="Masukkan nama"></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Email</td>
                <td><input type="email" id="email" placeholder="Masukkan email"></td>
            </tr>
            <tr>
                <td>Telp.</td>
                <td><input type="tel" id="phone" placeholder="Masukkan nomor telepon"></td>
            </tr>
            <tr>
                <td>Tanggal Booking</td>
                <td><input type="date" id="bookingDate"></td>
            </tr>
        </tbody>
    </table>
</div>

  `;
  cartContent.innerHTML += formHTML;

  // Tombol "Bayar Sekarang" dengan fungsi onClick
  var payNowButton = document.createElement("button");
  payNowButton.textContent = "Pesan Sekarang";
  payNowButton.onclick = function() {
    // Tambahkan logika pembayaran atau pengiriman data formulir ke server di sini (IWAA)
    alert("Pembayaran berhasil! Terima kasih!");
    // Setelah pembayaran berhasil, mereset keranjang atau melakukan tindakan lainnya.
    // Misalnya, cart = [];
    // displayCart();
  };
  cartContent.appendChild(payNowButton);
}
// Fungsi untuk menambahkan produk ke dalam keranjang
function addToCart(name, price, productId) {
  // Cek apakah produk sudah ada di keranjang
  var existingProduct = cart.find(product => product.name === name);
  
  if (existingProduct) {
    // Jika produk sudah ada, tambahkan jumlahnya
    existingProduct.quantity += 1;
  } else {
    // Jika produk belum ada, tambahkan ke keranjang
    cart.push({ name: name, price: price, quantity: 1 });
  }

  displayCart(); // Memanggil fungsi displayCart() setelah menambahkan produk
}

// Fungsi untuk mengurangi jumlah produk di keranjang
function decreaseQuantity(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
    displayCart(); // Memanggil fungsi displayCart() setelah mengurangi jumlah produk
  }
}

// Fungsi untuk menambah jumlah produk di keranjang
function increaseQuantity(index) {
  cart[index].quantity += 1;
  displayCart(); // Memanggil fungsi displayCart() setelah menambah jumlah produk
}

// Fungsi untuk menghapus produk dari keranjang
function removeFromCart(index) {
  cart.splice(index, 1);
  displayCart(); // Memanggil fungsi displayCart() setelah menghapus produk
}

// Fungsi untuk menghitung total harga produk di keranjang
function calculateTotal() {
  var total = 0;
  for (var i = 0; i < cart.length; i++) {
    total += cart[i].price * cart[i].quantity;
  }
  return total;
}

// Fungsi untuk menampilkan sidenav
function openNav() {
  document.getElementById("mySidenav").style.width = "360px";
  document.getElementById("main").style.marginRight = "350px";
  displayCart(); // Menampilkan isi keranjang saat sidenav dibuka
}

// Fungsi untuk menutup sidenav
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginRight = "0";
}

// Fungsi untuk membuka atau menutup sidenav sesuai kondisi
function toggleNav() {
  var sidenavWidth = document.getElementById("mySidenav").style.width;
  if (sidenavWidth === "0px" || sidenavWidth === "") {
    openNav();
  } else {
    closeNav();
  }
}


