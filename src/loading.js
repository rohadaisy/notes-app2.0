// Fungsi untuk menampilkan loading spinner
function showLoading() {
    const loadingElement = document.getElementById('loading');
    if (loadingElement) {
      loadingElement.style.display = 'block';
    }
  }
  
  // Fungsi untuk menyembunyikan loading spinner
  function hideLoading() {
    const loadingElement = document.getElementById('loading');
    if (loadingElement) {
      loadingElement.style.display = 'none';
    }
  }
  
  export { showLoading, hideLoading };
  