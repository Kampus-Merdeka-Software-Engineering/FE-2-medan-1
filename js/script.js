// tes2 focus the cursor on the email-address input
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
  // Fungsi untuk menghitung total jumlah produk di keranjang
  function calculateTotalQuantity() {
    var totalQuantity = 0;
    for (var i = 0; i < cart.length; i++) {
      totalQuantity += cart[i].quantity;
    }
    return totalQuantity;
  }
  // Fungsi untuk menghitung total harga produk di keranjang
  function calculateTotal() {
    var total = 0;
    for (var i = 0; i < cart.length; i++) {
      total += cart[i].price * cart[i].quantity;
    }
    return total;
  }
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
  // Tombol "Bayar Sekarang" dengan fungsi onClick
  var payNowButton = document.createElement("button");
  payNowButton.textContent = "Pesan Sekarang";
  payNowButton.onclick = function () {
    // Mendapatkan data formulir
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var bookingDate = document.getElementById("bookingDate").value;

    // Cek apakah ada produk di keranjang
    if (cart.length === 0) {
      alert("Keranjang kosong. Tambahkan produk ke keranjang terlebih dahulu.");
      return;
    }

    // Cek apakah semua data formulir sudah diisi
    if (!name || !email || !phone || !bookingDate) {
      alert("Harap isi semua kolom formulir dengan benar.");
      return;
    }

    // Data yang akan dikirim ke server
    var bookingData = {
      name: name,
      email: email,
      telepon: phone,
      dateAt: bookingDate,
      quantity: calculateTotalQuantity(), // Fungsi calculateTotalQuantity() untuk menghitung total jumlah produk
      totalPrice: calculateTotal(), // Fungsi calculateTotal() untuk menghitung total harga produk
    };

    // Menggunakan metode fetch untuk melakukan permintaan POST ke API
    fetch("https://be-2-medan-1-production.up.railway.app/booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Menanggapi respons dari server
        if (data.success) {
          alert("Booking berhasil! Terima kasih!");
          // Setelah Booking berhasil, mereset keranjang atau melakukan tindakan lainnya.
          cart = [];
          displayCart();
        } else {
          alert("Booking gagal. Silakan coba lagi.");
        }
      })
      .catch((error) => {
        console.error("Error making POST request:", error);
        alert("Terjadi kesalahan. Silakan coba lagi nanti.");
      });
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
  };

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


// Paket Rekomendasi Untuk ditampilkan
document.addEventListener('DOMContentLoaded', function () {
  // URL API
  const apiUrl = 'https://be-2-medan-1-production.up.railway.app/destination';

  // Tangkap elemen HTML dengan id 'destinationList'
  const destinationListElement = document.getElementById('destinationList');

  // Ambil data dari API
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // Buat elemen HTML untuk setiap destinasi
      data.forEach(destination => {
        const destinationElement = document.createElement('div');
        destinationElement.classList.add('product-cart');
        destinationElement.innerHTML = `
          <img src="assets/images/products/${destination.image}" alt="${destination.title}" />
          <span>${destination.subTitle}</span>
          <h4>${destination.title}</h4>
          <div class="stars">
            ${destination.bonus}
          </div>
          <h4 class="price">${destination.price}/Pax</h4>
          <a class="add-to-cart" data-name="${destination.title}" data-price="${destination.price}">
            <i class="fa-solid fa-plane"></i>
          </a>
        `;

        // Tambahkan elemen destinasi ke dalam elemen dengan id 'destinationList'
        destinationListElement.appendChild(destinationElement);
      });
    })
    .catch(error => console.error('Error fetching data:', error));
});
