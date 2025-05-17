async function displayChamberMembers() {
  const memberCardBox = document.querySelector(".member-card-section");
  const gridBtn = document.getElementById("grid-view");
  const listBtn = document.getElementById("list-view");

  const renderMembers = function (members) {
    memberCardBox.innerHTML = "";
    members.forEach((member) => {
      const levelLabel = ["Member", "Silver", "Gold"][member.membershipLevel - 1];
      const html = `
        <div class="member-card">
          <figure>
            <div>
              <img src="${member.image}" alt="${member.name} logo" width="1000" height="623" loading="lazy">
            </div>
            <figcaption>${member.name}</figcaption>
          </figure>
          <div class="member-info-box">
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Industry:</strong> ${member.industry || "N/A"}</p>
            <p><strong>Membership:</strong> ${levelLabel}</p>
            <a href="${member.website}" target="_blank">${member.website.replace(/^https?:\/\//, "")}</a>
          </div>
        </div>
      `;
      memberCardBox.insertAdjacentHTML("beforeend", html);
    });
  };

  const getMembersData = async function () {
    try {
      const membersUrl = "data/members.json";
      const response = await fetch(membersUrl);
      if (!response.ok) throw new Error("Failed to load member data.");
      const data = await response.json();
      renderMembers(data);
    } catch (error) {
      memberCardBox.innerHTML = `<p>We're having trouble loading the directory. Please try again later.</p>`;
      console.error("Fetch error:", error);
    }
  };

  gridBtn.addEventListener("click", () => {
    memberCardBox.classList.add("grid-view");
    memberCardBox.classList.remove("list-view");
    gridBtn.classList.add("activebtn");
    listBtn.classList.remove("activebtn");
  });

  listBtn.addEventListener("click", () => {
    memberCardBox.classList.add("list-view");
    memberCardBox.classList.remove("grid-view");
    listBtn.classList.add("activebtn");
    gridBtn.classList.remove("activebtn");
  });

  function setFooterDates() {
    document.getElementById("currentyear").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;
  }

  await getMembersData();
  setFooterDates();
}

document.addEventListener("DOMContentLoaded", displayChamberMembers);