  // Fetch the navigation component
  fetch('/nav.html')
    .then(response => {
      // Check if the request was successful
      if (!response.ok) {
        throw new Error(`Failed to load nav: ${response.status}`);
      }
    console.log(response);
      return response.text(); // Convert response to text
    })
    .then(navHTML => {
      // Insert the navigation HTML into the placeholder
      document.getElementById('navbar-placeholder').innerHTML = navHTML;
    })
    .catch(error => {
      // Log errors (e.g., if nav.html is missing)
      console.error('Error loading navigation:', error);
    });

//prevent ghost dragging
console.log("loaded!");
document.addEventListener('dragstart', (e) => {
  console.log('dragstart fired, target:', e.target.tagName);
  if (e.target.tagName === 'IMG' || e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
    console.log('preventing default');
    e.preventDefault();
  }
});

function removeSpaces(givenText){
let newTex="";
for (let i =0; i<givenText.length;i++){
    if (givenText[i]!=" "){
        newTex+=givenText[i];
    }
}
return newTex;
}