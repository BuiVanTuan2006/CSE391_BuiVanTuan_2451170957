export const ui = {

  showLoading() {
    console.log("Loading...");
  },

  hideLoading() {
    console.log("Done");
  },

  showError(message) {
    alert(message);
  },

  showSuccess(message) {
    alert(message);
  },

  renderUsers(users) {
    console.log(users);
  },
};