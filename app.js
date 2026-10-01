async function loadEquipment() {

  const params = new URLSearchParams(window.location.search);
  const equipmentId = params.get("id");

  const loading = document.getElementById("loading");
  const notFound = document.getElementById("not-found");
  const equipmentPage = document.getElementById("equipment-page");

  if (!equipmentId) {
    loading.classList.add("hidden");
    notFound.classList.remove("hidden");
    return;
  }

  try {

    const response = await fetch("equipment.json");

    if (!response.ok) {
      throw new Error("Unable to load equipment data.");
    }

    const equipmentList = await response.json();

    const equipment = equipmentList.find(
      item => item.id.toLowerCase() === equipmentId.toLowerCase()
    );

    loading.classList.add("hidden");

    if (!equipment) {
      notFound.classList.remove("hidden");
      return;
    }

    document.title = `${equipment.name} — ${equipment.id}`;

    document.getElementById("equipment-name").textContent = equipment.name;
    document.getElementById("equipment-id").textContent = equipment.id;
    document.getElementById("location").textContent = equipment.location;

    document.getElementById("brand").textContent = equipment.brand || "—";
    document.getElementById("model").textContent = equipment.model || "—";
    document.getElementById("location-detail").textContent = equipment.location || "—";
    document.getElementById("status").textContent = equipment.status || "—";

    document.getElementById("purpose").textContent =
      equipment.purpose || "—";

    const checks = document.getElementById("checks");

    checks.innerHTML = "";

    equipment.checks.forEach(check => {

      const li = document.createElement("li");
      li.textContent = check;

      checks.appendChild(li);

    });

    const precautions = document.getElementById("precautions");

    precautions.innerHTML = "";

    equipment.precautions.forEach(item => {

      const li = document.createElement("li");
      li.textContent = item;

      precautions.appendChild(li);

    });

    document.getElementById("last-pm").textContent =
      equipment.lastPM || "—";

    document.getElementById("next-pm").textContent =
      equipment.nextPM || "—";

    equipmentPage.classList.remove("hidden");

  } catch (error) {

    console.error(error);

    loading.classList.add("hidden");
    notFound.classList.remove("hidden");

  }
}

loadEquipment();
