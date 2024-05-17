document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("employeeForm")
  form.addEventListener("submit", async (event) => {
    event.preventDefault()

    let FirstName = document.getElementById("FirstName").value
    let LastName = document.getElementById("LastName").value
    let Email = document.getElementById("Email").value
    let Department = document.getElementById("Department").value
    let JobTitle = document.getElementById("JobTitle").value
    let Salary = document.getElementById("Salary").value
    let StartDate = document.getElementById("StartDate").value
    let EndDate = document.getElementById("EndDate").value

    try {
      const response = await fetch("/addEmployee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          FirstName,
          LastName,
          Email,
          Department,
          JobTitle,
          Salary,
          StartDate,
          EndDate,
        }),
      })

      if (response.ok) {
        const result = await response.json()
        console.log("Data inserted successfully. ID: " + result.insertId)
      } else {
        console.log("Error inserting data.")
      }
    } catch (error) {
      //   messageElement.textContent = "Error: " + error.message
      console.log(error.message)
    }
  })
})
