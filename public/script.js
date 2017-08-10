console.log('hello from the browser JavaScript')

var DOM = {
  cancelAddReview: document.querySelector(".close-review-button"),
  openAddReview: document.querySelector(".open-review-button"),
  addReviewForm: document.querySelector(".add-review-form"),
  albumsPageReviews: document.querySelector(".albums-page-reviews")
}

window.onload = function() {
  DOM.cancelAddReview.style.display = "none"
  DOM.addReviewForm.style.display = "none"
}

function showAddForm() {
  DOM.cancelAddReview.style.display = "block"
  DOM.openAddReview.style.display = "none"
  DOM.addReviewForm.style.display = "block"
  DOM.albumsPageReviews.style.display = "none"
}

function hideAddForm() {
  DOM.cancelAddReview.style.display = "none"
  DOM.openAddReview.style.display = "block"
  DOM.addReviewForm.style.display = "none"
  DOM.albumsPageReviews.style.display = "block"
}