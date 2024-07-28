document.addEventListener("DOMContentLoaded", () => {
  const monsterContainerDiv = document.querySelector("#monster-container");
  const newMonsterForm = document.querySelector("#new-monster-form");
  const loadButton = document.querySelector("#load");

  let currentPage = 1;

  function displayMonsters(pageNumber) {
    fetch("http://localhost:3000/monsters/?_limit=50&_page=3")
      .then((res) => res.json())
      .then((monsters) => {
        monsters.forEach((monster) => {
          const monsterDiv = document.createElement("div");

          const monsterNameH2 = document.createElement("h2");
          monsterNameH2.textContent = monster.name;

          const monsterAgeH4 = document.createElement("h4");
          monsterAgeH4.textContent = monster.age;

          const monsterDescriptionP = document.createElement("p");
          monsterDescriptionP.textContent = monster.description;

          monsterDiv.append(monsterNameH2, monsterAgeH4, monsterDescriptionP);
          monsterContainerDiv.append(monsterDiv);
        });
      });
  }

  newMonsterForm.addEventListener("submit", (e) => {
    e.preventDefault();

    fetch("http://localhost:3000/monsters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: newMonsterForm.name.value,
        age: newMonsterForm.age.value,
        description: newMonsterForm.description.value,
      }),
    });
  });

  loadButton.addEventListener("click", () => {
    currentPage++;
    displayMonsters(currentPage);
  });

  displayMonsters(currentPage);
});
