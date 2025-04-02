const form = document.querySelector("#updateForm")
    form.addEventListener("change", function () {
      const updateBtn = document.querySelector("#add-inventory-btn")
      updateBtn.removeAttribute("disabled")
    })