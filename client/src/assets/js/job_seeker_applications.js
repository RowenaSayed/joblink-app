
const links = document.querySelectorAll('.nav-link');

links.forEach(link => {
  link.addEventListener('click', function() {
    links.forEach(l => l.classList.remove('active')); 
    this.classList.add('active'); 
  });
});

  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", function(e) {
      e.preventDefault();

     
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      this.classList.add("active");

      let status = this.getAttribute("data-status");
      let rows = document.querySelectorAll("table tbody tr");

      rows.forEach(row => {
        if (status === "all" || row.getAttribute("data-status") === status) {
          row.style.display = "";
        } else {
          row.style.display = "none";
        }
      });
    });
  });