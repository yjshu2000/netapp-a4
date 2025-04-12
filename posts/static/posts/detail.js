//hello

const backBtn = document.getElementById('back-btn');
const url = window.location.href + "data/";
const spinnerBox = document.getElementById("spinner-box");

backBtn.addEventListener('click', () => {
    window.history.back();
})

$.ajax({
    type: 'GET',
    url: url,
    success: function(response) {
        console.log("Success:", response);
        spinnerBox.classList.add('not-visible');
    },
    error: function(error) {
        console.error("Error:", error);
    }
})