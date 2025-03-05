function getFarmersData() {
    return JSON.parse(localStorage.getItem("farmersData")) || [];
  }
  
function getProductById(productId) {
    const farmers = getFarmersData();
    for (const farmer of farmers) {
        const product = farmer.products.find(prod => prod.id === productId);
        if (product) {
            return { ...product, farmer };
        }
    }
    return null;
}