async function loadEquipment() {

  const equipmentPage =
    document.getElementById("equipmentPage");

  const notFound =
    document.getElementById("notFound");

  try {

    const response =
      await fetch("equipment.json");

    if (!response.ok) {
      throw new Error("Unable to load equipment database.");
    }

    const equipmentData =
      await response.json();


    // Get equipment ID from QR URL
    const params =
      new URLSearchParams(window.location.search);

    const equipmentId =
      params.get("id");


    // No ID provided
    if (!equipmentId) {

      equipmentPage.style.display = "none";
      notFound.style.display = "block";

      return;
    }


    // Find equipment
    const equipment =
      equipmentData.find(
        item => item.id === equipmentId
      );


    // Equipment not found
    if (!equipment) {

      equipmentPage.style.display = "none";
      notFound.style.display = "block";

      return;
    }


    // Display equipment
    document.getElementById("equipmentName").textContent =
      equipment.name || "—";

    document.getElementById("equipmentId").textContent =
      equipment.id || "—";

    document.getElementById("category").textContent =
      equipment.category || "—";

    document.getElementById("brand").textContent =
      equipment.brand || "—";

    document.getElementById("model").textContent =
      equipment.model || "—";

    document.getElementById("assetNumber").textContent =
      equipment.assetNumber || "—";

    document.getElementById("location").textContent =
      equipment.location || "—";

    document.getElementById("status").textContent =
      equipment.status || "—";


    equipmentPage.style.display = "block";
    notFound.style.display = "none";


  } catch (error) {

    console.error(error);

    equipmentPage.style.display = "none";
    notFound.style.display = "block";

  }

}


loadEquipment();
